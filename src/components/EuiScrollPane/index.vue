<template lang="pug">
.eui-scroll-container(ref="scrollContainer", @wheel.prevent="handleScroll")
  .eui-scroll-wrapper(ref="scrollWrapper", :style="{left: left + 'px'}")
    slot
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 标签的 padding
const PADDING = 15;

@Component
export default class EuiScrollPane extends Vue {
  left: number = 0;

  handleScroll(e: WheelEvent) {
    const eventDelta = e.wheelDelta || -e.deltaY * 3;
    const $container = this.$refs.scrollContainer as HTMLElement;
    const $containerWidth = $container.offsetWidth;
    const $wrapper = this.$refs.scrollWrapper as HTMLElement;
    const $wrapperWidth = $wrapper.offsetWidth;

    if (eventDelta > 0) {
      this.left = Math.min(0, this.left + eventDelta);
    } else {
      if ($containerWidth - PADDING < $wrapperWidth) {
        if (this.left < -($wrapperWidth - $containerWidth + PADDING)) {
          this.left = this.left;
        } else {
          this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - PADDING);
        }
      } else {
        this.left = 0;
      }
    }
  }

  moveToView($target: HTMLElement) {
    const $container = this.$refs.scrollContainer as HTMLElement;
    const $containerWidth = $container.offsetWidth;
    const $targetLeft = $target.offsetLeft;
    const $targetWidth = $target.offsetWidth;
    const $targetAllWidth = $targetLeft + $targetWidth;

    if ($targetLeft < -this.left) {
      // 标签在可视区域的左边
      this.left = -$targetLeft + PADDING;
    } else if ($targetLeft + PADDING > -this.left && $targetAllWidth < -this.left + $containerWidth - PADDING) {
      // 标签在可视区域内
      this.left = Math.min(0, $containerWidth - $targetWidth - $targetLeft - PADDING);
    } else {
      // 标签在可视区域的右侧
      this.left = -($targetLeft - ($containerWidth - $targetWidth) + PADDING);
    }
  }

  moveToPosition(offset: number) {
    this.left = offset;
  }

  moveToLeft() {
    this.left = 0;
  }

  moveToRight() {
    const $container = this.$refs.scrollContainer as HTMLElement;
    const $containerWidth = $container.offsetWidth;
    const $wrapper = this.$refs.scrollWrapper as HTMLElement;
    const $wrapperWidth = $wrapper.offsetWidth;

    if ($containerWidth - PADDING < $wrapperWidth) {
      this.left = -($wrapperWidth - $containerWidth + PADDING);
    } else {
      this.left = 0;
    }
  }
}
</script>
<style lang="scss" scoped>
.eui-scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;

  .eui-scroll-wrapper {
    position: absolute;
    transition: left .3s ease;
  }
}
</style>
