<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" class="active-item" v-model="complete" @change="doneEdit">
            <div v-if="!editing" class="todo-item-label" :class="{ completed: complete }">
                {{ title }}
            </div>
            <input v-else type="text" class="todo-item-edit" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
        </div>
        <div class="todo-item-right">
            <div class="todo-item-icon" @click="editTodo"><i class="fa-solid fa-pen"></i></div>
            <div class="remove-item" @click="removeTodo(index)">&times;</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            complete: this.todo.complete,
            editing: this.todo.editing,
            beforeEditTitle: this.todo.beforeEditTitle,
        }
    },
    watch: {

    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus()
            }
        }
    },
    methods: {
        removeTodo(index) {
            this.$emit('removedTodo', index)
        },
        editTodo() {
            this.beforeEditTitle = this.title
            this.editing = true;
        },
        doneEdit() {
            if(this.title.trim()  == '') {
                this.title = this.beforeEditTitle
            }
            this.editing = false;
            this.$emit('finishEdit', {
                index: this.index,
                todo: {
                    id: this.id,
                    title: this.title,
                    complete: this.complete,
                    editing: this.editing,
                }
            })
        },
        cancelEdit() {
            this.title = this.beforeEditTitle
            this.editing = false;
        },
    }
}
</script>