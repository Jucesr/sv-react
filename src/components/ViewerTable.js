import React from 'react';
import DraggableTable from './DraggableTable';
import ReactTable from "react-table";
import Select from 'react-select';

export default class ViewerTable extends React.Component {

  constructor(props){
    super(props);

    let columns =  this.props.columns.clone();

    this.state = {
      views: [{
        value: 0,
        label: 'Default',
        data: columns
      }],
      current_value: 0,
      current_columns: columns,
      settings_visible: false
    }
  }

  onViewChange = (newValue) => {
    this.setState(() => ({
      current_value: newValue.value,
      current_columns: newValue.data
    }))
  };

  saveView = (e) => {

    this.setState((prevState) => ({
      views: prevState.views.map(view => {
        if(view.value == this.state.current_value){
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
        data: this.props.columns.clone()
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

  onExpandColumn = (columns) => {
    let target_column = columns[0];
    let cols = this.state.current_columns;

    let c = cols.map( (col) => {
      if(col.accessor == target_column.id){
        col.width = target_column.value;
      }
      return col;
    });

    // this.setState(() => ({
    //   current_columns: c
    // }));

    //console.log(columns[0]);
  }

  getTheadThProps = (state, rowInfo, column) => {
    return {
      style: {
        background: column.id == 'proyecto' ? 'green' : 'red',
        width: column.id == 'proyecto' ? '10px' : '100px'
      }
    }
  }

  render(){
    const {views, current_value} = this.state;

    const config_row =[{
      name: 'Proyecto',
      active: true
    },{
      name: 'Descripcion',
      active: true
    },{
      name: 'Mascara',
      active: false
    },{
      name: 'Proyecto',
      active: true
    },{
      name: 'Descripcion',
      active: true
    },{
      name: 'Mascara',
      active: false
    },{
      name: 'Proyecto',
      active: true
    },{
      name: 'Descripcion',
      active: true
    },{
      name: 'Mascara',
      active: false
    }];

    return (
      <div className="ViewerTable__wrapper">

        <div className="ViewerTable__settings">
          <div>
            <Select
              className="form_field__select"
              value={current_value}
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
          columns={this.state.current_columns}
          reOrderColumns={this.reOrderColumns}
          onResizedChange={this.onExpandColumn}
          // getTheadThProps={this.getTheadThProps}
        />

        {this.state.settings_visible && <div className="ViewerTable__modal">
          <div className="ViewerTable__modal_content">
            <div className="ViewerTable__modal_table">
              <ReactTable
                {...this.props}
                columns={[{
                  Header: 'Name',
                  accessor: 'name'

                },{
                  Header: 'Active',
                  accessor: 'active',
                  Cell: row => (
                    <div className="ViewerTable__modal_active_cell">
                      <input type="checkbox" defaultChecked={row.value}/>
                    </div>

                  )

                }]}
                data={config_row}
                defaultPageSize={config_row.length}
                showPagination={false}
              />
            </div>

            <div className="ViewerTable__modal_buttons">
              <button>OK</button>
              <button onClick={this.closeSettings} >Cancel</button>
            </div>

          </div>
        </div>}

      </div>
    )
  };

}
