import React from 'react';
import DraggableTable from './DraggableTable';
import ReactTable from "react-table";
import Select from 'react-select';
import { connect } from 'react-redux'

import {addView, saveView} from '../actions/views'

class ViewerTable extends React.Component {

  constructor(props){
    super(props);
    //Make sure all columns have visible prop
    let columns =  this.addVisibleProperty(this.props.columns.clone());

    if(this.props.views.length <= 0 ){
      this.props.addView(this.props.views_id, {
        label: `Default`,
        data: columns
      })
    }
    this.state = {
      current_view: 0,
      current_columns: columns.clone(),
      ui_toggle_columns: false,
      ui_view_name: false
    }

    this.settings = {};
  }

  addVisibleProperty = (oldColumns) => {
    return oldColumns.map(col => {
      if(col.visible == undefined){
        col.visible = true
      }
      return col;
    });
  }

  onViewChange = (newValue) => {
    this.setState(() => ({
      current_view: newValue._id,
      current_columns: newValue.data
    }))
  };

  saveView = (e) => {
    e.preventDefault();
    const view_name = e.target.view_name.value.trim()



    if(view_name.length > 0){

      this.props.saveView(this.props.views_id, {
        _id: this.state.current_view,
        label: view_name,
        data: this.state.current_columns.clone()
      })

      this.setState((prevState) => ({
        ui_view_name: false
      }))
    }else{
      alert('Invalid name');
    }

  }

  openSaveSettings = (e) => {

    this.setState( () => ({
      ui_view_name: true
    }), () => {
      this.view_name.value = this.props.views[this.state.current_view].label;
      this.view_name.focus()
    });
  }

  newView = (e) => {

    this.props.addView(this.props.views_id, {
      label: `New ${this.props.views.length }`,
      data: this.addVisibleProperty(this.props.columns.clone())
    })

  }

  openSettings = () => {
    this.setState( () => ({
      ui_toggle_columns: true
    }));
  }

  closeSettings = () => {
    this.setState( () => ({
      ui_toggle_columns: false,
      ui_view_name: false
    }));
  }

  updateSettings = () => {
    if(this.settings){
      let new_columns = this.state.current_columns.map( col => {
        if(col.Header in this.settings){
            col.visible = this.settings[col.Header];
        }
        return col;
      });

      this.setState(() => ({
        current_columns: new_columns,
        ui_toggle_columns: false
      }));

      this.settings = [];
    }
  }

  reOrderColumns = (obj) => {

    let reorder = [];
    let cols = this.state.current_columns;
    reorder.push(obj);
    reorder.forEach(o => cols.splice(o.to, 0, cols.splice(o.from, 1)[0]));

    this.setState((prevState) => {
      return {
        current_columns: cols
      }
    });
  }

  getVisibleColumns = (columns) => {
    return columns.filter(c => c.visible);
  }

  getTheadThProps = (state, rowInfo, column) => {
    return {
      style: {
        background: column.id == 'proyecto' ? 'green' : 'red',
        width: column.id == 'proyecto' ? '10px' : '100px'
      }
    }
  }

  onCheckboxChange = (e) => {
    let text = e.target.textContent;
    if(text != 'X'){
      this.settings[e.target.id] = false;
      e.target.textContent = 'X';
    }else{
      e.target.textContent = '✓';
      this.settings[e.target.id] = true;
    }

  }

  onResizedChange = (resized) => {
    let columns = this.state.current_columns;

    let column_residez = resized.pop();
    // console.log(column_residez);
    columns = columns.map( col => {

      if(col.columns){

        col.columns = col.columns.map( c => {
          if(c.accessor == column_residez.id){
            c.width_value = column_residez.value;
          }
          return c;
        })
      }else{
        if(col.accessor == column_residez.id){
          col.width_value = column_residez.value;
        }
      }
      return col;
    });


    this.setState((prevState) => {
      return {
        current_columns: columns
      }
    });
  }

  render(){
    const views = this.props.views.map(view => ({
      ...view,
      value: view._id
    }))
    const {current_view} = this.state;
    const visible_columns = this.getVisibleColumns(this.state.current_columns);
    let resized_columns = [];

    visible_columns.map( col =>{
      if(col.columns){
        return col.columns.map( c => {

          resized_columns.push({
            id: c.accessor,
            value: c.width_value
          });
        })
      }else{
        //Normal column
        resized_columns.push({
          id: col.accessor ,
          value: col.width_value
        })
      }
    })
      // console.log(resized_columns);

    return (
      <div className="ViewerTable__wrapper">

        <div className="ViewerTable__settings">
          <div>
            <Select
              className="form_field__select"
              value={current_view}
              placeholder=""
              options={views}
              onChange={this.onViewChange}
              noResultsText='No se encontro la vista'
              clearable={false}
            />
          </div>

          <div>
            <button onClick={this.newView}>New</button>
            <button onClick={this.openSaveSettings}>Save</button>
            <button onClick={this.openSettings}>Settings</button>
          </div>
        </div>
        <DraggableTable
          {...this.props}
          columns={visible_columns}
          reOrderColumns={this.reOrderColumns}
          resized={resized_columns}
          onResizedChange={this.onResizedChange}
          // getTheadThProps={this.getTheadThProps}
        />

        {this.state.ui_toggle_columns && <div className="ViewerTable__modal">
          <div className="ViewerTable__modal_content">
            <div className="ViewerTable__modal_table">
              <ReactTable
                className={this.props.className}
                columns={[{
                  Header: 'Column',
                  accessor: 'name'

                },{
                  Header: 'Visible',
                  accessor: 'visible',
                  Cell: row => (
                    <div className="ViewerTable__modal_active_cell" id={row.row.name} onClick={this.onCheckboxChange}>
                      {row.value ? '✓' : 'X'}
                    </div>
                  )

                }]}
                data={this.state.current_columns.map( col => {
                  return {
                    'name': col.Header,
                    'visible': col.visible
                  }
                })}
                defaultPageSize={this.state.current_columns.length}
                showPagination={false}

              />
            </div>

            <div className="ViewerTable__modal_buttons">
              <button onClick={this.updateSettings}>OK</button>
              <button onClick={this.closeSettings} >Cancel</button>
            </div>

          </div>
        </div>}

        {this.state.ui_view_name &&
          <div className="ViewerTable__modal">
            <div className="ViewerTable__modal_input">

              <form onSubmit={this.saveView}>
                <input id="view_name" name="view_name" type="text" placeholder="View name..." ref={(input) => this.view_name = input} />

                <div className="ViewerTable__modal_input_buttons">
                  <button >Save</button>
                  <button onClick={this.closeSettings} >Cancel</button>
                </div>
              </form>


            </div>
          </div>
        }

      </div>
    )
  };

}

const mapStateToProps = (state, {views_id}) => ({
    views: state.views[views_id] || []
})
const mapDispatchToProps = dispatch => ({
    addView: (table_id, view) => dispatch(addView(table_id, view)),
    saveView: (table_id, view) => dispatch(saveView(table_id, view))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewerTable)
