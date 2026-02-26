/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
    return this;
  }

  remove(index) {
    if (this._isValidIndex(index)) {
      this.todos.splice(index, 1);
    }
    return this;
  }

  update(index, updatedTodo) {
    if (this._isValidIndex(index)) {
      this.todos[index] = updatedTodo;
    }
    return this;
  }

  getAll() {
    return [...this.todos];
  }

  get(index) {
    if (this._isValidIndex(index)) {
      return this.todos[index];
    }
    return null;
  }

  clear() {
    this.todos = [];
    return this;
  }

  _isValidIndex(index) {
    return (
      typeof index === "number" &&
      index >= 0 &&
      index < this.todos.length
    );
  }
}

module.exports = Todo;

module.exports = Todo;