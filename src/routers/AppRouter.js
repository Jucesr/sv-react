import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PapFormPage from '../components/PapFormPage';
import PapProjectsPage from '../components/PapProjectsPage';
import ProjectItemPage from '../components/ProjectItemPage';
import HomePage from '../components/HomePage'
import {PrivateRoute} from './PrivateRoute';

const AppRouter = () => (
  <BrowserRouter >
          <Switch>
            <PrivateRoute header="Home" path="/" component={HomePage} exact={true} />
            <PrivateRoute header="PAP Form" path="/form" component={PapFormPage} exact={true} />
            <PrivateRoute header="PAP Projects" path="/projects" component={PapProjectsPage}/>
            <PrivateRoute header="Project" path="/project_item" component={ProjectItemPage}/>
            {/* <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditExpensePage} /> */}
            {/* <Route component={NotFoundPage} /> */}
          </Switch>
  </BrowserRouter>
)

export default AppRouter;
