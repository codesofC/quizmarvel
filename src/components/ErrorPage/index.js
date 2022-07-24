import React from 'react';
import batman from '../../images/batman.png';

const hstyle = {
  textAlign: 'center',
  marginTop: '50px'
}
const centerImg = {
  display: 'block',
  width: '60%',
  margin: '20px auto'
}

const ErrorPage = () => {
  return (
    <div className='quiz-bg'>
        <div className='container'>
            <h2 style={hstyle}>Oups! Cette page n'existe pas</h2>
            <img src={batman} style={centerImg} alt='Batman'/>
        </div>
    </div>
  )
}

export default ErrorPage;