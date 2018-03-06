import React from 'react';
import ViewerTable from './ViewerTable';
import {projects, headers, head_test, test_data} from '../data/projects';

export const PapProjectsPage = () => {

  return(
    <div className="margin_container">
      <div className="table_wrapper">
        <ViewerTable
          columns={head_test.clone()}
          rows={test_data.clone()}
          defaultPageSize={5}
          className="-striped -highlight"
          showPagination={true}
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
