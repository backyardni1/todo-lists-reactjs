import React from 'react';

function FormTodo(props) {
  return (
    <div>
      <input
        type="text"
        value={props.todoInput}
        onChange={props.handleInput}
        placeholder="Enter your todo and add"
      />
      &nbsp;
      <a href="javascript;" onClick={(event) => props.todoAdd(event)}>
        <img src="icons8-add-24.png" className="addIcon" alt="" />
      </a>
    </div>
  );
}

export default FormTodo;
