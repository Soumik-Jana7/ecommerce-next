import React, { useEffect } from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';


const Footer = () => {
  return (
    <div className='footer-container'>
      <p>BOAT Headphones All rights reserved 2023</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer;