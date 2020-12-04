// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

/** @jsx jsx */
import { css, jsx } from '@emotion/react';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconWarning from '@material-ui/icons/Warning';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {


  // --------------------------------------------------
  //   props
  // --------------------------------------------------

  const {

    publicSetting,

  } = props;




  // --------------------------------------------------
  //   必要な情報がない場合、空のコンポーネントを返す
  // --------------------------------------------------

  if (publicSetting === 1) {
    return null;
  }




  // --------------------------------------------------
  //   Text
  // --------------------------------------------------

  let text = '';

  if (publicSetting === 2) {

    text = 'ログインして返信した方のみ、ID・情報を閲覧することができます。';

  } else if (publicSetting === 3) {

    text = 'ログインして返信した方の中から、募集者がID・情報を公開する相手を選びます。';

  }




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /app/gc/rec/v2/components/public-setting.js
  // `);

  // console.log(chalk`
  //   publicSetting: {green ${publicSetting}}
  // `);




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <div
      css={css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        background-color: #FFF4E5;
        border-radius: 8px;

        margin: 24px 0 0 0;
        padding: 8px 16px;
      `}
    >


      <div
        css={css`
          color: #FFCA7E;
          margin: 5px 8px 0 0;
        `}
      >
        <IconWarning />
      </div>


      <div
        css={css`
          font-size: 12px;
        `}
      >
        {text}
      </div>


    </div>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
