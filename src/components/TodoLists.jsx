import React, { useState } from 'react';
import propTypes from 'prop-types';
import TodoFilters from './TodoFilters';

function TodoLists(props) {
  const [filter, setFilter] = useState('all');

  //Props Types making sure the param value pass is a correct type
  //func means the its passing a function
  TodoLists.propTypes = {
    todoDelete: propTypes.func.isRequired,
    markAsCompleted: propTypes.func.isRequired,
    markAsEditing: propTypes.func.isRequired,
    onElementPress: propTypes.func.isRequired,
    autoSave: propTypes.func.isRequired,
    setAllCompleted: propTypes.func.isRequired,
    setAllInComplete: propTypes.func.isRequired,
  };

  function deleteRender(todo) {
    return (
      <a
        href="javascript;"
        className="deleteLink"
        onClick={(event) => props.todoDelete(event, todo.id)}
      >
        <img src="icons8-delete-16.png" alt="" />
      </a>
    );
  }

  return (
    <div>
      {props.todos.length > 0 ? (
        <ul>
          {props.todosFiltered(filter).map((todo, index) => (
            <li key={todo.id}>
              {!todo.isEditing && (
                <input
                  type="checkbox"
                  onChange={(event) => props.markAsCompleted(event, todo.id)}
                  checked={`${todo.isCompleted ? 'checked' : ''}`}
                />
              )}

              {!todo.isEditing && (
                <span
                  className={`${todo.isCompleted ? 'line-through' : ''}`}
                  onDoubleClick={() => props.markAsEditing(todo.id)}
                >
                  {todo.title}
                </span>
              )}

              {todo.isEditing && (
                <input
                  type="text"
                  defaultValue={todo.title}
                  onKeyDown={(event) => props.onElementPress(event, todo.id)}
                  onBlur={(event) => props.autoSave(event, todo.id)}
                  autoFocus
                />
              )}

              {!todo.isEditing && deleteRender(todo)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todo lists</p>
      )}
      {props.todos.length > 0 && (
        <TodoFilters
          todos={props.todos}
          setFilter={setFilter}
          clearTodos={props.clearTodos}
          setAllCompleted={props.setAllCompleted}
          setAllInComplete={props.setAllInComplete}
        />
      )}
    </div>
  );
}

export default TodoLists;
