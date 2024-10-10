import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const showToast = useShowToast();
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type", " Please select an image file", "error");
      setImageUrl(null);
    }
  };
  return { imageUrl, handleImageChange,setImageUrl };
};

export default usePreviewImage;
