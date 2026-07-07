import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Warn if credentials are missing
if (!cloudName || !apiKey || !apiSecret) {
  console.warn(
    'Cloudinary warning: Missing configuration environment variables. ' +
    'Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env.local file.'
  );
}
else
{
  console.log('Cloudinary configuration: ' + cloudName + ', ' + apiKey + ', ' + apiSecret);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;
