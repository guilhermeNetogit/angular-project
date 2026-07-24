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
    // Lê o JSON enviado pelo Angular
    const body = JSON.parse(event.body);
    const fileDataUri = body.file;
    const fileName = body.fileName;

    if (!fileDataUri) {
      throw new Error('Nenhum arquivo encontrado no corpo da requisição.');
    }

    // Envia a Data URI direta para o Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileDataUri, {
      folder: 'angular_uploads',
      resource_type: 'auto', // Detecta automaticamente PNG, JPG, PDF, MP4, etc.
      use_filename: true,
      filename_override: fileName,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        mensagem: 'Upload realizado com sucesso no Cloudinary!',
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        resource_type: uploadResult.resource_type,
      }),
    };
  } catch (error) {
    console.error('Erro no Cloudinary:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Falha ao processar arquivo.',
        detalhe: error.message || String(error),
      }),
    };
  }
};
