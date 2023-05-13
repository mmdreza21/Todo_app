<template>
  <div class="todos-page">
    <v-card max-width="344px" flat class="mx-5 border-md">
      <v-card-title>Upcoming TodoItems in 3 day`s </v-card-title>
      <v-card max-width="344px" max-height="200px" flat class="mx-5 overflow-y-auto" v-if="notifications.length">
        <ul class="notification-list">
          <li v-for="notification in notifications" :key="notification.description" class="notification">
            <span class="notification-description">{{ notification.title }}</span> -
            <span class="notification-due">Due in {{ notification.dueInDays }} days</span>
          </li>
        </ul>
      </v-card>
      <span class="ma-3" v-else> There is no upcoming Todo</span>
    </v-card>
    <div>
      <div class="todos-container mx-2 mx-md-10">
        <v-card flat class="d-flex  align-center my-3 justify-space-between px-2" width="200px">
          <h1 class="todos-heading">Todo List</h1>
          <v-btn variant="plain" size="small" icon="mdi-plus-box-outline" color="primary" @click="dialog = true" />
        </v-card>
        <ul class="todos-list">

          <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <router-link :to="`/todoList/${todo.id}`">

              <div class="d-flex justify-space-between align-center">
                <div class="todo-details">
                  <h3 class="todo-title">{{ todo.title }}</h3>
                  <p class="todo-description">{{ todo.description }}</p>
                  <p class="todo-created-at">Created At: {{ moment(todo.createdAt).format('yyyy/DD/MM') }}</p>
                </div>
                <!-- <v-btn size="large" icon="mdi-chevron-right"></v-btn> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <v-dialog v-model="dialog" width="auto">
      <AddTodoListForm @closeModal="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import { TodoLists } from '@/store/todoList';
import { ref } from "vue";
import moment from 'moment';
import AddTodoListForm from '@/components/AddTodoListForm.vue';
export default {
  components: { AddTodoListForm },
  data() { return { moment: moment, notifications: [] }; },
  setup() {
    const dialog = ref(false);
    const store = TodoLists();
    const todos = ref(store.getTodoLists);
    const todoItems = ref(store.getTodoItems);
    return {
      todos,
      dialog,
      todoItems
    };
  },
  mounted() {
    this.generateNotifications();
  },
  methods: {
    generateNotifications() {
      const today = new Date();


      this.todoItems.forEach((todo) => {
        const date = todo.dueDate
        if (date >= today) {
          const timeDiff = date - today;
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          const howManyDayes = 3
          if (daysDiff <= howManyDayes) {
            const notification = {
              title: todo.title,
              dueInDays: daysDiff
            };

            this.notifications.push(notification);
          }
        }
      });
    }
  },

};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.todos-page {
  position: relative;
}

.background-img {

  background-image: url('src/assets/img/cool-background.png');
  background-size: cover;

}

.todos-container {
  padding: 20px;
}

.todos-heading {
  font-size: 24px;

}

.todos-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  background-color: #e5e7eb;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.todo-description {
  margin-bottom: 10px;
}

.todo-created-at {
  color: black;
  font-size: 14px;
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.notification-description {
  font-weight: bold;
}

.notification-due {
  color: #888;
}
</style>
