<template>
  <main class="w-full h-screen flex content-between flex-wrap">
    <h1 class="w-full">Hello</h1>
    <input v-model="roomname" placeholder="Room #">
    <section class="flex w-full justify-between">
      <uiButton @click="createRoom" class="bg-green-500">
        Create Game
      </uiButton>
      <uiButton @click="joinRoom" class="bg-blue-600">
        Join Game
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
      roomname: '',
    }
  },
  methods: {
    // create a new randomly generated room
    createRoom () {
      socket.connect();
      //generate a random number
      const randomnumber = Math.floor((Math.random() * (9999 - 1000)) + 1000);
      console.log(randomnumber);
      const roomname = 'R'+randomnumber
      socket.emit('createroom', roomname);
      this.roomname = roomname
      //go to waiting room
      this.$router.push({
        name: 'Waiting Room',
        params: {
          room: this.roomname
        }
      })
    },
    joinRoom () {
      socket.connect();
      const room = this.roomname;
      socket.emit('joinroom', room);
      this.$router.push({
        name: 'Waiting Room',
        params: {
          room: room
        }
      })
    }
  },

}
</script>
