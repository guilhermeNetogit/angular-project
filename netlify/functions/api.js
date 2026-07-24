const cloudinary = require('cloudinary').v2;

// Configuração do Cloudinary lendo das variáveis do ambiente Netlify
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  }

  try {
    // Decodifica o buffer recebido do upload
    const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');

    // Faz o upload direto para o Cloudinary via stream/buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'angular_uploads' }, // Pasta que será criada no Cloudinary
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(bodyBuffer);
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        mensagem: 'Upload realizado com sucesso no Cloudinary!',
        url: uploadResult.secure_url, // URL permanente pública gerada
        public_id: uploadResult.public_id,
      }),
    };
  } catch (error) {
    console.error('Erro no Cloudinary:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Falha ao salvar o arquivo no Cloudinary.' }),
    };
  }
};
