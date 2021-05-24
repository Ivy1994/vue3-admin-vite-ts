import { setPlugins } from "./build/plugins/build.plugins";
import { UserConfigExport, ConfigEnv } from "vite";
import { getAliases } from "vite-aliases";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

const aliases = getAliases({
  path: "src",
  log_path: "src/logs",
  prefix: "@",
  deep: true,
  root: process.cwd(),
  depth: 2,
  //@ts-expect-error
  addLeadingSlash: false,
  allowLogging: false,
  allowGlobalAlias: true,
  ignoreDuplicates: false,
});
export default async ({
  command,
  mode,
}: ConfigEnv): Promise<UserConfigExport> => {
  return {
    base: "./",
    resolve: {
      alias: aliases,
    },
    server: {
      port: 8008, //端口
      strictPort: false, //端口严格模式，为true时，当端口被占用，不会继续尝试下一个能用的端口
      https: false, //https
      open: true, //自动打开窗口
      hmr: {
        overlay: true, //hot更新
      },
    },
    build: {
      outDir: "dist", //打包文件名称
      assetsDir: "assets", //打包静态文件的存储地址
      rollupOptions: {
        output: {
          manualChunks: {
            "element-plus": ["element-plus"],
            "vxe-table": ["vxe-table"],
            "echarts":["echarts"],
            "vue-i18n":["vue-i18n"],
            "pinia":["pinia"],
            "xe-utils":["xe-utils"]
          },
          plugins: [dynamicImportVars()],
        },
      },
      chunkSizeWarningLimit: 1300,
      minify:"terser",
      cssCodeSplit:true,
    },
    optimizeDeps: {
      include: [
        "element-plus/lib/locale/lang/zh-cn",
        "element-plus/lib/locale/lang/en",
        "vxe-table/lib/locale/lang/zh-CN",
        "vxe-table/lib/locale/lang/en-US",
      ],
    },
    plugins: setPlugins(command),
  };
};
