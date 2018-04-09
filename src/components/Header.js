import React from 'react';
import { connect } from 'react-redux'
import {toggleSidebar} from '../actions/ui'

export const Header = ({isSidebarOpen, toggleSidebar}) => (

  <header className={`Header ${isSidebarOpen ? 'Header__open':'Header__close'}`}>
    <div
        className="Header__menu"
        onClick={toggleSidebar}
        >
        <img width="30px" src="/img/menu.png"></img>
      </div>
    {/* <div className="margin_container">
      <h1>{props.title ? props.title : 'No title'}</h1>
    </div> */}

  </header>
)

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar())
})
const mapStateToProps = state => ({
    isSidebarOpen: state.ui.sidebar_open
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
