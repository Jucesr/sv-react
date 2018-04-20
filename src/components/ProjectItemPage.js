import React from 'react'
import { connect } from 'react-redux'

import ViewerTable from './ViewerTable'
import {mH1, mH2, H} from '../helpers'

export const PapProjectsPage = ({isSidebarOpen, rows, history}) => {

  let columns = [
    mH1('Item','POSID','header_table_white'),
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
          views_id='projects'
          columns={columns}
          rows={rows}
          defaultPageSize={rows.length}
          showPagination={false}
          className="-striped -highlight"
          id={2}
          getTdProps={(state, rowInfo, column, instance) => {
              let rowColor;

              if(rowInfo.original.POSID.length == 11)
                rowColor = '#668cff'
              if(rowInfo.original.POSID.length == 14)
                rowColor = '#99b3ff'
              if(rowInfo.original.POSID.length == 18)
                rowColor = '#ccd9ff'
              if(rowInfo.original.POSID.length > 18)
                rowColor = '#e6ecff'

              return {
                style: {
                  background: rowColor
                }
              }
            }}
        />

      </div>

    </div>
  )
}


const mapStateToProps = state => ({
    isSidebarOpen: state.ui.sidebar_open,
    rows: state.project_detail.items
})



export default connect(mapStateToProps )(PapProjectsPage)
