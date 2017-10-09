# CFDIV33 

Genera un XML CFDI v3.3

## Instalación 

```
npm install cfdiv33 --save
```

## Ejemplo de uso

```javascript
'use strict'

const CFDI = require('cfdiv33').CFDI
const Emisor = require('cfdiv33').Emisor
const Receptor = require('cfdiv33').Receptor
const Concepto = require('cfdiv33').Concepto
const CuentaPredial = require('cfdiv33').CuentaPredial
const InformacionAduanera = require('cfdiv33').InformacionAduanera
const CfdiRelacionado = require('cfdiv33').CfdiRelacionado
const Traslado = require('cfdiv33').Traslado
const Retencion = require('cfdiv33').Retencion

const cfdi = new CFDI({
  'Serie': 'A',
  'Folio': '167ABC',
  'Fecha': '2017-01-05T09:09:23',
  'Sello': '',
  'NoCertificado': '20001000000200001428',
  'Certificado': '',
  'SubTotal': '1000',
  'Moneda': 'MXN',
  'Total': '1500',
  'TipoDeComprobante': 'I',
  'FormaPago': '01',
  'MetodoPago': 'PUE',
  'CondicionesDePago': 'CONDICIONES',
  'Descuento': '0.00',
  'TipoCambio': '1.0',
  'LugarExpedicion': '45079',
});

cfdi.cer = './tests/resources/aaa010101aaa_FIEL.cer.pem'
cfdi.key = './tests/resources/Claveprivada_FIEL_AAA010101AAA_20170515_120909.key.pem'

cfdi.add(new CfdiRelacionado({
  'UUID': 'A39DA66B-52CA-49E3-879B-5C05185B0EF7'
}, {
  'TipoRelacion': '01'
}))

cfdi.add(new CfdiRelacionado({
  'UUID': 'A39DA66B-52CA-49E3-879B-5C05185B0EF7'
}, {
  'TipoRelacion': '01'
}))

cfdi.add(new Emisor({
  'Rfc': 'AUAC920422D38',
  'Nombre': 'CESAR RENE AGUILERA ARREOLA',
  'RegimenFiscal': '601'
}))

cfdi.add(new Receptor({
  'Rfc': 'HEPR930322977',
  'Nombre': 'RAFAEL ALEJANDRO HERNÁNDEZ PALACIOS',
  'ResidenciaFiscal': 'MEX',
  'NumRegIdTrib': '0000000000000',
  'UsoCFDI': 'G01'
}))

cfdi.add(new Concepto({
  'ClaveProdServ': '01010101',
  'ClaveUnidad': 'F52',
  'NoIdentificacion': '00001',
  'Cantidad': '1.5',
  'Unidad': 'TONELADA',
  'Descripcion': 'ACERO',
  'ValorUnitario': '1500000',
  'Importe': '2250000'
}))

const concepto = new Concepto({
  'ClaveProdServ': '01010101',
  'ClaveUnidad': 'F52',
  'NoIdentificacion': '00001',
  'Cantidad': '1.5',
  'Unidad': 'TONELADA',
  'Descripcion': 'ACERO',
  'ValorUnitario': '1500000',
  'Importe': '2250000'
})

concepto.add(new Traslado({
  'Base': '17000',
  'Impuesto': '001',
  'TipoFactor': 'Tasa',
  'TasaOCuota': '0.530000',
  'Importe': '2720'
}))

concepto.add(new Retencion({
  'Impuesto': '001',
  'Importe': '2720'
}))

concepto.add(new CuentaPredial({
  'Numero': 'AA0017'
}))

concepto.add(new InformacionAduanera({
  'NumeroPedimento': '1000-0000-123123-00'
}))

cfdi.add(concepto)

cfdi.add(new Retencion({
  'Impuesto': '001',
  'Importe': '2720'
}, {}, {
  'TotalImpuestosRetenidos': '100.50'
}))


cfdi.add(new Traslado({
  'Base': '17000',
  'Impuesto': '001',
  'TipoFactor': 'Tasa',
  'TasaOCuota': '0.530000',
  'Importe': '2720'
}, {}, {
  'TotalImpuestosTrasladados': '100.50'
}))

console.log(cfdi.getXml())

cfdi.getCadenaOriginal()
.then(data => {
  console.log('OK' + data)
})
.catch(err => {
  console.log('ERR' + err)
})

```