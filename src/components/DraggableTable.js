import React, { Component } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";

class DraggableTable extends Component {
  constructor(props) {
    super(props);
    this.dragged = null;

  }
  mountEvents() {
    const headers = Array.prototype.slice.call(
      document.querySelectorAll(`.DraggableTable${this.props.id}`)

    );
    headers.forEach((header, i) => {
      let element_id = parseInt(header.getAttribute('dgid'))
      header.setAttribute("draggable", true);
      //the dragged header
      header.ondragstart = e => {
        e.stopPropagation();
        this.dragged = element_id;
      };

      header.ondrag = e => e.stopPropagation;

      header.ondragend = e => {
        e.stopPropagation();
        setTimeout(() => (this.dragged = null), 500);
      };

      //the dropped header
      header.ondragover = e => {
        e.preventDefault();
      };

      header.ondrop = e => {
        e.preventDefault();
        const { target, dataTransfer } = e;
        this.props.reOrderColumns({ from: this.dragged, to: element_id })
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

    const cols = columns.map((col, i ) => ({
      ...col,
      Header: <span dgid={i} className={`DraggableTable${this.props.id}`}>{col.Header}</span>,
    }))

    //render
    return (
        <ReactTable {...this.props} data={rows} columns={cols} />
    );
  }
}

export default DraggableTable;
