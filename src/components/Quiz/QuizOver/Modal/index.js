import React from 'react';

const Modal = ({ openModal, children}) => {
  return (
    openModal && (
      <div className='modalBackground'>
        <div className='modalContainer'>
          {children}
        </div>
      </div>
    )
  )
}

export default Modal;