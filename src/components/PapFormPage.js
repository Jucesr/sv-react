import React from 'react';
import FormPAP from './FormPAP';

const logValues = (values) => {
  console.log(values);
}

export const PapFormPage = () => (

  <div className="margin_container">
    <FormPAP onFired={logValues}/>
  </div>
)
