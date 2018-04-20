import React from 'react'
import { connect } from 'react-redux'

import ViewerTable from './ViewerTable'
import {mH1, mH2, H} from '../helpers'
import {fetchProjectDetail} from '../actions/project_detail'

const onClickItemTable = (row, history, fetchProjectDetail, error) => {
  let project = row.PSPID.replaceAll('/ ','')

  fetchProjectDetail(project)
  .then(
    () => {
      if (!error){
        history.push('/project_item')
      }
    }
  )
  // history.push('/project_item');
}

export const PapProjectsPage = ({isSidebarOpen, rows, history, fetchProjectDetail, isFetching, error}) => {

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
        {!isFetching ?
          (
            <ViewerTable
              views_id='projects'
              columns={columns}
              rows={rows}
              defaultPageSize={rows.length}
              showPagination={false}
              className="-striped -highlight"
              id={1}
              getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      if(rowInfo){
                        onClickItemTable(rowInfo.original, history, fetchProjectDetail, error);
                      }
                      if (handleOriginal) {
                        handleOriginal()
                      }
                    }
                  }
                }}
            />
          ) : (<img src="/img/loading.gif"></img>)}

      </div>

    </div>
  )
}


const mapStateToProps = state => ({
    isSidebarOpen: state.ui.sidebar_open,
    rows: state.projects.items,
    isFetching: state.project_detail.isFetching,
    error: state.project_detail.error
})

const mapDispatchToProps = dispatch => ({
  fetchProjectDetail: data => dispatch(fetchProjectDetail(data))
})

export default connect(mapStateToProps, mapDispatchToProps )(PapProjectsPage)
