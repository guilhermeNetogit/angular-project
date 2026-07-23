const express = require('express');
//const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const dir = './server/uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

//const corsOptions = {
//  origin: 'http://localhost:4300',
//  optionsSuccessStatus: 200
//};

// Configurações de Middleware
//app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API funcionando!'));

app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(500).json({ error: err.message });
});

// 1. Rota de teste
app.get('/', (req, res) => res.send('API funcionando!'));

// 2. Rota de Upload
app.post('/api/upload', (req, res) => {
  upload.array('file')(req, res, function (err) {
    if (err) {
      console.error('Erro no Multer:', err);
      return res.status(500).json({ error: 'Erro no upload', detalhes: err.message });
    }
    return res.send({ mensagem: 'Upload realizado com sucesso!', arquivos: req.files });
  });
});

// --- TRATAMENTO DE ERROS GLOBAL (Sempre após as rotas) ---
app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(500).json({ error: err.message });
});

// --- INICIALIZAÇÃO DO SERVIDOR (Sempre no final) ---
app.listen(8080, () => {
  console.log('🚀 Servidor rodando na porta 8080');
  console.log('📍 Banco de dados configurado em:', dbPath);
});

