<template>
  <div>
    <div class="d-flex justify-start flex-wrap">
      <v-checkbox v-model="headers[1].visible" label="Description" />
      <v-checkbox v-model="headers[2].visible" label="Due Date" />
      <v-checkbox v-model="headers[3].visible" label="Priority" />
    </div>
    <v-card min-width="100%" class="d-flex justify-center align-center">
      <v-btn color="primary" @click="dialog = true">
        add Todo
      </v-btn>
    </v-card>
    <v-card class="mx-2" flat>
      <table class="border">
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
            <td class="description-content" v-if="headers[3].visible">{{ todo.description }}</td>
            <td v-if="headers[1].visible">{{ moment(todo.dueDate).format('yyyy/DD/mm') }}</td>
            <td v-if="headers[2].visible">{{ todo.Priority }}</td>
            <td>
              <v-hover v-slot="{ isHovering }">
                <v-btn color="red" variant="plain" size="small" flat @click="deleteTodo(id)"
                  :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'" />
              </v-hover>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>

    <div class="text-center">
      <v-dialog v-model="dialog" width="auto">
        <AddTodoForm @closeModal="dialog = false" />
      </v-dialog>
    </div>

  </div>
</template>

<script>
import { useAppStore } from '@/store/app';
import { ref } from "vue";
import AddTodoForm from './AddTodoForm.vue';
import moment from 'moment';
export default {
  data() { return { moment: moment } },
  setup() {
    const dialog = ref(false)
    const headers = ref([
      { title: "Title", visible: true },
      { title: "Description", visible: true },
      { title: "Due Date", visible: true },
      { title: "Priority", visible: true },
      { title: "Action", visible: true },
    ]);
    const store = useAppStore();
    const todos = ref(store.getTodos);

    function deleteTodo(todoId) {
      store.deleteToDo(todoId)
    }

    return {
      headers,
      todos,
      dialog,
      deleteTodo,
    };
  },
  methods: {
    sort(index) {
      this.headers[index].isHide = !this.headers[index].isHide;
    }
  },
  components: { AddTodoForm }
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
}

td {
  border-bottom: solid 1px black;
}
</style>
