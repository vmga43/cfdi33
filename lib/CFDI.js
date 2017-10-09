'use strict'

const Node = require('./Node/Node')
const FileSystem = require('./Utils/FileSystem')
const xsltproc = require('xsltproc')
const JXON = require('jxon')
const fs = require('fs')

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
  _makeXml () {
    this.makeAllNodes()
    this.nodes.forEach(node => {
      node.makeAllNodes()
    })

    const Cfdi = JXON.unbuild(this.getAttributes(), null, this.nodeName);
    let xmlString =  JXON.xmlToString(Cfdi)
    xmlString = `<?xml version="1.0" encoding="UTF-8"?>${xmlString}`

    return xmlString.replace(' xmlns:cfdi=""', '')
  }

  /**
   *
   * @returns {{xmlns:cfdi: string}}
   */
  getDefaultAttributes () {
    return {
      '$xmlns:cfdi': 'http://www.sat.gob.mx/cfd/3',
      '$Version': CFDI.version,
      '$Certificado': this.getCertificado()
    }
  }

  /**
   *
   * @returns {Promise}
   */
  getCadenaOriginal () {
    return new Promise ((resolve, reject) => {
      FileSystem.manageDirectoryTemp('create')
      const fullPath = `./tmp/${FileSystem.generateNameTemp()}.xml`
      fs.writeFile(fullPath, this.getXml(), 'utf8', (err) => {
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
  }

  getSello () {

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
}

module.exports = CFDI