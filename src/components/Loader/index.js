import React from 'react'

const Loader = ({msg, style}) => {
  return (
    <>
        <div className='loader'></div>
        <p style={style}>
            {msg}
        </p>
     </>
  )
}

export default Loader;