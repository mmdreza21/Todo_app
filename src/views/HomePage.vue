<template>
  <div class="todos-page">
    <div class="background-img">


      <div class="todos-container mx-2 mx-md-10">
        <v-card flat class="d-flex  align-center my-3 justify-space-between px-2" width="200px">
          <h1 class="todos-heading">Todo List</h1>
          <v-btn variant="plain" size="small" icon="mdi-plus-box-outline" color="primary" @click="dialog = true" />
        </v-card>
        <ul class="todos-list">
          <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <div class="todo-details">
              <h3 class="todo-title">{{ todo.title }}</h3>
              <p class="todo-description">{{ todo.description }}</p>
              <p class="todo-created-at">Created At: {{ moment(todo.createdAt).format('yyyy/DD/mm') }}</p>
            </div>
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
  data() { return { moment: moment }; },
  setup() {
    const dialog = ref(false);
    const store = TodoLists();
    const todos = ref(store.getTodoLists);
    return {
      todos,
      dialog,
    };
  },
  components: { AddTodoListForm }
};
</script>

<style scoped>
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
  opacity: 0.7;
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
</style>
