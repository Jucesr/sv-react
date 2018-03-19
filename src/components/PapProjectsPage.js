import React from 'react';
import ViewerTable from './ViewerTable';
import {projects, headers, head_test, test_data, makeRows} from '../data/projects';

const rows = makeRows(40);

export const PapProjectsPage = () => {

  return(
    <div className="margin_container">
      <div className="table_wrapper">
        <ViewerTable
          columns={headers}
          rows={rows}
          defaultPageSize={rows.length}
          showPagination={false}
          className="-striped -highlight"
          id={1}
        />

        {/* <ViewerTable
          columns={head_test.clone()}
          rows={test_data.clone()}
          defaultPageSize={5}
          className="-striped -highlight"
          showPagination={false}
          id={2}
        /> */}
      </div>

    </div>
  )
}
