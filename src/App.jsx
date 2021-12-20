import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import FormTodo from './components/FormTodo';
import TodoLists from './components/TodoLists';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Grocery at 09:00 AM',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Sleep early',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Feed the chickens',
      isCompleted: true,
      isEditing: false,
    },
    {
      id: 4,
      title: 'Do fishing',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: 5,
      title: 'Eating sweet potato',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: 6,
      title: 'Playing basketball',
      isCompleted: true,
      isEditing: false,
    },
  ]);

  const [todoUniqueId, setTodoUniqueId] = useState(todos.length + 1);

  const [todoInput, setTodoInput] = useState('');

  let todoDelete = (e, todoId) => {
    e.preventDefault();

    setTodos(todos.filter((todo) => todo.id !== parseInt(todoId)));
  };

  let todoAdd = (element) => {
    element.preventDefault();

    if (todoInput.trim().length <= 10) {
      alert('Please enter minimum of 10 characters.');
      return;
    }

    setTodos([
      ...todos,
      {
        id: todoUniqueId,
        title: todoInput,
        isCompleted: false,
        isEditing: false,
      },
    ]);
    setTodoInput('');
    setTodoUniqueId((prevTodoUniqueId) => prevTodoUniqueId + 1);
  };

  let markAsCompleted = (element, todoId) => {
    var newTodoLists = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isCompleted = element.target.checked;
      }

      return todo;
    });

    setTodos(newTodoLists);
  };

  let handleInput = (event) => {
    setTodoInput(event.target.value);
  };

  let markAsEditing = (todoId) => {
    let newTodoLists = todos.map((todo) => {
      if (todo.id === parseInt(todoId)) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(newTodoLists);
  };

  function onElementPress(element, todoId) {
    if (element.key === 'Escape') {
      let newTodoLists = todos.map((todo) => {
        if (todo.id === parseInt(todoId)) {
          todo.isEditing = false;
        }
        return todo;
      });

      setTodos(newTodoLists);
    }

    if (element.key === 'Enter') {
      autoSave(element, todoId);
    }
  }

  function autoSave(element, todoId) {
    var newValue = element.target.value;
    let newTodoLists = todos.map((todo) => {
      if (todo.id === parseInt(todoId)) {
        todo.title = newValue;
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(newTodoLists);
  }

  function todosFiltered(filter) {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => todo.isCompleted === false);

      case 'completed':
        return todos.filter((todo) => todo.isCompleted === true);

      default:
        return todos;
    }
  }

  function clearTodos(e) {
    e.preventDefault();
    setTodos([]);
  }

  function setAllCompleted() {
    let newLists = todos.map((todo) => {
      todo.isCompleted = true;
      return todo;
    });
    setTodos(newLists);
  }

  function setAllInComplete() {
    let newLists = todos.map((todo) => {
      todo.isCompleted = false;
      return todo;
    });
    setTodos(newLists);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Todo Lists (ReactJS)</h1>

        <FormTodo
          todoInput={todoInput}
          handleInput={handleInput}
          todoAdd={todoAdd}
        />
        {todos.length > 0 && <p>Note: double click todo item to edit.</p>}
        <TodoLists
          todos={todos}
          markAsCompleted={markAsCompleted}
          markAsEditing={markAsEditing}
          onElementPress={onElementPress}
          autoSave={autoSave}
          todoDelete={todoDelete}
          todosFiltered={todosFiltered}
          clearTodos={clearTodos}
          setAllCompleted={setAllCompleted}
          setAllInComplete={setAllInComplete}
        />
        <br />
        <br />

        <small>
          Reactjs -{' '}
          <a href="https://backyardni1.com">https://backyardni1.com</a>
        </small>
      </div>
    </div>
  );
}

export default App;
