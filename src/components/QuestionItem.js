import React from "react";

function QuestionItem({ question, onDelete, onAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleSelectChange(event) {
    const newQuestion = {...question, correctIndex: parseInt(event.target.value, 10)}
    //const newCorrectIndex = parseInt(event.target.value, 10);
  
    onAnswer(id, parseInt(event.target.value));
  }


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex.toString()} onChange={handleSelectChange}>{options}</select>
      </label>
      <button onClick={() => onDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
