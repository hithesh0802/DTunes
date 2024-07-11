import { openUploadWidget } from "../utils/CloudinaryService";
import { cloudinary_upload_preset , cloud_name} from "../config";
const CloudinaryUpload = () => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloud_name,
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            console.log(result.info.secure_url);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-red-500 text-black rounded-lg p-2 font-semibold" onClick={uploadImageWidget}>
      Upload Song
    </button>
  );
};

export default CloudinaryUpload;