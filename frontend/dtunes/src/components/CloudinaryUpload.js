import { openUploadWidget } from "../utils/CloudinaryService";
import { cloudinary_upload_preset , cloud_name} from "./config";
const CloudinaryUpload = ({setUrl, setUploadedfilename}) => {
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
            setUrl(result.info.secure_url) ;
            setUploadedfilename(result.info.original_filename);
        }else{
            if(error){
                console.log(error);
            }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-black rounded-lg p-3 font-semibold" onClick={uploadImageWidget}>
      Upload Song
    </button>
  );
};

export default CloudinaryUpload;