<template>
  <main class="w-full h-screen flex content-between flex-wrap">
      <h1>Welcome to the Game!</h1>
  </main>
</template>
<script>
export default {
  data () {
    return {
      room: ''
    }
  },
  mounted () {
    this.room = this.$route.params.room;
  },
}
</script>