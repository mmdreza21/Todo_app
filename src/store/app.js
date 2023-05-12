// Utilities
import moment from 'moment';
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
  state: () => ({
    todos: JSON.parse(localStorage.todos || "[]") || []
  }),
  getters: {
    getTodos() {
      return this.todos
    },
    sortedTodos() {
      return this.todos.sort((a, b) => {
        // Sort todos based on due date in ascending order
        return moment(a.dueDate).diff(moment(b.dueDate));
      });
    },
  },
  actions: {
    addTodoAction(todo) {
      let reandomId = Math.floor(Math.random() * (2000 - 0 + 1))
      const todoIndex = this.todos.findIndex(e => e.id === reandomId)
      if (todoIndex >= 0) {
        reandomId = Math.floor(Math.random() * (4000 - 2001 + 1))
      }
      const declareNewTodo = { id: reandomId, ...todo, createdAt: Date.now() }

      this.todos.push(declareNewTodo)
      localStorage.todos = JSON.stringify(this.todos)
    },
    deleteToDo(todoId) {
      const todoIndex = this.todos.findIndex(e => e.id === todoId)
      this.todos.splice(todoIndex, 1)
      localStorage.todos = JSON.stringify(this.todos)
    }
  },

})
