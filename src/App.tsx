import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [numCorrectAnswers, setNumCorrectAnswers] = useState<number>(0);
  const [isRichardOpen, setIsRichardOpen] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  const makeEquation = () => {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    const signs = ["+", "-", "*", "/"];
    const sign = signs[Math.floor(Math.random() * signs.length)];

    let n3 = 0;
    if (sign === "+") {
      n3 = n1 + n2;
    } else if (sign === "-") {
      n3 = n1 - n2;
    } else if (sign === "*") {
      n3 = n1 * n2;
    } else {
      n3 = n1 / n2;
    }

    setCorrectAnswer(n3);
    setQuestion(n1 + " " + sign + " " + n2);
  };

  const onPasswordChange = (e: any) => {
    e.preventDefault();
    setIsQuestionOpen(true);
    makeEquation();
    setPassword(e.target.value);
  }

  const onNumberSubmit = (e: any, answer: number) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      setIsQuestionOpen(false)
      if (correctAnswer !== answer) {
        setPassword("");
        setIsRichardOpen(true);
      } else {
        setNumCorrectAnswers(numCorrectAnswers + 1);
      }
    }
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You have successfully logged in.</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              disabled={isQuestionOpen}
              onChange={(e) => onPasswordChange(e)}
              required
            />
          </div>
          {isQuestionOpen && (
            <div>
              <h1>Solve this math problem!!!!!!!!!!!!!! NOW GODDAMN IT!!!!!</h1>
              <p>{question}</p>
              <input
                type="number"
                onChange={(e) => setAnswer(e.target.valueAsNumber)}
                value={answer}
                onKeyDown={(e) => onNumberSubmit(e, correctAnswer)}
              />
            </div>
          )}
          {isRichardOpen && (
            <>
              <image href="./richard.png" />
              <p>RICHARD IS DISAPPOINTED IN YOU!!!!!!!!!!</p>
              <p>GET GOOD!</p>
            </>
          )}
          <button type="submit" disabled={numCorrectAnswers !== 100}>
            Enter
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
