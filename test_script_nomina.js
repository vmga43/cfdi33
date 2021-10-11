'use strict'

const CFDI = require('./index').CFDI
const Emisor = require('./index').Emisor
const Receptor = require('./index').Receptor
const Concepto = require('./index').Concepto
const Complemento = require('./index').Complemento
const Nomina = require('./index').Nomina
const NominaEmisor = require('./index').NominaEmisor
const NominaReceptor = require('./index').NominaReceptor
const NominaPercepcion = require('./index').NominaPercepcion
const NominaDeduccion = require('./index').NominaDeduccion
const NominaSeparacionIndemnizacion = require('./index').NominaSeparacionIndemnizacion
const NominaHorasExtra = require('./index').NominaHorasExtra
const https = require('https')
var fs = require('fs');
const beautify = require('simply-beautiful');

const cfdi = new CFDI({
  "Version": "3.3",
  //'Serie': 'A',
  //'Folio': '167ABC',
  'Fecha': '2018-06-11T08:09:23',
  'NoCertificado': '20001000000300022815',
  'SubTotal': '1000',
  'Moneda': 'MXN',
  'Total': '1160',
  'TipoDeComprobante': 'I',
  'FormaPago': '01',
  'MetodoPago': 'PUE',
  //'CondicionesDePago': 'CONDICIONES',
  'TipoCambio': '1',
  'LugarExpedicion': '45079',
});

cfdi.cer = './test/resources/LAN7008173R5.cer.pem'
cfdi.key = './test/resources/LAN7008173R5.key.pem'
cfdi.withOutCerts = true
cfdi.nomType = 'nomina'


cfdi.add(new Emisor({
  'Rfc': 'LAN7008173R5',
  'Nombre': 'CESAR RENE AGUILERA ARREOLA',
  'RegimenFiscal': '601'
}))

cfdi.add(new Receptor({
  'Rfc': 'HEPR930322977',
  'UsoCFDI': 'G01'
}))

const concepto = new Concepto({
  'ClaveProdServ': '84111505',
  'ClaveUnidad': 'ACT',
  'Cantidad': '1',
  'Descripcion': 'Pago de Nomina',
  'ValorUnitario': '1000',
  'Descuento':'0',
  'Importe': '1000'
})




cfdi.add(concepto)
  
var rootNomina = {
  "Version": "1.2",
  "TipoNomina": 'E',
  FechaPago: new Date().toISOString().split("T")[0],
  "FechaInicialPago": new Date().toISOString().split("T")[0],
  "FechaFinalPago": new Date().toISOString().split("T")[0],
  "NumDiasPagados": 0,
  "TotalPercepciones": 0,
  "TotalDeducciones": 0,
  "TotalOtrosPagos": 0
}
const nomina = new Nomina(rootNomina)


const nominaemisor = new NominaEmisor({
  RegistroPatronal: '123123ASF'
})
nomina.add(nominaemisor)

const nominareceptor = new NominaReceptor({
  Curp: 'CRP',
  NumSeguridadSocial: '123123',
  FechaInicioRelLaboral: '',
  Antigüedad: 'Antigüedad',
  TipoContrato: 'TipoContrato',
  TipoJornada: 'TipoJornada',
  TipoRegimen: 'TipoRegimen',
  NumEmpleado: 'NumEmpleado',
  Departamento: 'Departamento',
  Puesto: 'Puesto',
  RiesgoPuesto: 'ClaveRiesgoPuesto',
  PeriodicidadPago: 'PeriodicidadPago',
  Banco: 'Banco',
  CuentaBancaria: 'CuentaBancaria',
  SalarioDiarioIntegrado: 'SalarioDiarioIntegrado',
  ClaveEntFed: 'ClaveEntFed'
})
nomina.add(nominareceptor)


const percepcion = new NominaPercepcion(
  {
    TipoPercepcion: "002",
    Clave:"002",
    Concepto:"",
    ImporteGravado:0,
    ImporteExento:0
  },
  {
    TotalSueldos:0,
    TotalGravado:0,
    TotalExento:0,
    TotalSeparacionIndemnizacion:0,
  }
);

nomina.add(percepcion)


const percepcionHE =  new NominaPercepcion({
  TipoPercepcion: "019",
  Clave:"019",
  Concepto:"",
  ImporteGravado:0,
  ImporteExento:0
});
percepcionHE.add(new NominaHorasExtra({
  Dias:2,
  TipoHoras:'Dobles',
  HorasExtra:0,
  ImportePagado:0,
}))
nomina.add(percepcionHE);

const SeparacionIndemnizacion = new NominaSeparacionIndemnizacion(
  {
    TotalPagado: 0,
    NumAñosServicio:0,
    UltimoSueldoMensOrd:0,
    IngresoAcumulable:0,
    IngresoNoAcumulable:0,
  },
);
nomina.add(SeparacionIndemnizacion)

nomina.add(new NominaDeduccion(
  {
    TipoDeduccion:'',
    Clave:'',
    Concepto:'',
    Importe:0,
  },
  {
    TotalOtrasDeducciones:0,
    TotalImpuestosRetenidos:0,
  }
))

//Set Totales Complemento
nomina.attributes.$NumDiasPagados = 14;
nomina.attributes.$TotalDeducciones = 189;

cfdi.add(nomina)


 cfdi.getXml()
.then(xml => {
  var options = {
    space_before_conditional: true,
    jslint_happy: true,
    max_char: 20,
  }
  var formatedXML = beautify.html(xml,options)
  console.log(formatedXML)
});
 
  
