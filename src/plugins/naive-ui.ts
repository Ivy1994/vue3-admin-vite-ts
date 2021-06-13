// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
import { App } from "vue";
import {
  // create naive ui
  create,
  // component
  NButton,
  NForm,
  NFormItemRow,
  NFormItemCol,
  NFormItemGridItem,
  NInput,
  NCheckbox,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NButton,
    NForm,
    NFormItemRow,
    NFormItemCol,
    NFormItemGridItem,
    NInput,
    NButton,
    NCheckbox,
  ],
});
export const setupNaive = (app: App) => {
  app.use(naive);
};
