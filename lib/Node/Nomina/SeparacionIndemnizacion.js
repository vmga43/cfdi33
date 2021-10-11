'use strict'

const Node = require('../Node');

class NominaPercepcion extends Node {

  /**
   *
   * @returns {string}
   */
  get nodeName () {
    return 'nomina12:SeparacionIndemnizacion';
  }

  /**
   *
   * @returns {string}
   */
  get parentNodeName () {
    return 'nomina12:Percepciones';
  }


  /**
   *
   * @returns {boolean}
   */
  get multiple () {
    return true;
  }
}

module.exports = NominaPercepcion
