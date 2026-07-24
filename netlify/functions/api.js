const cloudinary = require('cloudinary').v2;

// Configura o Cloudinary lendo das variáveis do Netlify
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
    // Checa se as variáveis foram carregadas no Netlify
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Variáveis de ambiente do Cloudinary não encontradas no Netlify.');
    }

    const fileBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
    const base64Content = `data:image/png;base64,${fileBuffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(base64Content, {
      folder: 'angular_uploads',
      resource_type: 'auto',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        mensagem: 'Upload realizado com sucesso no Cloudinary!',
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      }),
    };
  } catch (error) {
    console.error('Erro na Netlify Function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Falha no upload para o Cloudinary.',
        detalhe: error.message || error,
      }),
    };
  }
};
