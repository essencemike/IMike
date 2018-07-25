<template lang="pug">
el-dropdown(trigger="click", @command="handleSetLanguage")
  span.navbar-icon
    i.fa.fa-language(aria-hidden="true")
  el-dropdown-menu(slot="dropdown")
    el-dropdown-item(command="zh", :disabled="language === 'zh'") 中文
    el-dropdown-item(command="en", :disabled="language === 'en'") English
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie';

@Component
export default class EuiLangSelect extends Vue {
  get language() {
    const navLang = navigator.language;
    const localLang = (navLang === 'zh' || navLang === 'en') ? navLang : false;
    const lang = Cookies.get('language') || localLang || 'zh';
    return lang;
  }

  handleSetLanguage(lang: string) {
    this.$i18n.locale = lang;
    // TODO 修改成 store 里面去
    Cookies.set('language', lang);
  }
}
</script>
<style lang="scss" scoped>
</style>
