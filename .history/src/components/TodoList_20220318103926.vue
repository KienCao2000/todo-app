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
                <div class="todo-item" v-for="(todo, index) in todosFiltered" :key="todo.id">
                    <div class="todo-item-left">
                        <input type="checkbox" class="active-item" v-model="todo.complete">
                        <div class="todo-item-label" :class="{ completed: todo.complete }">
                        {{ todo.title }}
                        </div>
                        <input type="text" class="todo-item-edit" v-model="todo.title">
                    </div>
                    <div class="todo-item-right">
                        <div class="todo-item-icon"><i class="fa-solid fa-pen"></i></div>
                        <div class="remove-item" @click="removeTodo(index)">&times;</div>
                    </div>
                </div>                
            </ul>
            <div class="extra-container">
                <div>{{ remaining }} items left</div>
                <div class="extra-container_btn">
                    <button :class="{ active: filter == 'all' }" @click="filter ='all'">All</button>
                    <button :class="{ active: filter == 'active' }" @click="filter ='active'">Active</button>
                    <button :class="{ active: filter == 'complete' }" @click="filter ='complete'">Completed</button>                   
                </div>
                <div class="extra-container_clear">
                    <button @click="ClearCompleted">Clear Complete</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

    export default {
        name: 'TodoList',
        components: {
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
        border: 0;
    }
    .active-item{
        background-color: transparent;
        outline: none;
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