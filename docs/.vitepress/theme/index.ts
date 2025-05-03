// https://vitepress.dev/guide/custom-theme
// eslint-disable-next-line simple-import-sort/imports
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DrawPolygon from '../../components/DrawPolygon.vue';
import { h } from 'vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    app.component('DrawPolygon', DrawPolygon);
  }
} satisfies Theme;
