<template>
    <v-card height="588px" min-width="360px" class="pa-3 ">
        <v-card-title class="d-flex py-1 text-gray justify-space-between align-center border-b">Add new Todo <v-btn flat
                @click="closeModal" size="small" icon="mdi-window-close"></v-btn></v-card-title>
        <form ref="form" @submit.prevent="addTodo">
            <v-text-field required variant="outlined" class="my-2 rounded-lg" type="text" v-model="title"
                label="Enter a Title" />
            <VueDatePicker :required="true" position="center" class="my-2 rounded-lg" type="text" v-model="dueDate"
                placeholder="Enter a Due Date" />
            <v-textarea required variant="outlined" class="my-2 mt-4 rounded-lg" type="text" v-model="desc"
                label="Enter a Description" />
            <v-select required variant="outlined" class="my-2 rounded-lg" :items="Priority" v-model="priority"
                label="Select a Priority" />
            <v-btn block color="success" class="mt-10 rounded-lg" type="submit">Add</v-btn>
        </form>
    </v-card>
</template>

<script>
import { useAppStore } from '@/store/app';
export default {
    data() {
        return {

            title: '',
            desc: '',
            dueDate: '',
            priority: 'Low',
            Priority: ['Low', 'Medium', 'Hight']
        };

    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        addTodo() {

            const store = useAppStore()
            store.addTodoAction({
                title: this.title,
                description: this.desc,
                dueDate: new Date(this.dueDate).getTime(),
                Priority: this.priority,
            })
            this.closeModal()
        }
    }


}

</script>