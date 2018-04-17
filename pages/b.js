import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

export default class extends React.Component {
  
  static async getInitialProps({ req }) {
    
    // const res = await fetch('https://df44294c8853471b8ddd609c09af06f3.vfs.cloud9.us-west-2.amazonaws.com/api');
    // console.log(res);
    // const json = await res.json();
    // console.log(json);
    
    
    // const url = 'https://df44294c8853471b8ddd609c09af06f3.vfs.cloud9.us-west-2.amazonaws.com/api';
    // const url = 'https://gameusers.org/';
    const url = 'http://35.203.143.160:8080/api';
    
    // const res = await fetch(url);
    // const json = await res.json();
    
    // console.log(res);
    // console.log(json);
    
    
    const returnObj = await fetch(url, {
      
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
      
    }).then(function(response) {
      
      // console.log(response);
      return response.json();
      
    }).then(function(json) {
      
      // console.log(json);
      return { message: json.message };
      
    });
    
    
    return returnObj;
    // return { message: json.message };
    // return { message: 'APIからのデータ' };
    
  }

  render() {
    return (
      <div>
        <p>Welcome to next.js! 3 / {this.props.message}</p>
        
    
        <Link href="/test">
          <img src="/static/img/thumbnail.jpg" alt="image" />
        </Link>
        
        <br /><br />
        
        Click <span onClick={() => Router.push('/test')}>[Here]</span> to read more
        
        <style jsx>{`
          p {
            color: green;
          }
          div {
            background: white;
          }
        `}</style>
      </div>
    );
  }
  
};