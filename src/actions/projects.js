const host = 'http://svdev.hyapresenta.com/api_medline/index.php?';
const TIME_OUT = 15000;

const requestProjects = () => ({
  type: 'REQUEST_PROJECTS'
})

const receiveProjects = (items) => ({
  type: 'RECEIVE_PROJECTS',
  items
})

const errorProjects = (message) => ({
  type: 'ERROR_PROJECTS',
  message
})

export const fetchProjects = ({proyectos, divisiones}) => {
  return dispatch => {
    dispatch(requestProjects())
    const url = `${host}proyectos=${proyectos.toString()}&divisiones=${divisiones.toString()}`
    return fetchWrapper(url, null, TIME_OUT)
      .then(response => response.json())
      .then(data => {
        let items = data.map(d => ({
          ...d,
          PSPID: `${d.PSPID.substring(0,1)}/\ ${d.PSPID.substring(1,4)}/\ ${d.PSPID.substring(4,7)}`,
          PPTOBACOMXN: parseFloat(d.PPTOBASEMXN) + parseFloat(d.PPTOORCAMXN),
          PPTOBACOUSD: parseFloat(d.PPTOBASEUSD) + parseFloat(d.PPTOORCAUSD),
          DIFERENCEMXN: (parseFloat(d.PPTOBASEMXN) + parseFloat(d.PPTOORCAMXN)) - parseFloat(d.COSTCOMPMXN),
          DIFERENCEUSD: (parseFloat(d.PPTOBASEUSD) + parseFloat(d.PPTOORCAUSD)) - parseFloat(d.COSTCOMPUSD)

        }))

        console.log(items);
        return dispatch(receiveProjects(items))
      })
      .catch(e => dispatch(errorProjects(e)))
  }
}

const fetchWrapper = (url, options, timeout) => {
    return new Promise((resolve, reject) => {
      fetch(url, options).then(resolve).catch(reject);

      if (timeout) {
        setTimeout(() => reject("Connection timed out"), timeout);
      }
    });
}
