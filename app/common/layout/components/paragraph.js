// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { text } = this.props;
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentsArr = [];
    
    let textArr = [];
    
    if (text) {
      textArr = text.split('\n').reverse();
    }
    
    
    let marginPx = 0;
    
    for (const [index, value] of textArr.entries()) {
      
      // if (value === '') {
      if (!value.match(/\S/g)) {
        
        marginPx += 18;
        
      } else {
        
        if (marginPx === 0) {
          
          componentsArr.push(
            <p key={index}>{value}</p>
          );
          
        } else {
          
          componentsArr.push(
            <p style={{ marginBottom: marginPx }} key={index}>{value}</p>
          );
          
        }
        
        marginPx = 0;
        
      }
      
      // console.log(index, value, marginPx);
      
    }
    
    componentsArr = componentsArr.reverse();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {componentsArr}
      </React.Fragment>
    );
    
  }
  
};