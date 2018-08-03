// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Footer = styled.footer`
//   // display: flex;
//   // flex-direction: column;
//   position: relative;
//   padding: 6px 0 6px;
//   background-color: black;
//   color: white;
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
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, text } = this.props;
    // const { stores } = this.props;
    
    // console.dir(text.split('\n'));
    // console.log(`text = ${text}`);
    
    // const text = 'One\nTwo\n\nThree\n\n\nFour';
    // console.dir(test.split('\n'));
    
    
    
    
    let componentsArr = [];
    
    let textArr = [];
    
    if (text) {
      textArr = text.split('\n').reverse();
    }
    
    console.dir(textArr);
    
    
    
    let marginPx = 0;
    
    for (const [index, value] of textArr.entries()) {
      
      if (value === '') {
        
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
      
      console.log(index, value);
    }
    
    componentsArr = componentsArr.reverse();
    
    // lineHeight: `${marginPx}em`
    // marginBottom: marginPx
    // {test.split('\n').map((i, key) => {
    //       return <p style={{ marginBottom: '20px' }} key>{i}</p>;
    //     })}
    
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