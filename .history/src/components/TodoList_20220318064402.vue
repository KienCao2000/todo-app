<template>
    <div>
        <h2>Hello</h2>
        <h1 class="header_title">TODO</h1>
        <main>
            <div class="add">
                <div class="cb_container">
                    <button class="add_btn" v-on:click="addTodo">+</button>
                </div>
                <div class="txt_container">
                    <input type="text" class="todo-input" placeholder="Create a new todo..." v-model="newTodo" @keyup.enter="addTodo">
                </div>
            </div>
            <ul>
                <div class="todo-item">
                    <div class="todo-item-left">
                    <input type="checkbox" class="active-item" v-model="todo.complete">
                    <div class="todo-item-label" :class="{ completed: todo.complete }">
                        {{ todo.title }}
                    </div>
                    </div>
                    <div class="remove-item" @click="removeTodo(index)">&times;</div>
                </div>                
            </ul>
            <div class="extra-container">
                <todo-item-remaining :remaining="remaining"></todo-item-remaining>
                <todo-filtered></todo-filtered>
                <div class="extra-container_clear">
                    <todo-clear-completed :ShowClearCompleted="ShowClearCompleted"></todo-clear-completed>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    // import eventBus from '../main.js'
    // import TodoItem from './TodoItem.vue'
    // import TodoFiltered from './TodoFiltered.vue'
    // import TodoItemRemaining from './TodoItemRemaining.vue'
    // import TodoClearCompleted from './TodoClearCompleted.vue'

    export default {
        name: 'TodoList',
        components: {
            // TodoItem,
            // TodoFiltered,
            // TodoItemRemaining,
            // TodoClearCompleted,
        },
        data() {
            return {
                newTodo: '',
                idForTodo: 1,
                filter: 'all',
                todos: [
                    {
                        id: 1,
                        title: 'Hello World',
                        complete: false,
                        editing: false,
                    },
                ]
            }
        },
        // created() {
        //     eventBus.$on('removeTodo', (index) => this.removeTodo(index))
        //     eventBus.$on('changeFilter', (filter) => this.filter = filter)
        //     eventBus.$on('clearCompletedTodo', () => this.ClearCompleted())
        // },
        computed:{
            remaining(){
                return this.todos.filter(todo => !todo.complete).length
            },
            todosFiltered(){
                if(this.filter == 'all'){
                    return this.todos
                } else if(this.filter == 'active') {
                    return this.todos.filter(todo => !todo.complete)
                } else if(this.filter == 'complete'){
                    return this.todos.filter(todo => todo.complete)
                }

                return this.todos
            },
        },
        methods: {
            addTodo() {
                if(this.newTodo.trim().length == 0) {
                    return
                }

                this.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    complete: false,
                    editing: false,
                })

                this.newTodo = ''
                this.idForTodo++
            },
            removeTodo(index) {
                this.todos.splice(index, 1)
            },
            ClearCompleted(){
                this.todos = this.todos.filter(todo => !todo.complete)
            }
        }
    }
</script>

<style lang = "scss" scope>
    .header_title {
        letter-spacing: 12px;
        color: #fff;
    }
    .add{
        width: 100%;
        background-color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 19px 20px;
        border-radius: 5px;
        margin-bottom: 48px;
    }
    .cb_container{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 1px solid #4d5066;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            background-color: #3a7bfd;
        }
    }
    .add_btn{
        background-color: transparent;
        color: #a6abd8;
        transition: color 0.3s ease;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        border: 0;
    }
    .txt_container{
        flex: 1;
    }
    .todo-input{
        width: 100%;
        padding: 10px 18px;
        font-size: 16px;
        background-color: transparent;
        border: 0;
        color: #e4e5f1;

        &:focus{
            outline: none;
        }
    }
    .todo-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        background-color: #333;
        padding: 18px 24px;
        border-bottom: 1px solid rgb(78, 76, 76);
        border-radius: 5px;
        

        &:hover .remove-item {
            display: block;
        }
    }
    .todo-item-left{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 2px;
    }
    .todo-item-label{
        margin-left: 12px;
    }
    .active-item{
        background-color: transparent;
        outline: none;
    }
    .remove-item{
        cursor: pointer;
        font-size: 24px;
        display: none;
        &:hover{
            color: #ccc;
        }
    }
    .completed{
        text-decoration: line-through;
        color: grey;
    }
    /* .check{
        background: url(https://hariramjp777.github.io/frontend-todo-app/assets/images/icon-check.svg);
        background-position: center;
        background-repeat: no-repeat;
    } */
    button{
        border: 0;
        background-color: transparent;
        color: rgb(85, 83, 83);

        &:hover{
            color: #fff;
        }
    }
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .extra-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
        padding: 18px 24px;
        color: rgb(85, 83, 83);
        border-radius: 5px; 
    }
    .extra-container_clear{
        &:hover{
            color: #fff;
            cursor: default;
        }
    }
    .active{
        color: #3a7bfd;
    }
</style>