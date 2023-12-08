import axios from "axios";
import { useState } from "react";

export function ImageDisplay() {
  const [imageUrl, setImageUrl] = useState("");

  const fetchImage = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/candidate`);
      const base64Image = btoa(new Uint8Array(data[3].photo.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      const url = `data:image/png;base64,${base64Image}`;
      setImageUrl(url);
      console.log(imageUrl)
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <button onClick={fetchImage}>Fetch Image</button>
      {imageUrl && <img src={imageUrl} alt="Candidate" />}
      {/* Rest of your component code */}
    </div>
  );
}
