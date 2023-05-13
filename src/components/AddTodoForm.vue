<template>
    <v-card height="588px" min-width="360px" class="pa-3 ">
        <v-card-title class="d-flex py-1 text-gray justify-space-between align-center border-b">
            {{ editing ? 'Edit' : 'Add New' }} Todo

            <v-btn flat @click="closeModal" size="small" icon="mdi-window-close"></v-btn></v-card-title>
        <form ref="form" @submit.prevent="submit">
            <v-text-field required variant="outlined" class="my-2 rounded-lg" type="text" v-model="form.title"
                label="Enter a Title" />
            <VueDatePicker :required="true" position="center" class="my-2 rounded-lg" type="text" v-model="form.dueDate"
                placeholder="Enter a Due Date" />
            <v-textarea required variant="outlined" class="my-2 mt-4 rounded-lg" type="text" v-model="form.description"
                label="Enter a Description" />
            <v-select required variant="outlined" class="my-2 rounded-lg" :items="Priority" v-model="form.priority"
                label="Select a Priority">

            </v-select>
            <v-btn block color="success" class="mt-10 rounded-lg" type="submit">{{ editing ? 'Edit' : 'Add ' }}</v-btn>
        </form>
    </v-card>
</template>

<script>
import { TodoLists } from '@/store/todoList';
export default {
    props: {
        editing: {
            type: Boolean,
            default() {
                return false
            },
        },
        todo: {
            type: Object,
            default() {
                return {
                    title: '',
                    description: '',
                    dueDate: '',
                    priority: 'Low',
                }
            }
        }
    },
    data() {
        return {
            form: this.editing ? { ...this.todo } : {
                title: '',
                description: '',
                dueDate: '',
                priority: 'Low',
            },
            Priority: ['Low', 'Medium', 'High']
        };

    },

    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        async submit() {
            const store = TodoLists()
            const newTodo = {
                ...this.form,
                dueDate: new Date(this.form.dueDate).getTime(),

            }

            if (this.editing) {
                await store.editTodoItem(this.form.id, newTodo, +this.$route.params.id)
                console.log(newTodo);
                this.$emit('editTodo', newTodo)
            }
            else {
                await store.addTodoItems(newTodo)
                this.$emit('addTodo', newTodo)
            }


            this.closeModal()

        }

    }


}

</script>