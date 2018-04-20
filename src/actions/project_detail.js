const host = 'http://svdev.hyapresenta.com/api_medline/index.php/welcome?';
import {reverseString} from '../helpers'

const requestProjects = () => ({
  type: 'REQUEST_PROJECT_DETAIL'
})

const receiveProjects = (items) => ({
  type: 'RECEIVE_PROJECT_DETAIL',
  items
})

const errorProjects = (message) => ({
  type: 'ERROR_PROJECT_DETAIL',
  message
})

export const fetchProjectDetail = (proyecto) => {
  return dispatch => {
    dispatch(requestProjects())
    const url = `${host}proyecto=${proyecto}&format=json&detalle=1`
    return fetchWrapper(url, null, 10000)
      .then(response => response.json())
      .then(data => {
        let code;
        let items = data.map(d => {

          code = reverseString(parseInt(reverseString(d.POSID.substring(4))).toString());

          if(code.length == 5)
            code = code.substring(0,3) + '.' + code.substring(3)
          else if(code.length == 8)
            code = code.substring(0,3) + '.' + code.substring(3,5) + '.' + code.substring(5)
          else if(code.length == 11)
            code = code.substring(0,3) + '.' + code.substring(3,5) + '.' + code.substring(5,8) + '.' + code.substring(8)
          return {
          ...d,
          POSID: `${d.POSID.substring(0,1)}/\ ${d.POSID.substring(1,4)}/\ ${code}`,
          PPTOBACOMXN: parseFloat(d.PPTOBASEMXN) + parseFloat(d.PPTOORCAMXN),
          PPTOBACOUSD: parseFloat(d.PPTOBASEUSD) + parseFloat(d.PPTOORCAUSD),
          DIFERENCEMXN: (parseFloat(d.PPTOBASEMXN) + parseFloat(d.PPTOORCAMXN)) - parseFloat(d.COSTCOMPMXN),
          DIFERENCEUSD: (parseFloat(d.PPTOBASEUSD) + parseFloat(d.PPTOORCAUSD)) - parseFloat(d.COSTCOMPUSD)
        }}
      )

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
