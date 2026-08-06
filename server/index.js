const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// SDK Web / Client do Firebase v9+
const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

const app = express();

// Carrega as credenciais do JSON local do servidor
const keyPath = path.join(__dirname, 'firebase-config.json');

if (!fs.existsSync(keyPath)) {
  console.error('\n❌ ERRO: O arquivo firebase-config.json não foi encontrado na pasta server!\n');
  process.exit(1);
}

const firebaseConfig = require(keyPath);

// Inicializa o app Firebase Client
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(firebaseApp, 'angulardb');

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROTAS DO FIRESTORE ---

// GET /api/users
app.get('/api/users', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const usuarios = querySnapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    return res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    return res.status(500).json({ erro: 'Erro ao ler dados de usuários do banco.' });
  }
});

// PUT /api/users/alter-password
app.put('/api/users/alter-password', async (req, res) => {
  const { login, senhaAtual, novoPrefixo } = req.body;

  console.log('\n--- TENTATIVA DE ALTERAÇÃO DE SENHA ---');
  console.log('Dados recebidos da requisição:', { login, senhaAtual, novoPrefixo });

  if (!login || !novoPrefixo || !senhaAtual) {
    return res.status(400).json({ erro: 'Login, senha atual e nova senha são obrigatórios.' });
  }

  try {
    // Consulta na coleção 'usuarios' do banco 'angulardb'
    const q = query(collection(db, 'usuarios'), where('login', '==', login));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`❌ Usuário com login "${login}" NÃO foi encontrado na coleção "usuarios".`);
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    console.log('📄 Documento encontrado no Firestore:', userData);

    // Ajuste aqui se o campo da senha no seu Firestore for 'senha', 'password' ou 'prefixoPass'
    const senhaSalvaNoBanco = userData.prefixoPass || userData.senha || userData.password;

    console.log(`🔑 Comparando Senha Digitada ("${senhaAtual}") com Senha no Banco ("${senhaSalvaNoBanco}")`);

    if (senhaSalvaNoBanco !== senhaAtual) {
      console.log('❌ Senha atual incorreta!');
      return res.status(400).json({ erro: 'Senha atual incorreta!' });
    }

    // Se passou na validação, atualiza o campo de senha no Firestore
    await updateDoc(doc(db, 'usuarios', userDoc.id), {
      prefixoPass: novoPrefixo
    });

    console.log('✅ Senha atualizada com sucesso no Firestore!');
    return res.status(200).json({ sucesso: true, mensagem: 'Senha alterada com sucesso!' });

  } catch (err) {
    console.error('🔥 Erro ao atualizar a senha:', err);
    return res.status(500).json({ erro: 'Erro ao atualizar a senha na base de dados.' });
  }
});

// --- ROTAS DE UPLOAD (MULTER) ---

const dir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.get('/', (req, res) => res.send('API de Upload rodando!'));

const handleUpload = (req, res) => {
  try {
    console.log('Arquivos recebidos:', req.files?.length);
    return res.status(200).json({
      mensagem: 'Upload realizado com sucesso!',
      arquivos: req.files?.map(f => f.originalname)
    });
  } catch (error) {
    console.error('Erro no processamento:', error);
    return res.status(500).json({ erro: 'Falha ao processar arquivo' });
  }
};

app.post('/api/upload', upload.array('file'), handleUpload);
app.post('/upload', upload.array('file'), handleUpload);

// Listen
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;

app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(500).json({ error: err.message });
});
