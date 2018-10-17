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
  padding: 12px 4px 10px 12px;
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
    //   Panel
    // ---------------------------------------------
    
    // const {
      
    //   panelExpandedObj,
    //   handlePanelExpanded
      
    // } = stores.layout;
    
    
    // let expanded = true;
    
    // if (id in panelExpandedObj) {
    //   expanded = panelExpandedObj[id];
    // }
    
    
    
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
              // className={classnames(classes.expand, {
              //   [classes.expandOpen]: this.state.expanded,
              // })}
              // onClick={this.handleExpandClick}
              aria-expanded={false}
              aria-label="Show more"
            >
              <IconExpandLess />
            </IconButton>
          </ExpandMoreBox>
          
        </CardTopBox>
        
        
        
        
        
        <CardMedia
          image="/static/img/sample/lion-1920.jpg"
          title="Contemplative Reptile"
          style={{ height: 0, paddingTop: '56.25%' }}
        />
        <CardContent>
          <Typography component="p">
            AAA This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            // className={classnames(classes.expand, {
            //   [classes.expandOpen]: this.state.expanded,
            // })}
            // onClick={this.handleExpandClick}
            // aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <IconExpandMore />
          </IconButton>
        </CardActions>
      </Card>
    );
    
  }
  
};