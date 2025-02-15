import { useState, useEffect } from "react";
import { add_slider, get_slider, remove_slider } from "../http/api"; // Import your API functions
import "../AdminPannel/SliderForm.css";

const SliderForm = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await get_slider(); // Use your API function
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addImage = async () => {
    if (!selectedFile) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("slider", selectedFile); // Append the file directly

    try {
      await add_slider(formData); // Use your API function, passing FormData
      setSelectedFile(null);
      setPreview("");
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await remove_slider(id); // Use your API function, passing the ID
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">Slider Form</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="slider-input"
      />
      {preview && <img src={preview} alt="Preview" className="preview-image" />}
      <button onClick={addImage} className="slider-button add-button">
        Add Image
      </button>

      <ul className="slider-list">
        {images.map((image) => (
          <li key={image._id} className="slider-item">
            {" "}
            {/* Assuming your images have an _id */}
            <img
              src={`http://localhost:5001/slider/${image.imageUrl}`}
              alt="Slider"
              className="slider-image"
            />{" "}
            {/* Use imageUrl from your data */}
            <button
              onClick={() => deleteImage(image._id)}
              className="slider-button delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderForm;
