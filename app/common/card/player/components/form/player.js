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

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Hobby from './hobby';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  // margin: 28px 0 0 0;
  padding: 0;
`;


// ---------------------------------------------
//   Content / Card Content
// ---------------------------------------------

const StyledCardContent = styled(CardContent)`
  && {
    // margin-top: 0;
    // margin-bottom: 0;
    // padding-top: 0;
    // padding-bottom: 0;
  }
`;


// ----------------------------------------
//   共通
// ----------------------------------------

const TextP = styled.p`
  font-size: 14px;
  line-height: 1.6em;
`;

const Box = styled.div`
  margin: 36px 0 0 0;
`;

const TitleMain = styled.div`
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const Title = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
  // color: rgba(0, 0, 0, 0.54);
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
  }
`;

const SearchBox = styled.div`
  margin: 0 0 0 0;
`;


// ----------------------------------------
//   画像
// ----------------------------------------

const ThumbnailBox = styled.div`
  margin: 24px 0 0 0;
`;

const ThumbnailTitle = styled.div`
  color: rgba(0, 0, 0, 0.54);
  // margin: 16px 0 0 0;
`;

const ImageBox = styled.div`
  margin: 24px 0 0 0;
`;

const ImageTitle = styled.div`
  color: rgba(0, 0, 0, 0.54);
  // margin: 16px 0 0 0;
