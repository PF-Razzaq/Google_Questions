import React, { useState } from "react";

const RadioButtonGroup = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "Yes") {
      setShowFileUpload(true);
      setShowDescriptionInput(false);
    } else if (value === "Other") {
      setShowFileUpload(false);
      setShowDescriptionInput(true);
    } else {
      setShowFileUpload(false);
      setShowDescriptionInput(false);
    }
  };

  const handleButtonClick = () => {
    // Perform your action here when the button is clicked
    // For example, you can submit the form or trigger some other functionality.
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <input
                  type="radio"
                  name="radioOptions"
                  value="Yes"
                  checked={selectedOption === "Yes"}
                  onChange={handleOptionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="radioOptions"
                  value="No"
                  checked={selectedOption === "No"}
                  onChange={handleOptionChange}
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="radioOptions"
                  value="Other"
                  checked={selectedOption === "Other"}
                  onChange={handleOptionChange}
                />
                Other
              </label>
            </div>

            {showFileUpload && (
              <div>
                <label>Upload File:</label>
                <input type="file" />
              </div>
            )}

            {showDescriptionInput && (
              <div>
                <label>Description:</label>
                <input type="text" placeholder="Enter Description" />
              </div>
            )}

            <button className="btn btn-primary" onClick={handleButtonClick}>
              Perform Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioButtonGroup;
