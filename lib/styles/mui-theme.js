// --------------------------------------------------
//   Material UI を Next.js で利用する
//   参考: https://github.com/adrianmcli/styled-mui-next
//   参考: https://github.com/mui-org/material-ui/tree/master/examples/nextjs
// --------------------------------------------------

// --------------------------------------------------
//   Import
// --------------------------------------------------

import { createMuiTheme } from '@material-ui/core/styles';


// --------------------------------------------------
//   Material UI のテーマを設定する
//   参考: https://material-ui-next.com/customization/themes/
// --------------------------------------------------

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ' -apple-system, BlinkMacSystemFont, "メイリオ", Meiryo, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif'
  }
});

export default theme;
