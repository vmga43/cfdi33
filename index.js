'use strict'

const CFDI = require('./lib/CFDI');
const Emisor = require('./lib/Node/Emisor');
const Receptor = require('./lib/Node/Receptor');
const Concepto = require('./lib/Node/Concepto');
const CfdiRelacionado = require('./lib/Node/CfdiRelacionado');
const Traslado = require('./lib/Node/Impuesto/Traslado');
const Retencion = require('./lib/Node/Impuesto/Retencion');
const CuentaPredial = require('./lib/Node/CuentaPredial');
const InformacionAduanera = require('./lib/Node/InformacionAduanera');
const Parte = require('./lib/Node/Parte');
const Pago = require('./lib/Node/Pago');
const Complemento = require('./lib/Node/Complemento');
const Nomina = require('./lib/Node/Nomina/Nomina');
const NominaEmisor = require('./lib/Node/Nomina/Emisor');
const NominaReceptor = require('./lib/Node/Nomina/Receptor');
const NominaPercepcion = require('./lib/Node/Nomina/Percepcion');
const NominaDeduccion = require('./lib/Node/Nomina/Deduccion');
const NominaSeparacionIndemnizacion = require('./lib/Node/Nomina/SeparacionIndemnizacion');
const NominaHorasExtra = require('./lib/Node/Nomina/HorasExtra');

module.exports = {
  CFDI,
  Emisor,
  Receptor,
  Concepto,
  CfdiRelacionado,
  Traslado,
  Retencion,
  CuentaPredial,
  InformacionAduanera,
  Parte,
  Complemento,
  Pago,
  Nomina,
  NominaEmisor,
  NominaReceptor,
  NominaPercepcion,
  NominaSeparacionIndemnizacion,
  NominaHorasExtra,
  NominaDeduccion
};
