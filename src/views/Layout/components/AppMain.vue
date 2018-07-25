<template lang="pug">
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
.app-main {
  padding: 10px;
}
</style>
