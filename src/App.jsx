import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import FormTodo from './components/FormTodo';
import TodoLists from './components/TodoLists';
import useToggle from './hooks/useToggle';
import useLocalStorage from './hooks/useLocalStorage';
import { TodosContext } from './context/TodosContext';
import { TodoListsContext } from './context/TodoListsContext';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [isTodoListsVisible, setIsTodoListsVisible] = useToggle(true);
  const nameElement = useRef(null);

  const [name, setName] = useLocalStorage('name', '');
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [todoUniqueId, setTodoUniqueId] = useLocalStorage(
    'todoId',
    todos.length + 1
  );

  const [todoInput, setTodoInput] = useState('');

  let todoAdd = (element) => {
    element.preventDefault();

    if (todoInput.trim().length <= 5) {
      alert('Please enter minimum of 5 characters.');
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
    // for (let index = 0; index < 200000000; index++) {}
    switch (filter) {
      case 'active':
        return todos.filter((todo) => todo.isCompleted === false);

      case 'completed':
        return todos.filter((todo) => todo.isCompleted === true);

      default:
        return todos;
    }
  }

  // useEffect(() => {
  //   console.log('use effect');
  // }, [name, todos]);

  // useEffect(() => {
  //   console.log('use effect');

  //   return function cleanup() {
  //     console.log('clean up');
  //   };
  // }, [name]);

  // const todosFileterd = useMemo(todosFiltered, [todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        markAsCompleted,
        markAsEditing,
        onElementPress,
        autoSave,
        todosFiltered,
      }}
    >
      <div className="App">
        <div className="container">
          <h1>Todo Lists (ReactJS)</h1>
          <button onClick={() => nameElement.current.focus()}>
            focus on button
          </button>
          <br /> <br />
          <div className="name-container">
            <input
              type="text"
              placeholder="What is your name?"
              ref={nameElement}
              defaultValue={name}
              onChange={() => setName(nameElement.current.value)}
            />
          </div>
          {/* {name && <p className="name-container">Hi {name},</p>} */}
          <CSSTransition
            in={name.length > 0}
            timeout={300}
            classNames="slide-vertical"
            unmountOnExit
          >
            <p className="name-container">Hi {name},</p>
          </CSSTransition>
          <br />
          <div className="custom-hook-container">
            <button
              className="button"
              onClick={() =>
                setIsTodoListsVisible(
                  (previousValueIsVisible) => !previousValueIsVisible
                )
              }
            >
              Toggle TodoLists
            </button>

            <br />
            <br />
          </div>
          <FormTodo
            todoInput={todoInput}
            handleInput={handleInput}
            todoAdd={todoAdd}
          />
          {todos.length > 0 && <p>Note: double click todo item to edit.</p>}
          {/* {isTodoListsVisible && <TodoLists />} */}
          <CSSTransition
            in={isTodoListsVisible}
            timeout={300}
            classNames="todo-lists"
            unmountOnExit
          >
            <TodoLists />
          </CSSTransition>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
