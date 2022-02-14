<template>
  <main>
    <h1>Waiting</h1>
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
  }
}
</script>
