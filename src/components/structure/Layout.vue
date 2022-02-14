<template>
  <main class="w-full h-screen flex content-between flex-wrap">
    <h1 class="w-full">Hello</h1>
    <section class="flex w-full justify-between">
      <uiButton @click="createRoom">
        Create Game
      </uiButton>
      <uiButton>
        Join Game
      </uiButton>
    </section>
  </main>
</template>

<script>
import uiButton from '../ui/Button'
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
    createRoom() {
      //generate a random number
      const randomnumber = Math.floor((Math.random() * (9999 - 1000)) + 1000);
      console.log(randomnumber);
      const roomname = 'R'+randomnumber
      this.$socket.emit('createroom', roomname);
      this.roomname = roomname
    }
  },
  sockets: {
  },


}
</script>
