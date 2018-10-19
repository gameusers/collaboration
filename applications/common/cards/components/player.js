// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../layout/components/paragraph';
import UserThumbnail from '../../user/components/thumbnail';
import UserName from '../../user/components/name';





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Card
// ---------------------------------------------

const CardTopBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  padding: 12px 4px 12px 12px;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Card / User
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  // background-color: red;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 0 0;
  // background-color: blue;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 15px 12px 12px 10px;
  padding: 4px 0 0 10px;
  // background-color: thistle;
  
  max-width: 320px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  // padding: 0 12px 0 0;
  // line-height: 1em;
  // word-wrap: break-word;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Card / Expand More
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
  // background-color: pink;
`;


// ---------------------------------------------
//   Content / Description
// ---------------------------------------------

const DescriptionBox = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  // margin: 12px 0 10px 3px;
  // padding: 0 0 0 18px;
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
    
    const { stores, id } = this.props;
    
    
    
    // ---------------------------------------------
    //   Expanded
    // ---------------------------------------------
    
    const {
      
      cardExpandedObj,
      handleCardExpanded
      
    } = stores.cardsPlayer;
    
    
    let cardExpanded = true;
    
    if (id in cardExpandedObj) {
      cardExpanded = cardExpandedObj[id];
    }
    
    
    
    // ---------------------------------------------
    //   Title
    // ---------------------------------------------
    
    // const title = summary ? <StyledH2>{summary}</StyledH2> : summaryComponent;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Card>
        
        <CardTopBox>
          
          <UserBox>
            
            <UserThumbnailBox>
              <UserThumbnail id="a8b0gX6lMIz" />
            </UserThumbnailBox>
            
            
            <UserInfoBox>
            
              <UserNameBox>
                <UserName id="a8b0gX6lMIz" />
              </UserNameBox>
              
            </UserInfoBox>
            
          </UserBox>
          
          
          <ExpandMoreBox>
            <IconButton
              onClick={() => handleCardExpanded(id)}
              aria-expanded={cardExpanded}
              aria-label="Show more"
            >
              {cardExpanded ? (
                <IconExpandLess />
              ) : (
                <IconExpandMore />
              )}
            </IconButton>
          </ExpandMoreBox>
          
        </CardTopBox>
        
        
        <Collapse in={cardExpanded} timeout="auto" unmountOnExit>
          
          <CardMedia
            image="/static/img/sample/lion-1920.jpg"
            // title="Contemplative Reptile"
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          
          <CardContent>
            <DescriptionBox>
              <Paragraph text={`Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。

それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`} />
            </DescriptionBox>
          </CardContent>
          
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          
        </Collapse>
        
      </Card>
    );
    
  }
  
};