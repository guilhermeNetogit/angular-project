const express = require('express');
const cors = require('cors');
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
    cb(null, dir); // Salva na pasta correta que você pediu
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo (Ex: Nunota.java) em vez do hash bagunçado
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const corsOptions = {
  origin: 'http://localhost:4300',
  optionsSuccessStatus: 200
};

// Configurações de Middleware
app.use(cors(corsOptions));
app.use(express.json());// Substitui o antigo bodyParser.json()
app.use(express.urlencoded({ extended: true }));

// Rota de exemplo para upload de múltiplos arquivos
app.post('/upload', (req, res, next) => {
  // CORREÇÃO 2: Embrulhamos o multer em uma função manual para capturar o erro exato do upload
  upload.array('file')(req, res, function (err) {
    if (err) {
      console.error('Erro específico do Multer:', err);
      return res.status(500).json({ error: 'Erro no processamento do arquivo pelo Multer', detalhes: err.message });
    }

    const files = req.files;
    console.log('Arquivos recebidos com sucesso:', files);

    return res.send({
      mensagem: 'Upload realizado com sucesso!',
      dados: req.body,
      arquivos: files
    });
  });
});

app.get('/', (req, res) => res.send('API funcionando!'));

app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(500).json({ error: err.message });
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});
