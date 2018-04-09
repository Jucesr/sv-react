import React from 'react';
import { Link } from 'react-router-dom';

export const SideBar = ({isOpen = true}) => (
  <div className={`SideBar ${isOpen ? 'SideBar_open': 'SideBar_close'}`}>

      <div>
        <img width={200} src="/img/logoherrmosillo.png"></img>
      </div>

      <div className="user_info">
        <div className="user_info_pic">
          <img src="https://lh6.googleusercontent.com/-2fjOKIUHjII/AAAAAAAAAAI/AAAAAAAAABA/e3l9hFs0Bvs/photo.jpg?sz=50"></img>
        </div>

        <div className="user_info_data">
          <h3>Julio Ojeda</h3>
          <span>julio.ojeda@hermosillo.com </span>
        </div>

      </div>

      <div className="sidebar__items">

          <Link className="sidebar__items_item" to="/">Home</Link>
          <Link className="sidebar__items_item" to="/form">PAP</Link>
          <Link className="sidebar__items_item" to="/projects">Projects</Link>

      </div>

  </div>
)
