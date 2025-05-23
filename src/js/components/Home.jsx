import React, { useEffect } from 'react';

import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';

import Header from './Header';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState();
  // Get the todos from API
  const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}` // Fetching the todos from the API
        );
        if (!response.ok) {
          setError('API Error');
        }
        const data = await response.json();
        console.log(data);
        // Set the todos in the state
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos(); // Call the function to fetch todos
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <Header />

      <section className="todo-entry">
        <div className="todo-form">
          <input
            className="todo-input"
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="What needs to be done?"
          />
          {/* <button onClick={handleAddTodo}>Add</button> */}
          <FaPlus onClick={handleAddTodo} />
        </div>
      </section>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span>{todo.title}</span>
            {/* <button onClick={() => handleDeleteTodo(index)}>Delete</button> */}
            <FaRegTrashCan onClick={() => handleDeleteTodo(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
