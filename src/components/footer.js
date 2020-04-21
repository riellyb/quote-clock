import React from 'react';
import './footer.scss';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="triangle"></div>
      <h1 className="about">Quote of the Minute</h1>
      <div className="credits">
        <a href="https://github.com/riellyb/quote-clock">GitHub</a> | Created by{' '}
        <a href="https://www.brendanrielly.com">Brendan Rielly</a> | Designed by{' '}
        <a href="https://www.izzywashburn.com">Izzy Washburn</a> | Inspired by{' '}
        <a href="http://www.eerlijkemedia.nl/">Jaap Meijers</a>
      </div>
    </div>
  </footer>
);

export default Footer;
