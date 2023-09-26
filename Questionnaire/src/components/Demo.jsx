import React, { useState } from "react";

function FileInputButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <label
        className="file-input-button"
        style={{ border: "2px solid black" }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <span className="file-input-button-label">Choose File</span>
      </label>

      {/* Display the selected file name */}
      <p id="selected-file">
        {selectedFile ? `Selected File: ${selectedFile.name}` : ""}
      </p>
    </div>
  );
}

export default FileInputButton;
