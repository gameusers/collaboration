// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Id from '../../card/player/components/id';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0 0 12px 0;
`;

const ButtonBox = styled.div`
  // display: flex;
  // flex-flow: row wrap;
  // align-items: center;
  margin: 90px 0 0 12px;
`;

const SelectFormTypeButton = styled(Button)`
  && {
    margin: 0 16px 0 0;
  }
`;

// const SearchBox = styled.div`
//   margin: 0;
// `;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-formID`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, arr, search } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    
    // console.log(`
    //   ----- stores -----\n
    //   ${util.inspect(stores, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    const {
      
      formIDFormDataSelectedArr,
      formIDFormDataUnselectedArr,
      formIDDialogObj,
      handleFormIDDialogClose,
      handleFormIDDialogOpen
      
    } = stores.formID;
    
    
    
    
    // --------------------------------------------------
    //   Dialog
    // --------------------------------------------------
    
    let dialogOpen = false;
    
    if (_id in formIDDialogObj) {
      dialogOpen = formIDDialogObj[_id];
    }
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-formID` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-formID`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    // for (let i = 0; i < arr.length; i++) {
      
    //   componentsArr.push(
    //     <StyledTextField
    //       id={`hobby-${i}`}
    //       value={arr[i]}
    //       onChange={(event) => handleCardPlayerEditHobby(event, _id, i)}
    //       margin="dense"
    //       variant="outlined"
    //       key={i}
    //       inputProps={{
    //         maxLength: 20,
    //       }}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton
    //               onClick={() => handleCardPlayerEditFormHobbyTextFieldCountDecrement(_id, i)}
    //               disabled={buttonDisabled}
    //             >
    //               <IconRemoveCircle />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   );
      
    // }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- stores.data.usersLoginObj -----\n
    //   ${util.inspect(stores.data.usersLoginObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>ID</Heading>
        <Description>入力すると趣味が表示されます。</Description>
        
        
        
        {/* ダイアログ表示ボタン */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleFormIDDialogOpen({
            _id,
            usersLogin_id: stores.data.usersLoginObj._id
          })}
          disabled={buttonDisabled}
        >
          IDを選択する
        </Button>
        
        
        {/* ダイアログ */}
        <Dialog
          open={dialogOpen}
          onClose={() => handleFormIDDialogClose(_id)}
          fullScreen
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => handleFormIDDialogClose(_id)}
                aria-label="Close"
              >
                <IconClose />
              </IconButton>
              <Typography variant="h6" color="inherit" >
                ID 選択＆登録フォーム
              </Typography>
            </Toolbar>
          </AppBar>
          
          
          <ButtonBox>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
            >
              ID選択
            </SelectFormTypeButton>
            
            <SelectFormTypeButton
              variant="outlined"
              color="secondary"
            >
              ID登録
            </SelectFormTypeButton>
            
          </ButtonBox>
          
          
          
          選択ID
          
          {/* ID */}
          <Id
            arr={formIDFormDataUnselectedArr}
          />
          
          
          未選択ID
          
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};