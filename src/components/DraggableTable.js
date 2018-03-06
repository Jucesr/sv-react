import React, { Component } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";

import "react-table/react-table.css";

class DraggableTable extends Component {
  constructor(props) {
    super(props);
    this.dragged = null;

  }
  mountEvents() {
    const headers = Array.prototype.slice.call(
      // document.querySelectorAll(".rt-th")
      document.querySelectorAll(`.draggable-header${this.props.id}`)

    );

    headers.forEach((header, i) => {
      header.setAttribute("draggable", true);
      //the dragged header
      header.ondragstart = e => {
        e.stopPropagation();
        this.dragged = i;
      };

      header.ondrag = e => e.stopPropagation;

      header.ondragend = e => {
        e.stopPropagation();
        setTimeout(() => (this.dragged = null), 1000);
      };

      //the dropped header
      header.ondragover = e => {
        e.preventDefault();
      };

      header.ondrop = e => {
        e.preventDefault();
        const { target, dataTransfer } = e;
        this.props.reOrderColumns({ a: i, b: this.dragged })
      };
    });
  }

  componentDidMount() {
    this.mountEvents();
  }

  componentDidUpdate() {
    this.mountEvents();
  }


  render() {
    let { rows } = this.props;

    let columns = this.props.columns.clone();

    const cols = columns.map(col => ({
      ...col,
      Header: <span className={`draggable-header${this.props.id}`}>{col.Header}</span>,
    }));

    //render
    return (
      <div className="esr-table">
        <ReactTable {...this.props} data={rows} columns={cols} />
      </div>
    );
  }
}

export default DraggableTable;
