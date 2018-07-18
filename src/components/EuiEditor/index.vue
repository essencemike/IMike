<template lang="pug">
div(ref="editor")
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

@Component
export default class EuiEditor extends Vue {
  @Prop({ type: String, default: '' }) value!: string;

  private Quill: any = undefined;
  private options: any = {
    theme: 'snow',
    bounds: document.body,
    debug: 'warn',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image'],
      ],
    },
    placeholder: '书写你的内容',
    readOnly: false,
  };

  mounted(): void {
    this.init();
  }

  beforeDestroy(): void {
    this.Quill = undefined;
  }

  init(): void {
    const editor = this.$refs.editor as Element;
    this.Quill = new Quill(editor, this.options);

    // 设置默认值
    this.Quill.pasteHTML(this.value);

    // 绑定事件
    this.Quill.on('text-change', () => {
      const html = (this.$refs.editor as HTMLElement).children[0].innerHTML;
      const text = this.Quill.getText();
      const quill = this.Quill;
      this.$emit('input', html);
      this.$emit('change', { html, text, quill });
    });

    this.Quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
      this.$emit('text-change', delta, oldDelta, source);
    });

    this.Quill.on('selection-change', (range: any, oldRange: any, source: any) => {
      this.$emit('selection-change', range, oldRange, source);
    });

    this.Quill.on('editor-change', (eventName: any, ...args: any[]) => {
      this.$emit('editor-change', eventName, ...args);
    });
  }
}
</script>
<style lang="scss" scoped>
</style>
