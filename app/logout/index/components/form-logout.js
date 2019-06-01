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

import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeLogoutIndex')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: 'logout' });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeLogoutIndex, intl } = this.props;
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'logout'], true);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel _id="panelLogout" heading="ログアウト">
        
        
        <p>
          ログアウトする場合は以下のボタンを押してください。
        </p>
        
        
        {/* Submit Button */}
        <div
          css={css`
            margin: 20px 0 0 0;
          `}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={storeLogoutIndex.handleLogout}
            disabled={buttonDisabled}
          >
            ログアウト
          </Button>
        </div>
        
        
      </Panel>
    );
    
  }
  
});