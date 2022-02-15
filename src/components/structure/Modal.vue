<template>
  <section class="modalbg" @click.self="closeModal">
    <section class="modal">
      <slot />
    </section>
  </section>
</template>

<script>
export default {
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modalbg {
    position:absolute;
    top:0;
    left:0;
    overflow:hidden;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.2);
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width:80%;
    background:#fff;
    border-radius:12px;
    padding:2rem;
  }
</style>