import React from 'react';
import ViewerTable from './ViewerTable';
import { connect } from 'react-redux'
import {projects, headers, head_test, test_data, makeRows, head_pap} from '../data/projects';

// const rows = makeRows(40);

export const PapProjectsPage = ({isSidebarOpen, rows}) => {

  const mH2 = (Header, columns, headerClassName) => ({

    Header,
    headerClassName: `header_table ${headerClassName}`,
    width_value: Header.length * 30,
    columns: columns.map(c => ({
      Header: c.Header,
      accessor: c.accessor,
      headerClassName: `header_table ${headerClassName}`,
      width_value: c.Header.length * 30,
      Cell: row => {
        return !isNaN(row.value) ? (
          `$${parseFloat(row.value).format(2,3,',','.')}`
        ) : row.value
        }
    }))
  })

  const mH1 = (Header, accessor, headerClassName) => ({
    Header,
    accessor,
    headerClassName: `header_table ${headerClassName}`,
    width_value: Header.length * 30,
    Cell: row => {
      return !isNaN(row.value) ? (
        `${parseFloat(row.value).format(2,3,',','.')}`
      ) : row.value
      }
  })

  const H = (Header, accessor) => ({
    Header,
    accessor

  })

  let columns = [
    mH1('Item','PSPID','header_table_white'),
    mH1('Description','POST1','header_table_white'),
    mH2('GMP Budget',[H('MXN','PPTOBASEMXN'), H('USD','PPTOBASEUSD')], 'header_table_blue'),
    mH2('Change Orders',[H('MXN','PPTOORCAMXN'), H('USD','PPTOORCAUSD')], 'header_table_gray'),
    mH2('GMP Budget + Change Orders',[H('MXN','PPTOBACOMXN'), H('USD','PPTOBACOUSD')], 'header_table_green2'),
    mH2('Approved Cost of Work',[H('MXN','PPTOCTRLMXN'), H('USD','PPTOCTRLUSD')], 'header_table_aqua'),
    mH2('Difference',[H('MXN','DIFERENCEMXN'), H('USD','DIFERENCEUSD')], 'header_table_green'),
    mH2('Owner',[H('MXN','COSTCOMPMXN'), H('USD','COSTCOMPUSD')], 'header_table_green'),
    mH2('Builder',[H('MXN','COSTREALMXN'), H('USD','COSTREALUSD')], 'header_table_green'),
  ]

  return(
    <div className={isSidebarOpen ? 'Page Page__open': 'Page Page__closed'}>
      <div className="table_wrapper">
        <ViewerTable
          columns={columns}
          rows={rows}
          defaultPageSize={rows.length}
          showPagination={false}
          className="-striped -highlight"
          id={1}
        />

      </div>

    </div>
  )
}


const mapStateToProps = state => ({
    isSidebarOpen: state.ui.sidebar_open,
    rows: state.projects.items
})

export default connect(mapStateToProps )(PapProjectsPage)
