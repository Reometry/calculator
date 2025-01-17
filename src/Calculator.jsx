import React, { useState, useEffect, useRef } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState('');
  const [currentExpression, setCurrentExpression] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory') || '';
    setHistory(savedHistory);
    setDisplay(savedHistory);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [display]);

  const updateDisplay = (value) => {
    const newHistory = history + value + '\n';
    setHistory(newHistory);
    setDisplay(newHistory);
    localStorage.setItem('calculatorHistory', newHistory);
    setCurrentExpression('');
  };

  const appendToDisplay = (value) => {
    setCurrentExpression(prev => prev + value);
    setDisplay(history + currentExpression + value);
  };

  const clearDisplay = () => {
    setDisplay('');
    setHistory('');
    setCurrentExpression('');
    localStorage.removeItem('calculatorHistory');
  };

  const calculate = () => {
    if (currentExpression) {
      try {
        const result = eval(currentExpression);
        updateDisplay(`${currentExpression} = ${result}`);
      } catch (error) {
        updateDisplay(`${currentExpression} = Error`);
      }
    }
  };

  const performOperation = (operation, func) => {
    if (currentExpression) {
      const value = eval(currentExpression);
      const result = func(value);
      updateDisplay(`${operation}(${value}) = ${result}`);
    }
  };

  const factorial = () => {
    if (currentExpression) {
      const n = eval(currentExpression);
      if (n < 0 || !Number.isInteger(n)) {
        updateDisplay(`${n}! = Error`);
        return;
      }
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      updateDisplay(`${n}! = ${result}`);
    }
  };

  return (
    <div className="calculator">
      <textarea
        ref={textareaRef}
        value={display}
        readOnly
      />
      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={() => appendToDisplay('(')}>(</button>
        <button onClick={() => appendToDisplay(')')}>)</button>
        <button onClick={() => appendToDisplay('/')}>/</button>
        <button onClick={() => appendToDisplay('7')}>7</button>
        <button onClick={() => appendToDisplay('8')}>8</button>
        <button onClick={() => appendToDisplay('9')}>9</button>
        <button onClick={() => appendToDisplay('*')}>*</button>
        <button onClick={() => appendToDisplay('4')}>4</button>
        <button onClick={() => appendToDisplay('5')}>5</button>
        <button onClick={() => appendToDisplay('6')}>6</button>
        <button onClick={() => appendToDisplay('-')}>-</button>
        <button onClick={() => appendToDisplay('1')}>1</button>
        <button onClick={() => appendToDisplay('2')}>2</button>
        <button onClick={() => appendToDisplay('3')}>3</button>
        <button onClick={() => appendToDisplay('+')}>+</button>
        <button onClick={() => appendToDisplay('0')}>0</button>
        <button onClick={() => appendToDisplay('.')}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => appendToDisplay('**')}>^</button>
        <button onClick={() => performOperation('sin', Math.sin)}>sin</button>
        <button onClick={() => performOperation('cos', Math.cos)}>cos</button>
        <button onClick={() => performOperation('tan', Math.tan)}>tan</button>
        <button onClick={() => performOperation('log', Math.log10)}>log</button>
        <button onClick={() => performOperation('√', Math.sqrt)}>√</button>
        <button onClick={() => appendToDisplay('Math.PI')}>π</button>
        <button onClick={() => appendToDisplay('Math.E')}>e</button>
        <button onClick={factorial}>n!</button>
      </div>
      <style jsx>{`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: Arial, sans-serif;
        }

        #root {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .calculator {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 100%;
          height: 100%;
          max-width: 500px;
          max-height: 800px;
          display: flex;
          flex-direction: column;
        }

        textarea {
          flex-grow: 1;
          width: 100%;
          font-size: 18px;
          text-align: right;
          margin-bottom: 10px;
          padding: 10px;
          box-sizing: border-box;
          resize: none;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        button {
          padding: 15px;
          font-size: 18px;
          border: none;
          background-color: #f0f0f0;
          cursor: pointer;
          transition: background-color 0.3s;
          border-radius: 5px;
        }

        button:hover {
          background-color: #e0e0e0;
        }

        @media (max-width: 500px) {
          .calculator {
            border-radius: 0;
            max-width: none;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;
