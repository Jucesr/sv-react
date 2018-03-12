import React from 'react';
import FormPAP from './FormPAP';

let history;

const logValues = (values) => {
  console.log(values);
  history.push('/projects');
}

export const PapFormPage = (props) => {
  history = props.history;
  return(
    <div className="margin_container">
      <FormPAP onFired={logValues}/>
    </div>
  )
}
