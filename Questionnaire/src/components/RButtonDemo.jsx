import React, { useState } from "react";

function RButton() {
  const [answers, setAnswers] = useState({});

  // Function to handle radio button changes
  const handleRadioChange = (question, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  // Function to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Now, 'answers' contains the selected values for each question.
    console.log("Answers:", answers);
  };

  // An array of your 40 questions
  const questions = [
    "Question 1",
    "Question 2",
    "Question 1",
    "Question 2",
    "Question 1",
    "Question 2",
    "Question 1",
    "Question 2",
    "Question 1",
    "Question 2",
    "Question 1",
    "Question 2",
    // Add the rest of your questions here
  ];

  return (
    <div>
      <h1>Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              Q{index + 1}: {question}
            </p>
            <label>
              Yes
              <input
                type="radio"
                name={`question-${index}`}
                value="Yes"
                checked={answers[`question-${index}`] === "Yes"}
                onChange={() => handleRadioChange(`question-${index}`, "Yes")}
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name={`question-${index}`}
                value="No"
                checked={answers[`question-${index}`] === "No"}
                onChange={() => handleRadioChange(`question-${index}`, "No")}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RButton;
