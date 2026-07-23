const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Garante a criação da pasta de uploads
const dir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // Limite opcional de 10MB
});

// Middleware de CORS: permite apenas a URL da sua app no Firebase
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API de Upload rodando!'));

// Rota de Upload (Aceita tanto /api/upload quanto /upload)
const handleUpload = (req, res) => {
  try {
    console.log('Arquivos recebidos:', req.files?.length);
    return res.status(200).json({
      mensagem: 'Upload realizado com sucesso no Netlify!',
      arquivos: req.files?.map(f => f.originalname)
    });
  } catch (error) {
    console.error('Erro no processamento:', error);
    return res.status(500).json({ erro: 'Falha ao processar arquivo' });
  }
};

// Rota de Upload
app.post('/api/upload', upload.array('file'), handleUpload);
app.post('/upload', upload.array('file'), handleUpload);

// Apenas roda o listen se estiver rodando localmente no Node
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

module.exports = app;

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(500).json({ error: err.message });
});
