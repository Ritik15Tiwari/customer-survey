




import React, { useState } from "react";

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    "How satisfied are you with our products?",
    "How likely are you to recommend us to others?",
    "Was our customer service helpful?",
    "Did you find what you were looking for?",
    "Would you shop with us again?",
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null); 
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(null); 
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Survey</h2>
      <p>{currentStep}/5</p>
      <p>{currentStep}. {questions[currentStep - 1]}</p>
      <div style={styles.optionsContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            style={{
              ...styles.optionButton,
              backgroundColor: selectedOption === num ? "red" : "white",
            }}
            onClick={() => setSelectedOption(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.prevButton} onClick={handlePrev} disabled={currentStep === 1}>
          Prev
        </button>
        <button style={styles.nextButton} onClick={handleNext} disabled={currentStep === totalSteps}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#add8e6",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    margin: "200px 50px 100px 500px",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  optionButton: {
    border: "1px solid black",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    textAlign: "center",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  prevButton: {
    backgroundColor: "blue",
    color: "white",
    padding: "5px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  nextButton: {
    backgroundColor: "pink",
    color: "black",
    padding: "5px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Survey;
