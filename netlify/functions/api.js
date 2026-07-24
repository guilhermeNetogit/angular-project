const cloudinary = require('cloudinary').v2;

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
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Variáveis de ambiente do Cloudinary não encontradas no Netlify.');
    }

    // Pega o buffer do arquivo recebido na requisição
    const fileBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');

    // Faz o upload via Stream para o Cloudinary identificar o tipo nativo do arquivo
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'angular_uploads',
          resource_type: 'auto', // Identifica automaticamente se é imagem, vídeo, PDF, etc.
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(fileBuffer);
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        mensagem: 'Upload realizado com sucesso no Cloudinary!',
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
      }),
    };
  } catch (error) {
    console.error('Erro no Cloudinary:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Falha ao processar arquivo no Cloudinary.',
        detalhe: error.message || String(error),
      }),
    };
  }
};
