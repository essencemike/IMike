<template lang="pug">
span.screenfull-container.navbar-icon(:style="screenfullStyle", @click="toggleClick")
  i.fa.fa-arrows-alt(aria-hidden="true")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import screenfull from 'screenfull';

@Component
export default class EuiScreenfull extends Vue {
  @Prop({ type: String, default: '#48576a' }) fill!: string;

  get screenfullStyle() {
    return { color: this.fill };
  }

  toggleClick() {
    if (!screenfull.enabled) {
      this.$message.warning('你的浏览器不工作了！');
      return;
    }
    screenfull.toggle();
  }
}
</script>
<style lang="scss" scoped>
.screenfull-container {
  display: inline-block;
  color: #48576a;
}
</style>
