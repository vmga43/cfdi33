'use strict'

const CFDI = require('./lib/CFDI')
const Emisor = require('./lib/Node/Emisor')
const Receptor = require('./lib/Node/Receptor')
const Concepto = require('./lib/Node/Concepto')
const CfdiRelacionado = require('./lib/Node/CfdiRelacionado')
const Traslado = require('./lib/Node/Impuesto/Traslado')
const Retencion = require('./lib/Node/Impuesto/Retencion')
const CuentaPredial = require('./lib/Node/CuentaPredial')
const InformacionAduanera = require('./lib/Node/InformacionAduanera')

module.exports = {
  CFDI,
  Emisor,
  Receptor,
  Concepto,
  CfdiRelacionado,
  Traslado,
  Retencion,
  CuentaPredial,
  InformacionAduanera
};