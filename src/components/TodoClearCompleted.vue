<template>
    <div class="extra-container_clear">
        <button @click="ClearCompleted">Clear Complete</button>
    </div>
</template>

<script>
import eventBus from '../main.js'

export default {
    name: 'todo-clear-completed',
    props: {
        clearCompleted:{
            type: Boolean,
            required: true,
        }
    },
    methods: {
        ClearCompleted() {
            eventBus.$emit('clearCompleted')
        }
    }
}
</script>