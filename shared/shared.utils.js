import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadPhoto = async (file, userId) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;
  await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-k",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return "";
};
