import React from 'react';
import icon from '../../images/logo.svg';
import './AppBar';

export const AppBar: React.FC = () => {
  return (
    <div className="AppBar">
      <div className="main-container AppBar__container">
        <div className="AppBar__logo-box">
          <img src={icon} alt="Chuck Norris logo" />
          <h1 className="AppBar__title">Chuck Norris</h1>
        </div>
      </div>
    </div>
  );
};
