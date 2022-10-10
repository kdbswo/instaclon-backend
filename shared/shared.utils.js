import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-k",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

const s3 = new AWS.S3();

export const delPhotoFromS3 = async (file, folderName) => {
  const decodedUrl = decodeURI(file);
  const filePath = decodedUrl.split(`/${folderName}/`)[1];
  const fileName = `${folderName}/${filePath}`;

  await s3
    .deleteObject({
      Bucket: "instaclone-uploads-k",
      Key: fileName,
    })
    .promise();
};
