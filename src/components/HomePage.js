import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {

  return(
    <div className="margin_container">
      <Link to={'/form'}>
        <button> PAP </button>
      </Link>
    </div>
  )
}
