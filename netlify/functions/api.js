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
    if (!event.body) {
      throw new Error('Corpo da requisição veio vazio.');
    }

    let fileToUpload = null;
    let fileName = 'upload_file';

    // 1. Tenta interpretar como JSON (se veio em formato { file: "data:...", fileName: "..." })
    try {
      let rawBody = event.body;
      if (event.isBase64Encoded) {
        rawBody = Buffer.from(event.body, 'base64').toString('utf8');
      }
      const parsed = JSON.parse(rawBody);
      if (parsed && parsed.file) {
        fileToUpload = parsed.file;
        fileName = parsed.fileName || fileName;
      }
    } catch (jsonErr) {
      // 2. SE NÃO FOR JSON (Fallback): Trata o corpo bruto enviado pelo Angular
      if (event.isBase64Encoded) {
        // Se já vem em base64 do Netlify, montamos a Data URI direta
        fileToUpload = `data:application/octet-stream;base64,${event.body}`;
      } else {
        // Se veio em buffer bruto
        const base64Data = Buffer.from(event.body).toString('base64');
        fileToUpload = `data:application/octet-stream;base64,${base64Data}`;
      }
    }

    if (!fileToUpload) {
      throw new Error('Não foi possível extrair o arquivo do corpo da requisição.');
    }

    // 3. Envia para o Cloudinary com detecção automática do formato nativo do arquivo
    const uploadResult = await cloudinary.uploader.upload(fileToUpload, {
      folder: 'angular_uploads',
      resource_type: 'auto', // Detecta se é PNG, JPG, PDF, MP4, etc.
      filename_override: fileName,
      use_filename: true,
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
    console.error('Erro na Netlify Function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Falha ao processar upload.',
        detalhe: error.message || String(error),
      }),
    };
  }
};
