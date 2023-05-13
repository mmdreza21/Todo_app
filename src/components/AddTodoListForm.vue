<template>
    <v-card height="454px" min-width="360px" class="pa-3 ">
        <v-card-title class="d-flex py-1 text-gray justify-space-between align-center border-b">Add new Todo <v-btn flat
                @click="closeModal" size="small" icon="mdi-window-close"></v-btn></v-card-title>
        <form ref="form" @submit.prevent="addTodo">
            <v-text-field required variant="outlined" class="my-2 rounded-lg" type="text" v-model="title"
                label="Enter a Title" />
            <v-textarea required variant="outlined" class="my-2 mt-4 rounded-lg" type="text" v-model="desc"
                label="Enter a Description" />

            <v-btn block color="success" class="mt-10 rounded-lg" type="submit">Add</v-btn>
        </form>
    </v-card>
</template>

<script>
import { TodoLists } from '@/store/todoList';
export default {
    name: 'AddTodoListForm',
    data() {
        return {

            title: '',
            desc: '',

        };

    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        addTodo() {

            const store = TodoLists()
            store.addTodoList({
                title: this.title,
                description: this.desc,
            })
            this.closeModal()
        }
    }


}

</script>