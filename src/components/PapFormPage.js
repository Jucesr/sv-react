import React from 'react'
import { connect } from 'react-redux'
import {fetchProjects} from '../actions/projects'

import FormPAP from './FormPAP'


class PapFormPage extends React.Component {

  replaceAll = (target, search, replacement) => {
    return target.replace(new RegExp(search, "g"), replacement)
  }

  onSubmit = (values) => {
    let proyectos = values.proyectos.map( p => (this.replaceAll(p, '/', '')).toUpperCase());
    let divisiones = values.divisiones.map (d => d.toUpperCase());

    this.props.fetchProjects({proyectos, divisiones})
      .then(
        () => {
          if (!this.props.error){
            this.history.push('/projects')
          }
        }
      )

  }

  render(){
    this.history = this.props.history;
    return (
      <div className={this.props.isSidebarOpen ? 'Page Page__open': 'Page Page__closed'}>
        {this.props.error && <div style={{color: 'red'}}>No se encontraron proyectos con los datos ingresados</div>}
        {!this.props.isFetching ? (<FormPAP onFired={this.onSubmit}/>) : (<img src="/img/loading.gif"></img>)}
      </div>
    )
  };
}

const mapStateToProps = state => ({
  isSidebarOpen: state.ui.sidebar_open,
  isFetching: state.projects.isFetching,
  items: state.projects.items,
  error: state.projects.error
})

const mapDispatchToProps = dispatch => ({
  fetchProjects: data => dispatch(fetchProjects(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PapFormPage)
