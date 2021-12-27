import React, { Component } from 'react';

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: 'Mang laba',
        },
        {
          id: 2,
          title: 'Manghugas plato',
        },
        {
          id: 3,
          title: 'Maligo',
        },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Todo Lists</h1>
          <input type="text" placeholder="Enter your todo and save" />
          &nbsp;
          <a href="">Add</a>
          <ul>
            {this.state.todos.map((todo, index) => (
              <li>
                <input type="checkbox" />
                {todo.title} / <a href="">delete</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
