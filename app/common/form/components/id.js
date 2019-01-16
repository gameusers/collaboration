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

// import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';



// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconAddCircle from '@material-ui/icons/AddCircle';
// import IconRemoveCircle from '@material-ui/icons/RemoveCircle';
import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

// import initStoreFormID from '../stores/id';




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
  line-height: 1.6em;
`;

const TextFieldBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
  }
`;

const SearchBox = styled.div`
  margin: 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
    
    
    // initStoreFormID
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
    //   ----- arr -----\n
    //   ${util.inspect(arr, { colors: true, depth: null })}\n
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
          onClick={() => handleFormIDDialogOpen(_id)}
          disabled={buttonDisabled}
        >
          IDを編集する
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
                Sound
              </Typography>
              {/*<Button
                color="inherit"
                // onClick={handleClose}
              >
                save
              </Button>*/}
            </Toolbar>
          </AppBar>
          AAA
          {/*<DialogTitle id="alert-dialog-title">元に戻す</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              編集フォームの状態をフォームが最初に表示されたときの状態に戻します。よろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            AAA
          </DialogActions>*/}
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};