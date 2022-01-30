<template>
  <div class="hello">
    <h1>{{ totalCount }}</h1>
    <button @click.prevent="clickcounter">Click Counter</button>
    <div v-if="isConnected">SOCKETS CONNECTED</div>
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
      totalCount: 0
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
    }
  },

  methods: {
    clickcounter() {
      this.$socket.emit('msg', 'clicked');
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
