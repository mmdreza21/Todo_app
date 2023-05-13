// Utilities
import moment from 'moment';
import { defineStore } from 'pinia'


export const TodoLists = defineStore('app', {
  state: () => ({
    todoLists: JSON.parse(localStorage.todoLists || "[]") || [],
    todoItems: JSON.parse(localStorage.todoItems || "[]") || [],//{todoListId}
  }),
  getters: {
    getTodoLists() {
      return this.todoLists
    },
    getTodoItems() {
      return this.todoItems
    },
    sortedTodo() {
      return this.todo.sort((a, b) => {

        return moment(a.dueDate).diff(moment(b.dueDate));
      });
    },
  },

  actions: {
    addTodoList(todo) {
      let randomId = Math.floor(Math.random() * (2000 - 0 + 1))
      const todoIndex = this.todoLists.findIndex(e => e.id === randomId)
      if (todoIndex >= 0) {
        randomId = Math.floor(Math.random() * (4000 - 2001 + 1))
      }
      const declareNewTodo = { id: randomId, ...todo, createdAt: Date.now() }
      this.todoLists.push(declareNewTodo)
      localStorage.todoLists = JSON.stringify(this.todoLists)
    },

    addTodoItems(todo, todoListId) {
      let randomId = Math.floor(Math.random() * (2000 - 0 + 1))
      console.log(randomId);
      const todoIndex = this.todoItems.findIndex(e => e.id === randomId)
      if (todoIndex >= 0) {
        randomId = Math.floor(Math.random() * (4000 - 2001 + 1))
      }

      const declareNewTodo = { id: randomId, todoListId, ...todo, createdAt: Date.now() }
      this.todoItems.push(declareNewTodo)
      localStorage.todoItems = JSON.stringify(this.todoItems)
    },


    editTodoItem(todoId, newTodo, todoListId,) {
      console.log(todoId);
      const todoIndex = this.todoItems.findIndex(e => e.id === todoId)
      if (todoIndex > -1) {
        this.todoItems.splice(todoIndex, 1, newTodo)
        localStorage.todoItems = JSON.stringify(this.todoItems)
        return this.todoItems.filter(e => e.todoListId === todoListId)
      }

    },


    deleteToDo(todoId, todoListId) {
      const todoIndex = this.todoItems.findIndex(e => e.id === todoId)
      this.todoItems.splice(todoIndex, 1)
      localStorage.todoItems = JSON.stringify(this.todoItems)
      return this.todoItems.filter(e => e.todoListId === todoListId)
    }
  },

})
