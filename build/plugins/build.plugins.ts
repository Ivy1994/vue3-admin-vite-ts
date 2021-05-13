/*
 *  生成vite插件
 */
import vueJsx from "@vitejs/plugin-vue-jsx";
import { minifyHtml, injectHtml } from "vite-plugin-html";
// import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { viteMockServe } from "vite-plugin-mock";
import styleImport from "vite-plugin-style-import";
import Markdown from "vite-plugin-md";
import viteSvgIcons from "vite-plugin-svg-icons";
import path from "path";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
export function setPlugins(command: string) {
  const plugins: any[] = [];
  plugins.push(
    vue({
      include: [/\.vue$/, /\.md$/],
    })
  );
  plugins.push(
    Markdown({
      headEnabled: true, // <--
    })
  );
  plugins.push(
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
    })
  );
  // 引入国际化
  // plugins.push(vueI18n({
  //   compositionOnly:false,
  //   include: path.resolve(__dirname, './src/locales/**')
  // }))
  //按需引入element
  const element = styleImport({
    libs: [
      {
        libraryName: "element-plus",
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: name => {
          name = name.slice(3);
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: name => {
          return `element-plus/lib/${name}`;
        },
      },
    ],
  });
  plugins.push(element);
  //mock-server
  const mock = viteMockServe({
    mockPath: "src/mock",
    watchFiles: true,
    logger: true,
    localEnabled: true,
    prodEnabled: true,
    injectCode: `
    import { setupProdMockServer } from './mockProdServer';
    setupProdMockServer();
  `,
    supportTs: true,
  });
  plugins.push(mock);
  //ts路径
  plugins.push(tsconfigPaths());
  /* html */
  plugins.push(minifyHtml());
  plugins.push(
    injectHtml({
      injectData: {
        title: "小裁缝",
        // injectScript: `<link rel="stylesheet" href="./tailwind.css">`,
      },
    })
  );
  /* jsx */
  plugins.push(vueJsx());
  return plugins;
}
