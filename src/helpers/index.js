export const mH2 = (Header, columns, headerClassName, format) => ({

  Header,
  format,
  headerClassName: `header_table ${headerClassName}`,
  width_value: Header.length * 30,
  columns: columns.map(c => ({
    Header: c.Header,
    format,
    accessor: c.accessor,
    headerClassName: `header_table ${headerClassName}`,
    width_value: c.Header.length * 30,
    // Cell: row => {
    //   return !isNaN(row.value) ? (
    //     `$${parseFloat(row.value).format(2,3,',','.')}`
    //   ) : row.value
    //   }
  }))
})

export const mH1 = (Header, accessor, headerClassName, format) => ({
  Header,
  format,
  accessor,
  headerClassName: `header_table ${headerClassName}`,
  width_value: Header.length * 30,
  // Cell: row => {
  //   return !isNaN(row.value) ? (
  //     `${parseFloat(row.value).format(2,3,',','.')}`
  //   ) : row.value
  //   }
})

export const H = (Header, accessor) => ({
  Header,
  accessor

})

export const reverseString = (str) => {
    return str.split("").reverse().join("");
}

export const formatIndividualColumn = format => {
  switch (format) {
    case 'currency':
      return row => {
          return !isNaN(row.value) ? (
            `$${parseFloat(row.value).format(2,3,',','.')}`
          ) : row.value
        }
    break;

    case 'number':
      return row => {
          return !isNaN(row.value) ? (
            `${parseFloat(row.value).format(2,3,',','.')}`
          ) : row.value
        }
    break;

    case 'text': {
      return row => row.value
    }
    default:

  }
}

export const formatColumn = columns => {

  return columns.map(column => {
    if(column.columns){
      return {
        ...column,
        columns: column.columns.map(col => ({
          ...col,
          Cell: formatIndividualColumn(column.format)
        }))
      }
    }else{
      return {
        ...column,
        Cell: formatIndividualColumn(column.format)
      }
    }
  })
}
