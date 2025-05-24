import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => setQuestions(questions))
  },[])

  const handleAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex
      }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        );
        setQuestions(updatedQuestions);
      })
    }
    
  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE"
    })
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  function handleNewQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (<QuestionForm  onNewQuestion={handleNewQuestion}/> ):
      ( <QuestionList questions={questions} onDelete={handleDelete} onAnswer={handleAnswer} />)}
    </main>
  );
  }


export default App;
