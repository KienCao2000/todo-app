<template>
    <div>
        <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">All</button>
        <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">Active</button>
        <button :class="{ active: filter == 'complete' }" @click="changeFilter('complete')">Completed</button>
    </div>
</template>

<script>
import eventBus from '../main.js'

export default {
    name: 'todo-filtered',
    data() {
        return {
            filter: 'all',
        }
    },
    methods: {
        changeFilter(filter) {
            this.filter = filter
            eventBus.$emit('filterChange', filter)
        }
    }
}
</script>