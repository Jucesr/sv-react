const initialState = {
  isFetching: false,
  items: [],
  error: undefined
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'REQUEST_PROJECTS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECEIVE_PROJECTS':
      return {
        ...state,
        isFetching: false,
        items: action.items
      }
    case 'ERROR_PROJECTS':
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.message
      }

    default:
      return state
  }
}
