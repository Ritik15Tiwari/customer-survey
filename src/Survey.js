import React, { useState, useEffect } from "react";

const WelcomeScreen = ({ onStart }) => (
  <div style={styles.container}>
    <h2>Welcome to the Survey</h2>
    <button style={styles.startButton} onClick={onStart}>Start Survey</button>
  </div>
);

const ThankYouScreen = ({ onReset }) => {
  useEffect(() => {
    const timer = setTimeout(onReset, 5000);
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div style={styles.container}>
      <h2>Thank You for Your Time!</h2>
    </div>
  );
};

const Survey = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem("surveyFeedback")) || {};
    setFeedback(savedFeedback);
  }, []);

  const questions = [
    "How satisfied are you with our products?",
    "How likely are you to recommend us to others?",
    "Was our customer service helpful?",
    "Rate your experience (1-10)",
    "Any suggestions for us?",
  ];

  const handleNext = () => {
    if (selectedOption !== null || currentStep === 5) {
      const updatedFeedback = { ...feedback, [currentStep]: selectedOption };
      if (currentStep === 5) {
        updatedFeedback[5] = document.getElementById("feedback-text").value;
      }
      setFeedback(updatedFeedback);
      localStorage.setItem("surveyFeedback", JSON.stringify(updatedFeedback));
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(feedback[currentStep + 1] || null);
    } else {
      if (window.confirm("Are you sure you want to submit the survey?")) {
        localStorage.setItem("surveyStatus", "COMPLETED");
        setCompleted(true);
        onComplete();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(feedback[currentStep - 1] || null);
    }
  };

  if (completed) return <ThankYouScreen onReset={() => window.location.reload()} />;

  return (
    <div style={styles.container}>
      <h2>Customer Survey</h2>
      <p>{currentStep}/5</p>
      <p>{questions[currentStep - 1]}</p>
      <div style={styles.optionsContainer}>
        {(currentStep === 4 ? [...Array(10).keys()].map(i => i + 1) : [1, 2, 3, 4, 5]).map(num => (
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
      {currentStep === 5 && (
        <textarea
          id="feedback-text"
          style={styles.textArea}
          placeholder="Your feedback..."
          defaultValue={feedback[5] || ""}
        />
      )}
      <div style={styles.buttonContainer}>
        <button style={styles.prevButton} onClick={handlePrev} disabled={currentStep === 1}>Prev</button>
        <button style={styles.nextButton} onClick={handleNext}>{currentStep === totalSteps ? "Submit" : "Next"}</button>
      </div>
    </div>
  );
};

const App = () => {
  const [startSurvey, setStartSurvey] = useState(false);
  return startSurvey ? <Survey onComplete={() => setStartSurvey(false)} /> : <WelcomeScreen onStart={() => setStartSurvey(true)} />;
};

const styles = {
  container: {
    width: "350px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#add8e6",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    margin: "100px auto",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  optionButton: {
    border: "1px solid black",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    textAlign: "center",
    cursor: "pointer",
  },
  textArea: {
    width: "100%",
    height: "50px",
    marginTop: "10px",
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
  startButton: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;




