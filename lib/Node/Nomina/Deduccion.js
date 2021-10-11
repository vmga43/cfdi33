'use strict'

const Node = require('../Node');

class NominaDeduccion extends Node {

  /**
   *
   * @returns {string}
   */
  get nodeName () {
    return 'nomina12:Deduccion';
  }



    /**
   *
   * @returns {string}
   */
     get parentNodeName () {
      return 'nomina12:Deducciones'
    }

  /**
   *
   * @returns {boolean}
   */
  get multiple () {
    return true;
  }
}

module.exports = NominaDeduccion
