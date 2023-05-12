<template>
  <div class="todos-page">
    <div class="background-img"></div>
    <div class="todos-container">
      <h1 class="todos-heading">Todo List</h1>
      <ul class="todos-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="todo-details">
            <h3 class="todo-title">{{ todo.title }}</h3>
            <p class="todo-description">{{ todo.description }}</p>
            <p class="todo-created-at">Created At: {{ todo.createdAt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Complete Project',
          description: 'Finish the project tasks and submit the deliverables.',
          createdAt: '2023-05-12',
        },
        {
          id: 2,
          title: 'Go Grocery Shopping',
          description: 'Buy groceries for the week and restock the pantry.',
          createdAt: '2023-05-10',
        },
        // Add more todo items here
      ],
    };
  },
};
</script>

<style scoped>
.todos-page {
  position: relative;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('path/to/your/image.jpg');
  background-size: cover;
  opacity: 0.2;
}

.todos-container {
  padding: 20px;
}

.todos-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.todos-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  background-color: #ffffff;
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
  color: #999999;
  font-size: 14px;
}
</style>
