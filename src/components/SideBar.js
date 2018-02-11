import React from 'react';

export const SideBar = () => (
  <div className="sidebar">
    <div className="sidebar_container">

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

      <div className="side_container">
        <h2></h2>
      </div>
    </div>

  </div>
)
