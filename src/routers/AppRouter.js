import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PapFormPage} from '../components/PapFormPage';
import {PapProjectsPage} from '../components/PapProjectsPage';

import {SideBar} from '../components/SideBar';
import {Header} from '../components/Header';

const AppRouter = () => (
  <BrowserRouter >
      <div className="app_container">
        <SideBar/>
        <div className="app_content">
          <Header/>

          <Switch>
            {/* <Route path="/" component={LoginPage} exact={true} /> */}
            <Route path="/form" component={PapFormPage} />
            <Route path="/projects" component={PapProjectsPage} />
            {/* <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditExpensePage} /> */}
            {/* <Route component={NotFoundPage} /> */}
          </Switch>

          </div>

      </div>


  </BrowserRouter>
)

export default AppRouter;
