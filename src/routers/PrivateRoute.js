import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';

export const PrivateRoute = ({
  component: Component,
  header,
  isSidebarOpen,
  toggleSidebar,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      <div>
        <SideBar/>
          <div >
            <Header {...props} title={header} />
            <Component {...props} />
          </div>
      </div>
    )} />
  );
