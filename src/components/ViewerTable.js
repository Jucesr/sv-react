import React from 'react';
import DraggableTable from './DraggableTable';
import ReactTable from "react-table";
import Select from 'react-select';

export default class ViewerTable extends React.Component {

  constructor(props){
    super(props);

    //Make sure all columns have visible prop
    let columns =  this.addVisibleProperty(this.props.columns.clone());

    this.state = {
      views: [{
        value: 0,
        label: 'Default',
        data: columns
      }],
      current_view: 0,
      current_columns: columns,
      settings_visible: false,
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
      current_view: newValue.value,
      current_columns: newValue.data
    }))
  };

  saveView = (e) => {

    this.setState((prevState) => ({
      views: prevState.views.map(view => {
        if(view.value == this.state.current_view){
          view.data = this.state.current_columns.clone();
        }
        return view;
      })
    }), alert('View saved'))
  }

  newView = (e) => {

    this.setState((prevState) => ({
      views: prevState.views.concat({
        value: prevState.views.length ,
        label: `New ${prevState.views.length }`,
        data: this.addVisibleProperty(this.props.columns.clone())
      })
    }));
  }

  openSettings = () => {
    this.setState( () => ({
      settings_visible: true
    }));
  }

  closeSettings = () => {
    this.setState( () => ({
      settings_visible: false
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
        settings_visible: false
      }));

      this.settings = [];
    }
  }

  reOrderColumns = (obj) => {

    let reorder = [];
    let cols = this.state.current_columns;
    reorder.push(obj);
    reorder.forEach(o => cols.splice(o.a, 0, cols.splice(o.b, 1)[0]));

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
    columns = columns.map( col => {
      if(col.accessor == column_residez.id){
        col.width_value = column_residez.value;
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
    const {views, current_view} = this.state;
    const visible_columns = this.getVisibleColumns(this.state.current_columns);

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
            <button onClick={this.saveView}>Save</button>
            <button onClick={this.openSettings}>Settings</button>
          </div>
        </div>
        <DraggableTable
          {...this.props}
          columns={visible_columns}
          reOrderColumns={this.reOrderColumns}
          resized={visible_columns.map( col =>({
            id: col.accessor,
            value: col.width_value
          }))}
          onResizedChange={this.onResizedChange}
          // getTheadThProps={this.getTheadThProps}
        />

        {this.state.settings_visible && <div className="ViewerTable__modal">
          <div className="ViewerTable__modal_content">
            <div className="ViewerTable__modal_table">
              <ReactTable
                {...this.props}
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

      </div>
    )
  };

}
