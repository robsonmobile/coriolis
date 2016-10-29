import * as ModuleUtils from './ModuleUtils';
import * as _ from 'lodash';

/**
 * Module - active module in a ship's buildout
 */
export default class Module {

  /**
   * Construct a new module
   * @param {Object} params   Module parameters.  Either grp/id or template
   */
  constructor(params) {
    let properties = Object.assign({ grp: null, id: null, template: null }, params);

    let template;
    if (properties.template == undefined) {
      return ModuleUtils.findModule(properties.grp, properties.id);
    } else {
      template = properties.template;
      if (template) {
        // Copy all properties from coriolis-data template
        for (let p in template) { this[p] = template[p]; }
      }
    }
    this.mods = {};
  }

  /**
   * Get a value for a given modification
   * @param {Number} name  The name of the modification
   * @return {Number}      The value of the modification, as a decimal value from -1 to 1
   */
  getModValue(name) {
    return this.mods ? this.mods[name] / 10000 : null;
  }

  /**
   * Set a value for a given modification ID
   * @param {Number} name   The name of the modification
   * @param {Number} value  The value of the modification, as a decimal value from -1 to 1
   */
  setModValue(name, value) {
    if (value == null || value == 0) {
      delete this.mods[name];
    } else {
      // Store value with 2dp
      this.mods[name] = Math.round(value * 10000);
    }
  }

  /**
   * Helper to obtain a modified value using standard multipliers
   * @param {String}  name the name of the modifier to obtain
   * @return {Number} the mass of this module
   */
  _getModifiedValue(name) {
    let result = 0;
    if (this[name]) {
      result = this[name];
      if (result) {
        let mult = this.getModValue(name);
        if (mult) { result = result * (1 + mult); }
      }
    }
    return result;
  }
  /**
   * Get the power generation of this module, taking in to account modifications
   * @return {Number} the power generation of this module
   */
  getPowerGeneration() {
    return this._getModifiedValue('pGen');
  }

  /**
   * Get the power usage of this module, taking in to account modifications
   * @return {Number} the power usage of this module
   */
  getPowerUsage() {
    return this._getModifiedValue('power');
  }

  /**
   * Get the integrity of this module, taking in to account modifications
   * @return {Number} the integrity of this module
   */
  getIntegrity() {
    return this._getModifiedValue('integrity');
  }

  /**
   * Get the mass of this module, taking in to account modifications
   * @return {Number} the mass of this module
   */
  getMass() {
    return this._getModifiedValue('mass');
  }

  /**
   * Get the thermal efficiency of this module, taking in to account modifications
   * @return {Number} the thermal efficiency of this module
   */
  getThermalEfficiency() {
    return this._getModifiedValue('eff');
  }

  /**
   * Get the maximum mass of this module, taking in to account modifications
   * @return {Number} the maximum mass of this module
   */
  getMaxMass() {
    return this._getModifiedValue('maxmass');
  }

  /**
   * Get the optimal mass of this module, taking in to account modifications
   * @return {Number} the optimal mass of this module
   */
  getOptimalMass() {
    return this._getModifiedValue('optmass');
  }

  /**
   * Get the optimal multiplier of this module, taking in to account modifications
   * @return {Number} the optimal multiplier of this module
   */
  getOptimalMultiplier() {
    return this._getModifiedValue('optmult');
  }

  /**
   * Get the damage per second for this module, taking in to account modifications
   * @return {Number} the damage per second of this module
   */
  getDamagePerSecond() {
    return this._getModifiedValue('dps');
  }

  /**
   * Get the energy per second for this module, taking in to account modifications
   * @return {Number} the energy per second of this module
   */
  getEnergyPerSecond() {
    return this._getModifiedValue('eps');
  }

  /**
   * Get the heat per second for this module, taking in to account modifications
   * @return {Number} the heat per second of this module
   */
  getHeatPerSecond() {
    return this._getModifiedValue('hps');
  }

  /**
   * Get the maximum fuel per jump for this module, taking in to account modifications
   * @return {Number} the maximum fuel per jump of this module
   */
  getMaxFuelPerJump() {
    return this._getModifiedValue('maxfuel');
  }

  /**
   * Get the systems capacity for this module, taking in to account modifications
   * @return {Number} the systems capacity of this module
   */
  getSystemsCapacity() {
    return this._getModifiedValue('syscap');
  }

  /**
   * Get the engines capacity for this module, taking in to account modifications
   * @return {Number} the engines capacity of this module
   */
  getEnginesCapacity() {
    return this._getModifiedValue('engcap');
  }

  /**
   * Get the weapons capacity for this module, taking in to account modifications
   * @return {Number} the weapons capacity of this module
   */
  getWeaponsCapacity() {
    return this._getModifiedValue('wepcap');
  }

  /**
   * Get the systems recharge rate for this module, taking in to account modifications
   * @return {Number} the systems recharge rate of this module
   */
  getSystemsRechargeRate() {
    return this._getModifiedValue('sysrate');
  }

  /**
   * Get the engines recharge rate for this module, taking in to account modifications
   * @return {Number} the engines recharge rate of this module
   */
  getEnginesRechargeRate() {
    return this._getModifiedValue('engrate');
  }

  /**
   * Get the weapons recharge rate for this module, taking in to account modifications
   * @return {Number} the weapons recharge rate of this module
   */
  getWeaponsRechargeRate() {
    return this._getModifiedValue('weprate');
  }

  /**
   * Get the kinetic resistance for this module, taking in to account modifications
   * @return {Number} the kinetic resistance of this module
   */
  getKineticResistance() {
    return this._getModifiedValue('kinres');
  }

  /**
   * Get the thermal resistance for this module, taking in to account modifications
   * @return {Number} the thermal resistance of this module
   */
  getThermalResistance() {
    return this._getModifiedValue('thermres');
  }

  /**
   * Get the explosive resistance for this module, taking in to account modifications
   * @return {Number} the explosive resistance of this module
   */
  getExplosiveResistance() {
    return this._getModifiedValue('explres');
  }

  /**
   * Get the regeneration rate for this module, taking in to account modifications
   * @return {Number} the regeneration rate of this module
   */
  getRegenerationRate() {
    return this._getModifiedValue('regen');
  }

  /**
   * Get the broken regeneration rate for this module, taking in to account modifications
   * @return {Number} the broken regeneration rate of this module
   */
  getBrokenRegenerationRate() {
    return this._getModifiedValue('brokenregen');
  }

  /**
   * Get the range rate for this module, taking in to account modifications
   * @return {Number} the range rate of this module
   */
  getRange() {
    return this._getModifiedValue('range');
  }

  /**
   * Get the capture arc for this module, taking in to account modifications
   * @return {Number} the capture arc of this module
   */
  getCaptureArc() {
    return this._getModifiedValue('arc');
  }

  /**
   * Get the armour for this module, taking in to account modifications
   * @return {Number} the armour of this module
   */
  getArmour() {
    return this._getModifiedValue('armour');
  }

  /**
   * Get the delay for this module, taking in to account modifications
   * @return {Number} the delay of this module
   */
  getDelay() {
    return this._getModifiedValue('delay');
  }

  /**
   * Get the duration for this module, taking in to account modifications
   * @return {Number} the duration of this module
   */
  getDuration() {
    return this._getModifiedValue('duration');
  }

  /**
   * Get the shield reinforcement for this module, taking in to account modifications
   * @return {Number} the shield reinforcement of this module
   */
  getShieldReinforcement() {
    return this._getModifiedValue('shieldreinforcement');
  }
}