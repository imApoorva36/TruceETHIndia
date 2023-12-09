import { sendFunds } from '@/app/_helpers/organisation'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import s from './paymodal.module.css'

const Modal = ({ isOpen, closeModal, category, catid }) => {
  const [price, setPrice] = useState('');

  // Function to handle price input change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Function to handle submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the submitted price
    console.log(`Category: ${category}, Price: ${price}`);
    closeModal();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={s.container}>
      <div className={s.modal}>
        <h2>Payment for {category}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Price:
            <input type="text" value={price} onChange={handlePriceChange} />
          </label>
          <button type="submit" onClick={sendFunds}>Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
