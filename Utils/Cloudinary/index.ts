import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dzfaefnjk', 
    api_key: '369999426879935', 
    api_secret: 'ICdf-oUQFWl7lHMN7GJKScWc6D4',
    secure: true
  });

  const UploadImage = async (imagePath:any) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    // cloudinary.image(imagePath, {width: 200, crop: "scale"})
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

export default UploadImage