import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

export const HomePage = ({isSidebarOpen}) => {

  return(
    <div className={isSidebarOpen ? 'Page Page__open': 'Page Page__closed'}>
      <Link to={'/form'}>
        <button> PAP </button>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
    isSidebarOpen: state.ui.sidebar_open
})

export default connect(mapStateToProps )(HomePage)
