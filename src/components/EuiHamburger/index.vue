<template lang="pug">
.eui-hamburger.navbar-icon(:class="{'is-active': isActive}", @click="toggleClick")
  i.fa.fa-bars(aria-hidden="true")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class EuiHamburger extends Vue {
  @Prop({ type: Boolean, default: false }) isActive!: boolean;

  toggleClick() {
    this.$emit('icon-click');
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.eui-hamburger {
  display: inline-block;
  text-align: center;
  color: $text-color;
  transform: rotate(90deg);
  transition: transform .38s;
  transform-origin: 50% 50%;
  margin-right: 10px;

  &.is-active {
    transform: rotate(0deg);
  }
}
</style>