`;




const CommentTextareaAutosize = styled(TextareaAutosize)`
  && {
    width: 600px;
    max-width: 600px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 6px 0 10px 0;
    padding: 8px 12px;
    line-height: 1.6em;
    
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




// ---------------------------------------------
//   Bottom / Card Actions
// ---------------------------------------------

const StyledCardActions = styled(CardActions)`
  && {
    margin: 16px 0 0 0;
    padding-top: 0;
    padding-bottom: 16px;
    
    @media screen and (max-width: 480px) {
      padding: 0 10px 16px 10px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CloseButtonBox = styled.div`
  margin: 0 0 0 16px;
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
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.cardPlayers_id}-edit-form`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, cardPlayers_id, users_id } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    // const { usersLoginObj } = stores.data;
    
    const {
      
      handleCardPlayerEditFormOpen,
      handleCardPlayerEditFormClose
      
    } = stores.cardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Hobby
    // --------------------------------------------------
    
    // const hobbyTextFieldCount = handleGetCardPlayerEditFormHobbyTextFieldCount(cardPlayers_id);
    
    
    
    // --------------------------------------------------
    //   Component - Button
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${cardPlayers_id}-edit-form` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${cardPlayers_id}-edit-form`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- usersLoginObj -----\n
    //   ${util.inspect(usersLoginObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    //   usersLoginObj._id: {green ${usersLoginObj._id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <form>
          
          <StyledCardContent>
            
            
            <TitleMain>プレイヤーカード</TitleMain>
            
            <TextP>プレイヤーカードというのは、Game Users 内で基本的なプロフィールとして扱われるデータです。あなたがどんなゲームプレイヤーなのか知ってもらう情報になりますので、いろいろ入力してみてください。</TextP>
            
            
            <StyledTextField
              id="name"
              label="ハンドルネーム"
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              // placeholder="a"
              helperText="公開される名前です"
              margin="dense"
            />
            
            <StyledTextField
              id="status"
              label="ステータス"
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              helperText="ハンドルネームの横に表示される文字です"
              margin="dense"
            />
            
            
            <ThumbnailBox>
              <ThumbnailTitle>サムネイル</ThumbnailTitle>
              <input type="file" name="example" size="30" />
            </ThumbnailBox>
            
            
            <ImageBox>
              <ImageTitle>画像</ImageTitle>
              <input type="file" name="example" size="30" />
            </ImageBox>
            
            
            <Box>
              <Title>コメント</Title>
              
              <CommentTextareaAutosize
                rows={5}
                placeholder="コメントを入力してください"
                // value={threadUpdateFormDescription}
                // onChange={(event) => handleThreadUpdateFormDescription(event, value.id)}
              />
            </Box>
            
            
            <Box>
              <Title>年齢</Title>
              <TextP>入力すると年齢が表示されます。誕生日か、年齢（固定値）のどちらかを入力してください。</TextP>
              
              <StyledTextField
                id="birthday"
                label="誕生日"
                type="date"
                // defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="誕生日から年齢が自動で計算されます"
                margin="dense"
              />
              
              <StyledTextField
                id="birthdayAlternativeText"
                label="年齢（固定値）"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                helperText="例えば17歳と入力すると、ずっと17歳に固定されます"
                margin="dense"
              />
              
              <SearchBox>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={this.state.checkedA}
                      // onChange={this.handleChange('checkedA')}
                    />
                  }
                  label="年齢で検索可能にする"
                />
              </SearchBox>
            </Box>
            
            
            <Box>
              <Title>性別</Title>
              <TextP>性別を選択してください。選択すると性別が表示されます。選択肢以外の値を入力したい場合は、その他のフォームに入力してください。</TextP>
              
              <FormControl>
                <Select
                  value={''}
                  // onChange={this.handleChange}
                  inputProps={{
                    name: 'sex',
                    id: 'sex',
                  }}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={'male'}>男性</MenuItem>
                  <MenuItem value={'female'}>女性</MenuItem>
                </Select>
              </FormControl>
              
              <div>
                <StyledTextField
                  id="sexAlternativeText"
                  label="その他"
                  // value={this.state.name}
                  // onChange={this.handleChange('name')}
                  helperText="他の値を表示したい場合はこちらに入力してください"
                  margin="dense"
                />
                
                <SearchBox>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                      />
                    }
                    label="性別で検索可能にする"
                  />
                </SearchBox>
              </div>
            </Box>
            
            
            <Box>
              <Title>住所</Title>
              <TextP>入力すると住所が表示されます。公開される情報なので、あまり詳しい情報は載せないようにしましょう。</TextP>
              
              <div>
                <StyledTextField
                  id="addressAlternativeText"
                  label="住所"
                  // value={this.state.name}
                  // onChange={this.handleChange('name')}
                  helperText=""
                  margin="dense"
                />
                
                <SearchBox>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                      />
                    }
                    label="住所で検索可能にする"
                  />
                </SearchBox>
              </div>
            </Box>
            
            
            <Box>
              <Title>ゲーム歴</Title>
              <TextP>入力するとゲーム歴が表示されます。ゲームを始めた日か、ゲーム歴（固定値）のどちらかを入力してください。</TextP>
              
              <StyledTextField
                id="gamingExperience"
                label="ゲームを始めた日"
                type="date"
                // defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="入力日からゲーム歴が自動で計算されます"
                margin="dense"
              />
              
              <StyledTextField
                id="gamingExperienceAlternativeText"
                label="ゲーム歴（固定値）"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                helperText="例えば3年を入力すると、ずっと3年に固定されます"
                margin="dense"
              />
              
              <SearchBox>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={this.state.checkedA}
                      // onChange={this.handleChange('checkedA')}
                    />
                  }
                  label="ゲーム歴で検索可能にする"
                />
              </SearchBox>
            </Box>
            
            
            {/* 趣味 */}
            <Box>
              <Hobby cardPlayers_id={cardPlayers_id} />
            </Box>
            
            
          </StyledCardContent>
          
          
          <StyledCardActions>
            <ButtonBox>
              
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCardPlayerEditFormOpen(cardPlayers_id)}
                disabled={buttonDisabled}
              >
                保存する
              </Button>
              
              <CloseButtonBox>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCardPlayerEditFormClose(cardPlayers_id)}
                  disabled={buttonDisabled}
                >
                  閉じる
                </Button>
              </CloseButtonBox>
              
            </ButtonBox>
          </StyledCardActions>
          
      </form>
    );
    
  }
  
};