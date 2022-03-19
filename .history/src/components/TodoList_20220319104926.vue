<template>
    <div>
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
                <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index">
                </todo-item>                
            </ul>
            <div class="extra-container">
                <todo-item-remaining :remaining="remaining"></todo-item-remaining>
                <div class="extra-container_btn">
                    <todo-filtered></todo-filtered>                   
                </div>
                <todo-clear-completed :clearCompleted="clearCompleted"></todo-clear-completed>
            </div>
        </main>
    </div>
</template>

<script>
    import eventBus from '../main.js'
    import TodoItem from './TodoItem.vue'
    import TodoItemRemaining from './TodoItemRemaining.vue'
    import TodoFiltered from './TodoFiltered.vue'
    import TodoClearCompleted from './TodoClearCompleted.vue'

    export default {
        name: 'TodoList',
        components: {
            TodoItem,
            TodoItemRemaining,
            TodoFiltered,
            TodoClearCompleted
        },
        data() {
            return {
                newTodo: '',
                idForTodo: 1,
                beforeEditTitle: '',
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
        created() {
            eventBus.$on('removedTodo', (index) => this.removeTodo(index))
            eventBus.$on('finishEdit', (data) => this.finishEdit(data))
            eventBus.$on('filterChange', (filter) => this.filter = filter)
            eventBus.$on('clearCompleted', () => this.ClearCompleted())
        },
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
            },
            finishEdit(data){
                this.todos.splice(data.index, 1 , data.todo)
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
        background-color: #25273c;
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

        &:hover .add_btn{
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
        border-radius: 50%;
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
        background-color: #25273c;
        padding: 18px 24px;
        border-bottom: 1px solid rgb(78, 76, 76);
        border-radius: 5px;
        

        &:hover .remove-item {
            display: block;
        }
        &:hover .todo-item-icon {
            display: block;
        }
    }
    .todo-item-left{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 2px;
    }
    .todo-item-right{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .todo-item-label{
        margin-left: 12px;
    }
    .todo-item-edit{
        background-color: transparent;
        border: 1px solid rgb(80, 77, 77);
        color: #fff;
        font-size: 18px;
        width: 100%;
        margin-left: 12px;
        border: 0;
        
        &:focus{
            outline: none;
        }
    }
    .active-item{
        background-color: transparent;
        outline: none;
        opacity: 0;
    }
    .remove-item{
        cursor: pointer;
        font-size: 24px;
        display: none;
        margin-left: 16px;
        &:hover{
            color: #ccc;
        }
    }
    .todo-item-icon{
        display: none;
        cursor: pointer;
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
        background-color: #25273c;
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
    .check{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        border-radius: inherit;
    }
    .checked{
        background: url(https://hariramjp777.github.io/frontend-todo-app/assets/images/icon-check.svg), linear-gradient(45deg, #57ddff, #c058f3);
        background-repeat: no-repeat;
        background-position: center;
    }
</style>