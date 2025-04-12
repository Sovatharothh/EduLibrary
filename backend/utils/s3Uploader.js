const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const dotenv = require('dotenv');
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (file) => {
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME is not set');
  }

  // Compress the image
  const compressedBuffer = await sharp(file.buffer)
    .resize({ width: 800 }) // Resize to max width of 800px
    .jpeg({ quality: 80 }) // Compress to 80% quality
    .toBuffer();

  // Generate a unique key for the file
  const key = `book-covers/${Date.now()}-${file.originalname}`;

  // S3 upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: compressedBuffer,
    ContentType: file.mimetype,
  };

  // Upload to S3
  await s3Client.send(new PutObjectCommand(params));

  // Generate the public URL for the uploaded file
  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  // Return the file name and URL
  return { fileName: key, fileUrl }; 
};

module.exports = { uploadFileToS3 };
