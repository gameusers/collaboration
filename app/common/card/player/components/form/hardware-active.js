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
import Downshift from 'downshift';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';




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

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
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
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, model, comment, search } = this.props;
    
    const {
      
      handleCardPlayerEditSmartphoneModel,
      handleCardPlayerEditSmartphoneComment,
      handleCardPlayerEditSmartphoneSearch
      
    } = stores.cardPlayer;
    
    
    const itemsArr = [
      {value: 'apple'},
      {value: 'pear'},
      {value: 'orange'},
      {value: 'grape'},
      {value: 'banana'},
    ];
    
    
    
    
    const test = () => {
      
      console.log(`
        ----- birthdayObj -----\n
        ${util.inspect(birthdayObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
    }
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- birthdayObj -----\n
    //   ${util.inspect(birthdayObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   birthday: {green ${birthday}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>所有ハードウェア</Heading>
        
        <Description>入力すると所有ハードウェアが表示されます。現在、所有しているハードウェアを入力してください。</Description>
        
        
        {/*<StyledTextFieldWide
          id="smartphoneModel"
          label="モデル"
          value={model}
          onChange={(event) => handleCardPlayerEditSmartphoneModel(event, _id)}
          helperText="モデル名、機種名などを入力してください"
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />*/}
        
        
        <Downshift
          // onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <label {...getLabelProps()}>Enter a fruit</label>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? itemsArr
                      .filter(item => !inputValue || item.value.includes(inputValue))
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditSmartphoneSearch(event, _id)}
              />
            }
            label="所有ハードウェアで検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};