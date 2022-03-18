<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" class="active-item" v-model="complete">
      <div class="todo-item-label" :class="{ completed: complete }">
        {{ title }}
      </div>
    </div>
    <div class="remove-item" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
  },
  data() {
      return {
          id: this.todo.id,
          title: this.todo.title,
          complete: this.todo.complete,
      }
  },
  methods: {
    removeTodo(index) {
        this.$emit('removeTodo', index)
    },
  }
};
</script>

<style lang="sass" scoped>

</style>