import React from 'react';

export const Header = (props) => (

  <div className="header">
    <div className="margin_container">
      <h1>{props.title ? props.title : 'No title'}</h1>
      {/* <img width={40} src="/img/nav_back.png"></img>
      <button onClick={() => props.history.goBack()}>Back</button> */}
    </div>

  </div>
)
