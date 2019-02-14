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
import TextareaAutosize from 'react-autosize-textarea';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
`;

const IconButtonBox = styled.div`
  margin: 12px 0 0 0;
`;

const IconButtonImg = styled.img`
  width: 26px;
  height: 26px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 24px 0 0 0;
`;

const IconBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
`;

const IconSelectedImg = styled.img`
  width: 26px;
  height: 26px;
  padding: 0 6px 0 0;
`;

const IconText = styled.div`
  margin: 0 4px 0 0;
`;

const TextareaBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  && {
    width: 600px;
    max-width: 600px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 12px;
    line-height: 1.8;
    
    &:focus {
      outline: 1px #A9F5F2 solid;
    }
    
    @media screen and (max-width: 480px) {
      width: 100%;
      max-width: auto;
      resize: none;
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
    
    const { stores, _id, value, icon, comment, search } = this.props;
    
    const {
      
      handleCardPlayerEditFriendIcon,
      handleCardPlayerEditFriendValue,
      handleCardPlayerEditFriendComment,
      handleCardPlayerEditFriendSearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Component - Icon
    // --------------------------------------------------
    
    const iconArr = ['emoji_u1f9b8', 'emoji_u1f9b9', 'emoji_u1f9d0', 'emoji_u1f9df', 'emoji_u1f47f', 'emoji_u1f60a', 'emoji_u1f60b', 'emoji_u1f60c', 'emoji_u1f60d', 'emoji_u1f60e', 'emoji_u1f60f', 'emoji_u1f61a', 'emoji_u1f61b', 'emoji_u1f61c', 'emoji_u1f61d', 'emoji_u1f61e', 'emoji_u1f61f', 'emoji_u1f62a', 'emoji_u1f62b', 'emoji_u1f62c', 'emoji_u1f62d', 'emoji_u1f62e', 'emoji_u1f62f', 'emoji_u1f92a', 'emoji_u1f92a_200d_2063_fe0f', 'emoji_u1f92b', 'emoji_u1f92c', 'emoji_u1f92d', 'emoji_u1f92e', 'emoji_u1f92f', 'emoji_u1f97a', 'emoji_u1f600', 'emoji_u1f601', 'emoji_u1f602', 'emoji_u1f603', 'emoji_u1f604', 'emoji_u1f605', 'emoji_u1f606', 'emoji_u1f607', 'emoji_u1f608', 'emoji_u1f609', 'emoji_u1f610', 'emoji_u1f611', 'emoji_u1f612', 'emoji_u1f613', 'emoji_u1f614', 'emoji_u1f615', 'emoji_u1f616', 'emoji_u1f617', 'emoji_u1f618', 'emoji_u1f619', 'emoji_u1f620', 'emoji_u1f621', 'emoji_u1f622', 'emoji_u1f623', 'emoji_u1f624', 'emoji_u1f625', 'emoji_u1f626', 'emoji_u1f627', 'emoji_u1f628', 'emoji_u1f629', 'emoji_u1f630', 'emoji_u1f631', 'emoji_u1f632', 'emoji_u1f633', 'emoji_u1f634', 'emoji_u1f635', 'emoji_u1f636', 'emoji_u1f637', 'emoji_u1f641', 'emoji_u1f642', 'emoji_u1f643', 'emoji_u1f644', 'emoji_u1f644_200d_2063_fe0f', 'emoji_u1f910', 'emoji_u1f911', 'emoji_u1f912', 'emoji_u1f913', 'emoji_u1f914', 'emoji_u1f915', 'emoji_u1f917', 'emoji_u1f920', 'emoji_u1f922', 'emoji_u1f923', 'emoji_u1f924', 'emoji_u1f924_200d_2063_fe0f', 'emoji_u1f925', 'emoji_u1f927', 'emoji_u1f928', 'emoji_u1f928_200d_1f922', 'emoji_u1f929', 'emoji_u1f970', 'emoji_u1f971', 'emoji_u1f973', 'emoji_u1f974', 'emoji_u1f975', 'emoji_u1f976', 'emoji_u263a', 'emoji_u2639'];
    
    let componentIconArr = [];
    
    for (const [index, value] of iconArr.entries()) {
      
      componentIconArr.push(
        <IconButton
          key={index}
          onClick={() => handleCardPlayerEditFriendIcon({ _id, value })}
        >
          <IconButtonImg
            src={`/static/img/common/blob-emoji/${value}.png`}
          />
        </IconButton>
      );
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   value: {green ${value}}
    //   icon: {green ${icon}}
    //   comment: {green ${comment}}
    //   search: {green ${search}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>フレンド</Heading>
        
        <Description>入力するとフレンド募集についての情報が表示されます。</Description>
        
        
        <IconButtonBox>
          {componentIconArr}
        </IconButtonBox>
        
        
        <SelectBox>
        
          <IconBox>
            <IconSelectedImg
              src={`/static/img/common/blob-emoji/${icon}.png`}
            />
            
            <IconText>フレンド: </IconText>
          </IconBox>
        
        
          <FormControl>
            <Select
              value={value}
              onChange={(eventObj) => handleCardPlayerEditFriendValue({ _id, value: eventObj.target.value })}
              inputProps={{
                name: 'friend',
                id: 'friend',
              }}
            >
              <MenuItem value={true}>募集中</MenuItem>
              <MenuItem value={false}>募集していません</MenuItem>
            </Select>
          </FormControl>
          
        </SelectBox>
        
        
        <TextareaBox>
          <StyledTextareaAutosize
            rows={5}
            placeholder="コメントを入力してください"
            value={comment}
            onChange={(eventObj) => handleCardPlayerEditFriendComment({ _id, value: eventObj.target.value })}
            maxLength={3000}
          />
        </TextareaBox>
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(eventObj) => handleCardPlayerEditFriendSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="フレンド欄の入力情報で検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};