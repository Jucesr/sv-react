import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PapFormPage} from '../components/PapFormPage';
import {PapProjectsPage} from '../components/PapProjectsPage';
import {HomePage} from '../components/HomePage'

import {SideBar} from '../components/SideBar';


import {PublicRoute} from './PublicRoute';

const AppRouter = () => (
  <BrowserRouter >
      <div className="app_container">
        <SideBar/>
        <div className="app_content">


          <Switch>
            <PublicRoute header="Home" path="/" component={HomePage} exact={true} />
            <PublicRoute header="PAP Form" path="/form" component={PapFormPage} exact={true} />
            <PublicRoute header="PAP Projects" path="/projects" component={PapProjectsPage}/>
            {/* <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditExpensePage} /> */}
            {/* <Route component={NotFoundPage} /> */}
          </Switch>

          </div>

      </div>


  </BrowserRouter>
)

export default AppRouter;
