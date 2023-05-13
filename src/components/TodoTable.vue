<template>
  <div>
    <div class="d-flex  flex-wrap">

      <v-card width="360px" flat outlined class=" pa-3 border-md mx-2">
        <v-card-title>Select what to see</v-card-title>
        <v-checkbox hide-details="auto" class="my-n5" v-model="headers[1].visible" label="Description" />
        <v-checkbox hide-details="auto" class="my-n5" v-model="headers[2].visible" label="Due Date" />
        <v-checkbox hide-details="auto" class="mt-n5" v-model="headers[3].visible" label="Priority" />
      </v-card>
      <v-card flat max-width="500px" min-width="340px">

        <v-select required variant="outlined" class="my-2 rounded-lg" :items="priorities" v-model="priority"
          label="Select a Priority" @update:modelValue="priorityFilter" />
      </v-card>
    </div>

    <v-card flat>
      <v-card-title>
        Todo items for ( {{ todoList.find(e => e.id === +$route.params.id)?.title }} )

      </v-card-title>

    </v-card>

    <v-card flat min-width="100%" class="d-flex pa-2 justify-center align-center">
      <v-btn color="primary" @click="dialog = true">
        add Todo
      </v-btn>
    </v-card>
    <v-card class="mx-2" flat>
      <v-table class="border">
        <thead>
          <tr>
            <th v-for="(header, index) in headers.filter(e => e.visible)" :key="index">
              <span>
                {{ header.title }}
              </span>
            </th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">

            <td v-if="headers[0].visible">{{ todo.title }}</td>


            <td class="description-content" v-if="headers[3].visible && todo.description.length > 10">{{
              todo.description.substr(0, 10) + "..." }} <v-btn @click="showDisc(index)" size="x-small" variant="plain"
                icon="mdi-eye-outline"></v-btn>
            </td>

            <td class="description-content" v-else-if="headers[3].visible">{{ todo.description }}</td>



            <td v-if="headers[1].visible">{{ moment(todo.dueDate).format('yyyy/DD/MM') }}</td>
            <td v-if="headers[2].visible">{{ todo.priority }}</td>
            <td>

              <v-btn color="red" variant="plain" size="small" flat @click="deleteTodo(index)" :icon="'mdi-delete'" />
              <v-btn color="green" variant="plain" size="small" flat @click="editItem(index)" :icon="'mdi-pencil-box'" />

            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>


    <v-dialog v-model="dialog" width="auto">
      <AddTodoForm @addTodo="addTodo" @closeModal="dialog = false" />
    </v-dialog>
    <v-dialog v-model="EditDialog" width="auto">
      <AddTodoForm :todo="selectedTodo" editing @addTodo="addTodo" @closeModal="EditDialog = false"
        @editTodo="editTodo" />
    </v-dialog>

    <v-dialog v-model="descDialog" width="auto">
      <v-card min-height="200px" min-width="360px" class="pa-3 ">
        <v-card-title class="d-flex py-1 text-gray justify-space-between align-center border-b">
          Description

          <v-btn flat @click="this.descDialog = false" size="small" icon="mdi-window-close"></v-btn></v-card-title>
        <p>{{ desc }}</p>
      </v-card>


    </v-dialog>
  </div>
</template>

<script>
import { TodoLists } from '@/store/todoList';

import { ref } from "vue";
import AddTodoForm from './AddTodoForm.vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
export default {
  components: { AddTodoForm },
  data() { return { moment: moment, priorities: ["All", 'Low', 'Medium', 'High'], desc: '', descDialog: false } },

  setup() {
    const selectedTodo = ref({})
    const route = useRoute()
    const dialog = ref(false)
    const EditDialog = ref(false)
    const priority = ref()
    const store = TodoLists();
    const todoList = store.getTodoLists
    const todoListId = +route.params.id
    let todoItems = store.getTodoItems.filter(e => +e.todoListId === todoListId)
    const todos = ref(todoItems);

    const headers = ref([
      { title: "Title", visible: true },
      { title: "Description", visible: true },
      { title: "Due Date", visible: true },
      { title: "Priority", visible: true },
      { title: "Action", visible: true },
    ]);



    function addTodo(todo) {
      todos.value.push(todo)
    }
    function editTodo(todo) {
      todos.value = todo
    }
    function deleteTodo(index) {
      const todoNewState = store.deleteToDo(todos.value[index], todoListId)
      todos.value = todoNewState
      todoItems = todoNewState

    }
    function priorityFilter() {
      if (priority.value !== "All")
        todos.value = todoItems.filter(e => e.priority === priority.value)
      else
        todos.value = todoItems
    }

    return {
      headers,
      todos,
      priority,
      dialog,
      deleteTodo,
      addTodo,
      editTodo,
      priorityFilter,
      EditDialog,
      selectedTodo,
      todoList
    };
  },
  methods: {
    sort(index) {
      this.headers[index].isHide = !this.headers[index].isHide;
    },
    editItem(index) {
      console.log(this.todos[index]);
      this.EditDialog = true
      this.selectedTodo = this.todos[index]
    },
    showDisc(index) {
      this.desc = this.todos[index].description
      this.descDialog = true
    }
  },
};

</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}


table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 15px;
  border: none;
  text-align: left;
}

th {
  background-color: #6c757d;
  color: #ffffff;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f8f9fa !important;
}

.description-row {
  background-color: #f8f9fa;
  padding: 10px;
}

.description-content {
  margin-top: 10px;
  min-width: 200px;
}

td {
  border-bottom: solid 1px black;
}
</style>
