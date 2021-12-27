import React, { useContext, useRef, useState } from 'react';
import propTypes from 'prop-types';
import TodoFilters from './TodoFilters';
import { TodosContext } from '../context/TodosContext';
import { TodoListsContext } from '../context/TodoListsContext';
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

function TodoLists() {
  const {
    todos,
    setTodos,
    markAsCompleted,
    markAsEditing,
    onElementPress,
    autoSave,
    todosFiltered,
  } = useContext(TodosContext);
  const [filter, setFilter] = useState('all');

  //Props Types making sure the param value pass is a correct type
  //func means the its passing a function
  TodoLists.propTypes = {
    // markAsCompleted: propTypes.func.isRequired,
    // markAsEditing: propTypes.func.isRequired,
    // onElementPress: propTypes.func.isRequired,
    // autoSave: propTypes.func.isRequired,
  };

  let todoDelete = (e, todoId) => {
    e.preventDefault();

    setTodos(todos.filter((todo) => todo.id !== parseInt(todoId)));
  };

  function deleteRender(todo) {
    return (
      <a
        href="javascript;"
        className="deleteLink"
        onClick={(event) => todoDelete(event, todo.id)}
      >
        <img src="icons8-delete-16.png" alt="" />
      </a>
    );
  }

  return (
    <div>
      {/* {todos.length > 0 ? ( */}

      <CSSTransition
        in={todos.length > 0}
        timeout={300}
        classNames="todo-lists"
        unmountOnExit
      >
        <TransitionGroup component="ul" className="todo-list">
          {todosFiltered(filter).map((todo, index) => (
            <CSSTransition key={todo.id} timeout={300} classNames="item">
              <li key={todo.id}>
                {!todo.isEditing && (
                  <input
                    type="checkbox"
                    onChange={(event) => markAsCompleted(event, todo.id)}
                    checked={`${todo.isCompleted ? 'checked' : ''}`}
                  />
                )}

                {!todo.isEditing && (
                  <span
                    className={`${todo.isCompleted ? 'line-through' : ''}`}
                    onDoubleClick={() => markAsEditing(todo.id)}
                  >
                    {todo.title}
                  </span>
                )}

                {todo.isEditing && (
                  <input
                    type="text"
                    defaultValue={todo.title}
                    onKeyDown={(event) => onElementPress(event, todo.id)}
                    onBlur={(event) => autoSave(event, todo.id)}
                    autoFocus
                  />
                )}

                {!todo.isEditing && deleteRender(todo)}
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </CSSTransition>
      <CSSTransition
        in={todos.length === 0}
        timeout={300}
        classNames="todo-lists"
        unmountOnExit
      >
        <p>No todo lists</p>
      </CSSTransition>

      {todos.length > 0 && <TodoFilters setFilter={setFilter} />}
    </div>
  );
}

export default TodoLists;
