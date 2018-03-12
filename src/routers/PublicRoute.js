import React from 'react';
import {Header} from '../components/Header';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  component: Component,
  header,
  ...rest
}) => {
  return (
      <Route {...rest} component={(props) => (
          <div>
            <Header {...props} title={header}/>
            <Component {...props} />
          </div>

      )} />
    );
}
