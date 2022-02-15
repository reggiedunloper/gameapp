<template>
  <main class="w-full h-screen flex content-between flex-wrap">
    <h1 class="w-full">Hello</h1>
    <section class="flex w-full justify-between">
      <uiButton @click="createRoom" class="bg-green-500">
        Create Game
      </uiButton>
      <uiButton @click="enterRoomName" class="bg-blue-600">
        Join Game
      </uiButton>
    </section>
    <Modal v-if="requestroomname" @close="closeModal">
      <input v-model="roomname" placeholder="Room #" class="rounded border border-black border-solid">
      <uiButton @click="joinRoom" class="bg-blue-600">
        Join
      </uiButton>
    </Modal>
  </main>
</template>

<script>
import uiButton from '../components/ui/Button'
import Modal from '../components/structure/Modal'
import socket from '../socket'

export default {
  components: {
    uiButton,
    Modal
  },
  data () {
    return {
      roomname: '',
      requestroomname: false,
      error: false
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
      if (this.roomname) {
        socket.connect();
        const room = this.roomname.toUpperCase();
        socket.emit('joinroom', room);
        // listen to 'roomname' socket for router
      }
    },
    enterRoomName () {
      this.requestroomname = true;
    },
    closeModal () {
      this.requestroomname = false;
    }
  },
  created () {
    socket.on('error', (data) => {
      this.error = true;
      console.log(data);
    }),
    socket.on('roomname', (data) => {
        this.$router.push({
          name: 'Waiting Room',
          params: {
            room: data
          }
        })
    })
  }

}
</script>
