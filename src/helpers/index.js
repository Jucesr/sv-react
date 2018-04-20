String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
}

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export const mH2 = (Header, columns, headerClassName) => ({

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

export const mH1 = (Header, accessor, headerClassName) => ({
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

export const H = (Header, accessor) => ({
  Header,
  accessor

})

export const reverseString = (str) => {
    return str.split("").reverse().join("");
}
