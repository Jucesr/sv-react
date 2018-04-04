import React from 'react'
import FormPAP from './FormPAP'
import fetch from 'cross-fetch'

class PapFormPage extends React.Component {

  constructor(props){
    super(props);
    this.history;
    this.state = {
      isFetching: false,
      error: false
    }
  }

  replaceAll = (target, search, replacement) => {
    return target.replace(new RegExp(search, "g"), replacement)
  }

  fetchWrapper = (url, options, timeout) => {
      return new Promise((resolve, reject) => {
        fetch(url, options).then(resolve).catch(reject);

        if (timeout) {
          const e = new Error("Connection timed out");
          setTimeout(() => {
            this.setState(() => ({
              isFetching: false,
              error: true
            }));
            reject();
          }, timeout, e);
        }
      });
  }

  logValues = (values) => {
    const host = 'http://svdev.hyapresenta.com/api_medline/index.php?'
    let proyectos = values.proyectos.map( p => (this.replaceAll(p, '/', '') + "00000000000").toUpperCase());
    let divisiones = values.divisiones.map (d => d.toUpperCase());

    const url = `${host}proyectos=${proyectos.toString()}&divisiones=${divisiones.toString()}`

    this.setState(() => ({
      isFetching: true,
      error: false
    }));

    this.fetchWrapper(url, null, 10000).then( response => {
      return response.json()
      }
    ).then(
      data => {
      //
      //   data = data.map(d => Object.keys(d).map((key, value) => {
      //     if(!isNaN(value))
      //       value = parseFloat(value)
      //
      //     return {
      //         key: value
      //     }
      //   }))

        data = data.map(d => ({
          ...d,
          PSPID: `${d.PSPID.substring(0,1)}/\ ${d.PSPID.substring(1,4)}/\ ${d.PSPID.substring(4,7)}`,
          PPTOBACOMXN: parseFloat(d.PPTOBASEMXN) + parseFloat(d.PPTOORCAMXN),
          PPTOBACOUSD: parseFloat(d.PPTOBASEUSD) + parseFloat(d.PPTOORCAUSD),
          DIFERENCEMXN: (parseFloat(d.PPTOBASEMXN) + parseFloat(d.PPTOORCAMXN)) - parseFloat(d.COSTCOMPMXN),
          DIFERENCEUSD: (parseFloat(d.PPTOBASEUSD) + parseFloat(d.PPTOORCAUSD)) - parseFloat(d.COSTCOMPUSD)

        }))

        localStorage.setItem("projects", JSON.stringify(data));
        console.log(data);
        this.history.push('/projects')
        // this.setState(() => ({
        //   isFetching: false,
        //   error: false
        // }), );

      }
    ).catch(
      e => {
        console.log(e)
        this.setState(() => ({
          isFetching: false
        }));
      }
    )

  }

  render(){
    this.history = this.props.history;
    return (
      <div className="margin_container">
        {this.state.error && <div style={{color: 'red'}}>No se encontraron proyectos con los datos ingresados</div>}

        {!this.state.isFetching ? (<FormPAP onFired={this.logValues}/>) : (<img src="/img/loading.gif"></img>)}


      </div>
    )
  };
}

export default PapFormPage
