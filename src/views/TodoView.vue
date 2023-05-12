<template>
  <div class="about">
    <h1>This is your todo list</h1>
    <todo-table />
  </div>
</template>
<script>
import TodoTable from '@/components/TodoTable.vue'
export default {
  components: { TodoTable },

}
</script>