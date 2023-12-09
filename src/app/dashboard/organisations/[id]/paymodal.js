import { sendFunds } from '@/app/_helpers/organisation'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import s from './paymodal.module.css'

const Modal = ({ isOpen, closeModal, category, catid, orgid }) => {
  const [price, setPrice] = useState('');

  // Function to handle price input change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Function to handle submission of the form
  const handleSubmit = async (e) => {
      e.preventDefault();
      // Process the submitted price
      let res = await sendFunds(orgid, catid, price, window.ethereum)
      console.log(res)
  };

  if (!isOpen) return null;

  return (
    <div className={s.container}>
      <div className={s.modal}>
        <h2>Payment for {category}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Price:<br />
            <input type="text" value={price} onChange={handlePriceChange} />
          </label>
          <button type="submit" onClick={sendFunds}>Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
