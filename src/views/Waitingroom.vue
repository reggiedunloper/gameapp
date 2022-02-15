<template>
  <main class="w-full h-screen flex content-between flex-wrap">
    <header v-if="room" class="w-full m-4 p-6 rounded-lg border-solid border-2 border-indigo-200">
      <h1 class="text-4xl font-bold text-center">Room: <span>{{ room }}</span></h1>
    </header>
    <section class="w-full p-4">
      <h2>Players Joined:</h2>
      <ul>
        <li v-for="(user,index) of users" :key=index
          class="py-3 border-solid border-b"
          >
          {{ user.id }}
        </li>
      </ul>
    </section>
    <section class="w-full flex justify-between">
      <uiButton @click="startGame" class="bg-green-500">
        Start Game
      </uiButton>
      <uiButton @click="leaveRoom" class="bg-gray-400">
        Cancel Game
      </uiButton>
    </section>
  </main>
</template>
<script>
import uiButton from '../components/ui/Button'
import socket from '../socket'

export default {
  components: {
    uiButton
  },
  data () {
    return {
      room: '',
      users: []
    }
  },
  mounted () {
    this.room = this.$route.params.room;
  },
  methods: {
    leaveRoom () {
      socket.emit('leaveroom', this.room);
      this.room = '';
      this.$router.push({ name: 'Landing' })
    },
    startGame () {
      console.log("STARTING GAME");
      socket.emit('startgame', this.room);
    },
    movetoGameView() {
      this.$router.push({
        name: 'Game',
        params: {
          room: this.room
        }
      })
    }
  },
  created () {
    socket.on('roomusers', (data) => {
      console.log("Users:", data);
      // slight delay ensures we get the players joined properly
      // this should probably be stored in a vue store
      setTimeout(() => {
        this.users = data;
      }, 0)
    }),
    socket.on('startgame', (data) => {
      console.log(data);
      this.movetoGameView();
    })
  }
}
</script>
