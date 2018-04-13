// import React from 'react';

const color = 'yellow';

const HelloWorld = () => (
  <div>
    <p>Hello World!!　ぶるああああああああああああああ</p>
    <style jsx>{`
      p {
        color: ${color};
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        // background: black;
      }
    `}</style>
  </div>
);

export default HelloWorld;