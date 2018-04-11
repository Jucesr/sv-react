export const addView = (table_id, view) => ({
  type: 'ADD_VIEW',
  table_id,
  view
});

export const saveView = (table_id, view) => ({
  type: 'SAVE_VIEW',
  table_id,
  view
});

export const deleteView = (table_id, view) => ({
  type: 'DELETE_VIEW',
  table_id,
  view
});
