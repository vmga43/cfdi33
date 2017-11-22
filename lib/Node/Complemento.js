'use strict'

const Node = require('./Node')

class Complemento extends Node {
  /**
   *
   * @returns {string}
   */
  get nodeName () {
    return 'cfdi:Complemento'
  }
}

module.exports = Complemento