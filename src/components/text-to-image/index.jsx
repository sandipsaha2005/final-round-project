import React, { useState } from 'react';
import { useEffect } from 'react';
function ImageGenerator() {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [loader,setLoader]=useState(false)
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const token='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'

  const generateImage = async () => {
    const query = async (data) => {
        setLoader(true)
      const response = await fetch(
        "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
        // "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    };

    try {
      const userText = inputText; // Replace with user input if needed
      const imageBlob = await query({ inputs: userText });

      // Create a URL for the blob and set it in the state
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageURL(imageObjectURL);
    } catch (error) {
      console.error("Error generating image:", error);
      setLoader(false)
    }
  };

  useEffect(() => {
    if(imageURL){
        setLoader(false)
    }
  }, [imageURL])
  

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter a description"
      />
      <button onClick={generateImage}>Generate Image</button>
      {imageURL && <img src={imageURL} alt="Generated" />}
    </div>
  );
}

export default ImageGenerator;
