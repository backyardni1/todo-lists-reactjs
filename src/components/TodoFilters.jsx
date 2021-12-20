import propTypes from 'prop-types';
import React from 'react';

TodoFilters.prototype = {
  setFilter: propTypes.func.isRequired,
  clearTodos: propTypes.func.isRequired,
  setAllCompleted: propTypes.func.isRequired,
  setAllIncompleted: propTypes.func.isRequired,
};

function TodoFilters(props) {
  function countAll() {
    return props.todos.length;
  }

  function countActive() {
    let active = props.todos.filter((todo) => todo.isCompleted === false);
    return active.length;
  }

  function countCompleted() {
    let completed = props.todos.filter((todo) => todo.isCompleted === true);
    return completed.length;
  }

  return (
    <div>
      <button onClick={() => props.setFilter('all')}>All({countAll()})</button>{' '}
      <button onClick={() => props.setFilter('active')}>
        Active({countActive()})
      </button>{' '}
      <button onClick={() => props.setFilter('completed')}>
        Completed({countCompleted()})
      </button>{' '}
      <br />
      <br />
      <br />
      Mark All <button onClick={() => props.setAllCompleted()}>
        Complete
      </button>{' '}
      <button onClick={() => props.setAllInComplete()}>Incomplete</button>{' '}
      <button onClick={(e) => props.clearTodos(e)}>Clear All</button>
    </div>
  );
}

export default TodoFilters;
