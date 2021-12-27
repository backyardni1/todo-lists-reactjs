import propTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../context/TodosContext';

TodoFilters.prototype = {
  setFilter: propTypes.func.isRequired,
  clearTodos: propTypes.func.isRequired,
};

function TodoFilters(props) {
  const { todos, setTodos } = useContext(TodosContext);

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

  function countAll() {
    // console.log('slow load data');
    // for (let index = 0; index < 200000000; index++) {}
    return todos.length;
  }

  // const countAllValue = useMemo(countAll, [props.todos]);

  function countActive() {
    let active = todos.filter((todo) => todo.isCompleted === false);
    return active.length;
  }

  function countCompleted() {
    let completed = todos.filter((todo) => todo.isCompleted === true);
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
      Mark All <button onClick={() => setAllCompleted()}>Complete</button>{' '}
      <button onClick={() => setAllInComplete()}>Incomplete</button>{' '}
      <button onClick={(e) => clearTodos(e)}>Clear All</button>
    </div>
  );
}

export default TodoFilters;
