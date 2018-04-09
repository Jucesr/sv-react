import React from 'react';

export const Header = (props) => (

  <header className="Header">
    <div
        className="Header__menu"
        onClick={props.toggleSideBar}
        >
        <img width="30px" src="/img/menu.png"></img>
      </div>
    {/* <div className="margin_container">
      <h1>{props.title ? props.title : 'No title'}</h1>
    </div> */}

  </header>
)
