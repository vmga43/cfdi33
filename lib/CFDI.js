'use strict'

const Node = require('./Node/Node')
const FileSystem = require('./Utils/FileSystem')
const xsltproc = require('xsltproc')
const JXON = require('jxon')
const fs = require('fs')
const crypto = require('crypto')

class CFDI extends Node{
  /**
   *
   * @returns {*}
   */
  getXml () {
    return this._makeXml()
  }

	/**
	 *
	 * @returns {*}
	 * @private
	 */
	async _makeXml () {
		this.makeAllNodes()
		this.nodes.forEach(node => {
			node.makeAllNodes()
		})

		const Cfdi = JXON.unbuild(this.getAttributes(), null, this.nodeName);
		let xmlString =  JXON.xmlToString(Cfdi)
		xmlString = xmlString.replace(' xmlns:cfdi=""', '')
		let xmlObject = JXON.stringToXml(xmlString)
		let jsObject = JXON.xmlToJs(xmlObject)
		
		if (!this.withOutCerts) {
			xmlObject = JXON.jsToXml(jsObject)
			xmlString = JXON.xmlToString(xmlObject);
			xmlString = `<?xml version="1.0" encoding="UTF-8"?>${xmlString}`
			let cadenaOriginal = await this.getCadenaOriginal(xmlString)
			let sello = await this.getSello(cadenaOriginal)
			jsObject['cfdi:Comprobante']['$Sello'] = sello
			xmlObject = JXON.jsToXml(jsObject)
			xmlString = JXON.xmlToString(xmlObject);
			xmlString = `<?xml version="1.0" encoding="UTF-8"?>${xmlString}`
			return xmlString
		}
	}

	xmlObject = JXON.jsToXml(jsObject)
	xmlString = JXON.xmlToString(xmlObject);
	xmlString = `<?xml version="1.0" encoding="UTF-8"?>${xmlString}`

    return Promise.resolve(xmlString)
  }

  /**
   *
   * @returns {{xmlns:cfdi: string}}
   */
  getDefaultAttributes () {
    let attr = {
      '$xmlns:cfdi': 'http://www.sat.gob.mx/cfd/3',
			'$xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance',
			'$xsi:schemaLocation' : 'http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd',      
      '$Version': CFDI.version
    }

    if (!this.withOutCerts) {
      attr['$Certificado'] = this.getCertificado()
    }

    return attr
  }

  /**
   *
   * @returns {Promise}
   */
  getCadenaOriginal () {
    return new Promise ((resolve, reject) => {
      FileSystem.manageDirectoryTemp('create')
      const fullPath = `./tmp/${FileSystem.generateNameTemp()}.xml`
	  this._makeXml(true)
	  .then(xml => {
		fs.writeFile(fullPath, xml, 'utf8', (err) => {
		  if(err) {
			return reject(err)
		  }

		  const xslt = xsltproc.transform('./resources/cadenaoriginal_3_3.xslt', fullPath)

		  xslt.stdout.on('data', (data) => {
			FileSystem.manageDirectoryTemp('delete')
			resolve(data);
		  })

		  xslt.stderr.on('data', (data) => {
			FileSystem.manageDirectoryTemp('delete')
			reject(data)
		  })

		  xslt.on('exit', (code) => {
			reject(code)
		  })
		})
	  })
    })
  }

  /**
   *
   * @param cadenaOriginal
   * @returns {Promise<any>}
   */
  getSello (cadenaOriginal) {
    return new Promise((resolve, reject) => {
      try {
		const pem = fs.readFileSync(this.key)
		const key = pem.toString('ascii')
		const sign = crypto.createSign('RSA-SHA256')
		sign.update(cadenaOriginal.toString('utf8'))

		return resolve(sign.sign(key, 'base64'))
	  } catch (err) {
        return reject(err)
	  }
	});
  }

  /**
   *
   * @returns {*}
   */
  getCertificado () {
    let cer = FileSystem.readFileSync(this.cer)
    cer = cer.replace(/(-+[^-]+-+)/g, '');
    cer = cer.replace(/\s+/g, '');

    return cer;
  }

  /**
   *
   * @returns {string}
   */
  static get version () {
    return '3.3'
  }

  /**
   *
   * @returns {string}
   */
  get nodeName () {
    return 'cfdi:Comprobante'
  }

  /**
   *
   * @param value
   */
  set withOutCerts (value) {
    this._withOutCerts = value
  }

  /**
   *
   * @param value
   */
  set cer (value) {
    this._cer = value
  }

  /**
   *
   * @param value
   */
  set key (value) {
    this._key = value
  }

  /**
   *
   * @returns {*}
   */
  get cer () {
    return this._cer
  }

  /**
   *
   * @returns {*}
   */
  get key () {
    return this._key
  }

  /**
   *
   * @returns {*}
   */
  get withOutCerts () {
    return this._withOutCerts || false
  }
}

module.exports = CFDI