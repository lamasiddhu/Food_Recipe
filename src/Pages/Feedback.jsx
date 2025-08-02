import React, { useState } from "react";
import "../Styles/Feedback.css";

const Feedback = () => {
  const categories = [
    "User Interface (UI)",
    "User Experience (UX)",
    "AI Recipe Suggestions",
    "Search Functionality",
    "Customization Options",
    "Performance & Speed",
    "Ingredient Substitutions",
    "Dietary Preferences Support",
    "Errors & Bugs",
    "Other Suggestions",
  ];

  const [feedbackData, setFeedbackData] = useState(
    categories.map((category) => ({
      category,
      feedback: "",
      rating: 0,
      experience: "Good",
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...feedbackData];
    updated[index][field] = value;
    setFeedbackData(updated);
  };

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedbackData);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="feedback-container">
      <h2>AI Recipe Generator Feedback</h2>
      <div className="feedback-table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Feedback</th>
              <th>Star Rating</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter feedback"
                    value={item.feedback}
                    onChange={(e) =>
                      handleInputChange(index, "feedback", e.target.value)
                    }
                  />
                </td>
                <td>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() =>
                          handleInputChange(index, "rating", star)
                        }
                        className={`star ${
                          star <= item.rating ? "active" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <select
                    value={item.experience}
                    onChange={(e) =>
                      handleInputChange(index, "experience", e.target.value)
                    }
                  >
                    <option value="Good">Good</option>
                    <option value="Bad">Bad</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
