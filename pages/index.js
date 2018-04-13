import Link from 'next/link';
import Router from 'next/router';

const Index3 = () => (
  <div>
    <p>Welcome to next.js!</p>
    

    <Link href="/test">
      <img src="/static/img/thumbnail.jpg" alt="image" />
    </Link>
    
    Click <span onClick={() => Router.push('/test')}>here</span> to read more
    
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

// https://gameusers.org/bbs/Abi3SUl

export default Index3;