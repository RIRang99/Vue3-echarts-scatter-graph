import { createApp } from 'vue'
import App from './App.vue'
import scatterAndLine from '../src/components/scatterAndLine.vue'



const app = createApp(App)
app.component('scatter-and-line',scatterAndLine).mount('#app')
