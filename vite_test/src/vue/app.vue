<template>
  <div class="h2">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hi app',
    };
  },
};
</script>

<style scoped>
.h2 {
  color: white;
}
</style>
