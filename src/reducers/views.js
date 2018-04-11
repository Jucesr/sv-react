const initialState = {}

export default (state = initialState, action) => {
  let viewArray = state[action.table_id] || [];
  switch (action.type) {

    case 'ADD_VIEW':
      return {
        ...state,
        [action.table_id]: viewArray.concat({
          ...action.view,
          _id: viewArray.length
        })
      }

    case 'SAVE_VIEW':
      return {
        ...state,
        [action.table_id]: viewArray.map( view => {
          if(view._id == action.view._id)
            return action.view
          else
            return view
        })
      }

    case 'DELETE_VIEW':
      return {
        ...state,
        [action.table_id]: viewArray.filter(view => view._id != action.view._id)
      }
    default:
      return state
  }
}
