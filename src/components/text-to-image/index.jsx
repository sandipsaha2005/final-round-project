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
    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-900 min-h-screen p-4">
    <h2 className="text-2xl font-semibold text-white mb-4">Generate Image</h2>
    
    <input
      type="text"
      value={inputText}
      onChange={handleChange}
      placeholder="Enter a description"
      className="w-full max-w-md p-3 text-black rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none transition duration-200"
    />
  
    <button 
      onClick={generateImage}
      className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
    >
      Generate Image
    </button>
  
    {imageURL && (
      <div className="mt-6">
        <img 
          src={imageURL} 
          alt="Generated" 
          className="rounded-lg shadow-lg border border-gray-700 max-w-md mx-auto"
        />
      </div>
    )}
  </div>
  
  );
}

export default ImageGenerator;
