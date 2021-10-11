'use strict'

const Node = require('../Node');

class Nomina extends Node {


  /**
   *
   * @returns {string}
   */
  get nodeName () {
    return 'nomina12:Nomina';
  }

   /**
   *
   * @returns {string}
   */
    get parentNodeName () {
      return 'cfdi:Complemento';
    }


}

module.exports = Nomina
