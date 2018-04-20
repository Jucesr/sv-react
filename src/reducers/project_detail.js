const initialState = {
  isFetching: false,
  items: [],
  error: undefined
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'REQUEST_PROJECT_DETAIL':
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case 'RECEIVE_PROJECT_DETAIL':
      return {
        ...state,
        isFetching: false,
        items: action.items
      }
    case 'ERROR_PROJECT_DETAIL':
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
