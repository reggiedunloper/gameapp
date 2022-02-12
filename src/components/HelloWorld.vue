<template>
  <div class="hello">

    <button @click.prevent="createroom()">Create Room</button>

    <p>
    <input v-model="roomjoin" >
    <button @click.prevent="joinroom(roomjoin)">Join Room</button>
    </p>

    <h1>{{ totalCount }}</h1>
    <button @click.prevent="clickcounter">Click Counter</button>

    <button @click.prevent="startgame">Start New Game</button>

    <div v-if="isConnected">SOCKETS CONNECTED</div>
    <ul>
      <li v-for="user in users" :key="user.id">
        <span>{{ user.id }} :</span> {{ user.clicks }}
      </li>
    </ul>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data () {
    return {
      isConnected: false,
      totalCount: 0,
      users: []
    }
  },

  sockets: {
    connect() {
      this.isConnected = true
    },
    status(data) {
      console.log(data)
    },
    msg(data) {
      this.totalCount = data
    },
    users(users) {
      this.users = users
    },
    roominfo(data) {
      console.log(data)
    }
  },

  methods: {
    clickcounter() {
      this.$socket.emit('msg', 'clicked');
    },
    startgame() {
      this.$socket.emit('startgame', 'new game start');
    },
    // create a new randomly generated room
    createroom() {
      //generate a random number
      const randomnumber = Math.floor((Math.random() * (9999 - 1000)) + 1000);
      console.log(randomnumber);
      this.$socket.emit('createroom', 'ROOM'+randomnumber);
    },
    joinroom(roomjoin) {
      console.log(roomjoin);
      this.$socket.emit('joinroom', roomjoin);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
