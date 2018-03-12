import React from 'react';

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

const rest = {
  sociedad: '1300',
  ingreso_comprometido_usd: '0',
  ingreso_comprometido_mxn: '0',
  ingreso_comprometido: '0',
  ingreso_facturado_usd: '0',
  ingreso_facturado_mxn: '0',
  ingreso_facturado: '0',
  ingreso_cobrado: '0',
  activo: '1000',
  ingreso_por_cobrar: '0',
  costo_presupuestado: '0',
  indicador_iva: '0',
  iva_porcentaje: '16',
  tipo_de_cambio_ponderado_de_pedido: '0',
  tipo_de_cambio_de_presupuesto: '20',
  costo_facturado: '0',
  costo_retenido: '0',
  costo_liberado: '0',
  costo_saldo_retenido: '0',
  costo_pagado: '0',
  pasivo: '0',
  costo_por_pagar: '0',
  flujo_proyectado: '0',
  flujo_absoluto: '0',
  posicion_financiera: '0',
  costo_financiero_de_proyecto: '0',
  perdida_y_ganancia_por_tipo_de_cambio: '0',
  ingreso_facturado_por_garantias: '0',
  ingreso_pagado_por_garantias: '0',
  costo_pagado_por_garantias: '0'
}

export const projects = [{
    proyecto: 'R-MXL-050',
    descripcion: 'Venus',
    division: 'mxl',
    ingreso_presupuestado: '50000000',
    presupuesto_usd: '1000000',
    presupuesto_mxn: '30000000'
  },{
    proyecto: 'R-MXL-051',
    descripcion: 'Fevisa',
    division: 'mxl',
    ingreso_presupuestado: '10000000',
    presupuesto_usd: '250000',
    presupuesto_mxn: '5000000'
  },{
    proyecto: 'R-MXL-052',
    descripcion: 'Packaging',
    division: 'mxl',
    ingreso_presupuestado: '5040800',
    presupuesto_usd: '250000',
    presupuesto_mxn: '5000000'
  },{
    proyecto: 'R-MXL-053',
    descripcion: 'Code block',
    division: 'mxl',
    ingreso_presupuestado: '940051800',
    presupuesto_usd: '250000',
    presupuesto_mxn: '5000000'
  },{
    proyecto: 'R-MTY-050',
    descripcion: 'Kohler',
    division: 'mty',
    ingreso_presupuestado: '1000000',
    presupuesto_usd: '1000',
    presupuesto_mxn: '800000'
}]

export const test_data = [{
    proyecto: 'R-MXL-050',
    descripcion: 'Venus',
    division: 'mxl',
  },{
    proyecto: 'R-MXL-051',
    descripcion: 'Fevisa',
    division: 'mxl',
  },{
    proyecto: 'R-MXL-052',
    descripcion: 'Packaging',
    division: 'mxl',
  }]

const makeHeaders = headers => {
  return headers.map(h => ({
    Header: h,
    accessor: h.toLowerCase().replaceAll(" ", "_"),
    width_value: h.length * 10,
    Cell: row => {
      return !isNaN(row.value) ? (
        parseFloat(row.value).format(2,3,',','.')
      ) : row.value
    }
    //Cell: row => (<strong>{row.value}</strong>)
  }));
};

export const makeRows = n => {
  let rows = [];
  for (var i = 0; i < n; i++) {
    rows.push({
      ...projects[Math.floor((Math.random() * 4) )],
      ...rest
    });
  }

  return rows;
}

export const headers = makeHeaders([
  'Proyecto',
  'Descripcion',
  'Sociedad',
  'Division',
  'Ingreso Presupuestado',
  'Presupuesto USD',
  'Presupuesto MXN',
  'Ingreso Comprometido USD',
  'Ingreso Comprometido MXN',
  'Ingreso Comprometido',
  'Ingreso Facturado USD',
  'Ingreso Facturado MXN',
  'Ingreso Facturado',
  'Ingreso Cobrado',
  'Activo',
  'Ingreso por Cobrar',
  'Costo Presupuestado',
  'Indicador IVA',
  'IVA Porcentaje',
  'Tipo de Cambio Ponderado de Pedido',
  'Tipo de Cambio de Presupuesto',
  'Costo Facturado',
  'Costo Retenido',
  'Costo Liberado',
  'Costo Saldo Retenido',
  'Costo Pagado',
  'Pasivo',
  'Costo por Pagar',
  'Flujo Proyectado',
  'Flujo Absoluto',
  'Posicion Financiera',
  'Costo Financiero de Proyecto',
  'Perdida y Ganancia por Tipo de Cambio',
  'Ingreso Facturado por Garantias',
  'Ingreso Pagado por Garantias',
  'Costo Pagado por Garantias',
]);

export const headersV2 = makeHeaders([
  'Descripcion',
  'Proyecto',
  'Sociedad',
  'Division',
  'Ingreso Presupuestado',
  'Presupuesto USD',
  'Presupuesto MXN',
  'Ingreso Comprometido USD',
  'Ingreso Comprometido MXN',
  'Ingreso Comprometido',
  'Ingreso Facturado USD',
  'Ingreso Facturado MXN',
  'Ingreso Facturado',
  'Ingreso Cobrado',
  'Activo',
  'Ingreso por Cobrar',
  'Costo Presupuestado',
  'Indicador IVA',
  'IVA Porcentaje',
  'Tipo de Cambio Ponderado de Pedido',
  'Tipo de Cambio de Presupuesto',
  'Costo Facturado',
  'Costo Retenido',
  'Costo Liberado',
  'Costo Saldo Retenido',
  'Costo Pagado',
  'Pasivo',
  'Costo por Pagar',
  'Flujo Proyectado',
  'Flujo Absoluto',
  'Posicion Financiera',
  'Costo Financiero de Proyecto',
  'Perdida y Ganancia por Tipo de Cambio',
  'Ingreso Facturado por Garantias',
  'Ingreso Pagado por Garantias',
  'Costo Pagado por Garantias',
]);

export const head_test = makeHeaders([
  'Proyecto',
  'Descripcion',
  'Division'
]);
