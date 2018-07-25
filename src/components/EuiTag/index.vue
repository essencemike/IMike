<template lang="pug">
div(:class="classes", :style="wrapperStyles")
  span(:class="dotClasses", :style="bgColorStyle")
  span(:class="textClasses")
    slot
  i.el-icon-close.eui-close(v-if="closable", @click.prevent.stop="handleClose")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const prefixCls = 'eui-tag';
const initColorList: string[] = ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'yellow',
  'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'];
const colorList: string[] = ['pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'];

@Component
export default class EuiTag extends Vue {
  @Prop({ type: String, default: 'default' }) color!: string;
  @Prop(Boolean) closable!: boolean;
  @Prop([String, Number]) name!: string | number;

  get classes() {
    return [
      `${prefixCls}`,
      `${prefixCls}-dot`,
      {
        [`${prefixCls}-${this.color}`]: !!this.color && initColorList.indexOf(this.color) > -1,
        [`${prefixCls}-closable`]: this.closable,
      },
    ];
  }

  get wrapperStyles() {
    return initColorList.indexOf(this.color) > -1 ? {} : {
      background: 'transparent',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: this.borderColor,
    };
  }

  get textClasses() {
    return [`${prefixCls}-text`];
  }

  get dotClasses() {
    return `${prefixCls}-dot-inner`;
  }

  get borderColor() {
    return (this.color === undefined || this.color === 'default') ? '' : this.color;
  }

  get dotColor() {
    return (this.color === undefined || initColorList.indexOf(this.color) > -1) ? '' : this.color;
  }

  get bgColorStyle() {
    return initColorList.indexOf(this.color) > -1 ? {} : { background: this.dotColor };
  }

  handleClose(event: Event) {
    this.$emit('close', event);
  }
}
</script>
<style lang="scss" scoped>
$border-color-split: #e9eaec;
$text-color: #495060;

.eui-tag {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid $border-color-split;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;

  &-dot {
    height: 32px;
    line-height: 32px;
    border: 1px solid $border-color-split;
    color: $text-color;
    background: #fff;
    padding: 0 12px;

    &-inner {
      position: relative;
      top: 1px;
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 8px;
      border-radius: 50%;
      background: $border-color-split;
    }
    .eui-close {
      color: #666;
      margin-left: 10px !important;
    }
  }

  &:hover {
    opacity: 0.85;
  }

  &-text {
    color: $text-color;
  }

  .eui-close {
    position: relative;
    top: -1px;
    right: -4px;
    text-align: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 16px;
    vertical-align: middle;
    margin-left: 2px;
    color: #666;
    opacity: 0.66;
    cursor: pointer;

    &:hover {
      opacity: 1;
      background: #999;
      color: #fff;
    }
  }

  $colors: pink, magenta, red, volcano, orange, yellow, gold, cyan, lime, green, blue, geekblue, purple;

  @each $color in $colors {
    &-#{$color} {
      .eui-tag-dot-inner {
        background: $color;
      }
    }
  }

  &-blue {
    .eui-tag-dot-inner {
      background: #2d8cf0;
    }
  }
}
</style>
