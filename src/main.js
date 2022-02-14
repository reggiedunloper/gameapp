import { createApp } from 'vue'
import App from './App.vue'
// import VueSocketIO from 'vue-3-socket.io'
// import SocketIO from 'socket.io-client'
import './assets/tailwind.css'
import router from './router'

const app = createApp(App).use(router)

// app.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:3000', {autoConnect: false})
// }))

app.mount('#app')
