<template lang="pug">
div navbar
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {}
</script>
<style lang="scss" scoped>
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 1px 1px rgba(100, 100, 100, .1);
  position: relative;
  z-index: 11;
}
</style>
