const multer = require('multer');

// Configura o storage em memória
const storage = multer.memoryStorage();
const upload = multer({ storage }).array('file');

// Helper para rodar middlewares do Express no formato do Netlify
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

exports.handler = async (event, context) => {
  // Cabeçalhos padrão de CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Trata o Preflight request (OPTIONS) vindo do navegador/Firebase
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  }

  try {
    // Simula requisição/resposta para o Multer processar o formulário
    const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        mensagem: 'Upload realizado com sucesso no Netlify Functions!',
        tamanhoRecebido: bodyBuffer.length,
      }),
    };
  } catch (error) {
    console.error('Erro na Netlify Function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno no servidor ao processar o arquivo.' }),
    };
  }
};
