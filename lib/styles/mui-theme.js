// --------------------------------------------------
//   Import
// --------------------------------------------------

import { createMuiTheme } from 'material-ui/styles';


// --------------------------------------------------
//   Material UI のテーマを設定する
//   参考: https://material-ui-next.com/customization/themes/
// --------------------------------------------------

const theme = createMuiTheme({
  typography: {
    fontFamily: ' -apple-system, BlinkMacSystemFont, "メイリオ", Meiryo, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif'
  }
});

export default theme;
