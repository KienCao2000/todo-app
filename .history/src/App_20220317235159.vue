<template>
  <div id="app" class="container">
    <TodoList />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

<style>
:root {
  --bg-body: #161722;
  --img-bg: url(https://hariramjp777.github.io/frontend-todo-app/assets/images/bg-desktop-dark.jpg);
  --color-input: #25273c;
}
* {
  box-sizing: border-box;
}
body {
  background: var(--bg-body) var(--img-bg) no-repeat 0% 0% / 100% 300px;
}
.container {
  margin: 0 auto;
  max-width: 600px;
  padding: 0;
}
#app {
  font-family:Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 16px;
}
</style>
