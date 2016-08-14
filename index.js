'use stric';

module.exports = {
  /**
   * The run method is the start point of the extension.
   * @param {Object}      params            The extension parameters.
   * @param {Array}       params.modules    The module instances.
   * @param {DustSensor}  params.modules[0] The DustSensor module instance.
   * @param {Servo}       params.modules[1] The Servo module instance.
   * @param {RgbLed}      params.modules[2] The RgbLed module instance.
   */
  run: function(params) {
    var ds = params.modules[0];
    var servo = params.modules[1];
    var led = params.modules[2];

    ds.on('data', function(data) {
      servo.rotate(2 * data.pm25);
      led.on(pm25toColor(data.pm25));
    });
  }
}

function pm25toColor(pm25) {
  var color = '#FFFFFF';
  // Low level.
  if (pm25 >= 0 && pm25 <= 11) {
    color = '#9CFF9C';
  } else if (pm25 >= 12 && pm25 <= 23) {
    color = '#31FF00';
  } else if (pm25 >= 24 && pm25 <= 35) {
    color = '#31CF00';
  // Moderate level.
  } else if (pm25 >= 36 && pm25 <= 41) {
    color = '#FFFF00';
  } else if (pm25 >= 42 && pm25 <= 47) {
    color = '#FFCF00';
  } else if (pm25 >= 48 && pm25 <= 53) {
    color = '#FF9A00';
  // High level.
  } else if (pm25 >= 54 && pm25 <= 58) {
    color = '#FF6464';
  } else if (pm25 >= 59 && pm25 <= 64) {
    color = '#FF0000';
  } else if (pm25 >= 65 && pm25 <= 70) {
    color = '#990000';
  // Very high level.
  } else {
    color = '#CE30FF';
  }
  return color;
}
