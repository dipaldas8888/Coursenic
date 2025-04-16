import React from 'react';
import { Button, Container } from 'reactstrap';

function Header() {
  return (
    <>
      {/* Header at the top */}
      <div
        style={{
          width: '100%',
          height: '10vh', // Small height (10% of the viewport height)
          backgroundColor: '#343a40',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          
         
        }}
      >
        <h1>Welcome to Coursenic</h1>
        

      </div>
    </>
  );
}

export default Header;