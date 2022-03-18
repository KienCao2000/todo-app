import Vue from 'vue'
import App from './App.vue'

const EventBus = new Vue()
export default EventBus

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
