import { defineConfig } from 'dumi';

export default defineConfig({
  // mode: 'site',
  title: 'iweb.wiki',
  favicon: 'https://iweb.wiki/images/favicon.jpg',
  logo: 'https://iweb.wiki/images/favicon.jpg',
  outputPath: 'docs-dist',
  ssr: {},
  base: '/note',
  publicPath: '/note/',
  exportStatic: {},
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    // {
    //   title: 'GitHub',
    //   path: 'https://github.com/umijs/dumi',
    // },
    {
      title: '简书',
      path: 'https://www.jianshu.com/u/75f67b3d06e9',
    },
  ],

  // more config: https://d.umijs.org/config
});
