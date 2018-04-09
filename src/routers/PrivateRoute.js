import React from 'react';
import {Header} from '../components/Header';
import {SideBar} from '../components/SideBar';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isSidebarOpen: true
    }
  }

  toggleSideBar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }))
  }

  render(){
    const props = this.props;
    const {
      component: Component,
      header,
      ...rest
    } = this.props;
    return (
        <Route {...rest} component={(props) => (
          <div>
            <SideBar isOpen={this.state.isSidebarOpen}/>
              <div className={this.state.isSidebarOpen ? 'app_content_open' :'app_content_close'}>
                <Header {...props} title={header} toggleSideBar={this.toggleSideBar}/>
                <Component {...props} />
              </div>
          </div>


        )} />
      );
  };
}

export default PrivateRoute
