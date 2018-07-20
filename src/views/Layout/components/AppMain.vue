<template lang="pug">
.app-main-wrapper
  .app-main
    transition(name="fade", mode="out-in")
      keep-alive
        router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppMain extends Vue {}
</script>

<style lang="scss" scoped>
.app-main-wrapper {
  position: absolute;
  top: 100px;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: #f0f0f0;
  z-index: 1;
  transition: left .3s;

  .app-main {
    margin: 10px;
  }
}
</style>
