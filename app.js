// This is the main app.js. We're using the cylon library here. One nice thing
// about the cylon library is that you can talk to various device types such as
// Edison, Beaglebone, RasPi, etc. without using device specific language.

var Cylon = require('cylon');
//include node.js packages here if you want (see npmjs.org for packages)

Cylon.robot({
    connections: {
        edison: { adaptor: 'intel-iot' }
    },

    //in this section you list all of the sensors, lights, etc. that you will use
    devices: {
        // pin: { driver: 'direct-pin', pin: 2 },
        // led: { driver: 'led', pin: 13 },
        led: { driver: 'led', pin: 4 },
        touch: { driver: 'button', pin: 3 },
        // analogSensor: { driver: 'analogSensor', pin: 0 },
        lightSensor: { driver: 'analogSensor', pin: 0 },
        buzzer: { driver: 'direct-pin', pin: 2}
    },

    // this is where you write the main part of your app
    work: function (my) {

        /* working with a direct pin */
        //var digitalValue = my.pin.digitalRead(); //read digital (high/low) value
        //my.pin.digitalWrite(1); //set a digital pin high
        //my.pin.digitalWrite(0); //set a digital pin low
        //var analogValue = my.pin.analogRead(); //read analog value
        //my.pin.analogWrite(567); //write an analog value

        /* toggle the LED every second */
        // every((1).second(), function () {
        //    my.led.toggle();
        // });
        // console.log(JSON.stringify(my.buzzer.analog_write));

        my.lightSensor.on('analogRead', function(val) {
          var brightness = val.fromScale(0, 1024).toScale(0, 1) | 0;
          console.log('brightness => ', brightness);
          // my.led.brightness(brightness)
          // my.led.brightness(brightness);
        });

        my.touch.on('press', function() {
          my.led.turnOn();
          // my.buzzer.analogWrite(10);
          my.buzzer.digitalWrite(1);
        });

        my.touch.on('release', function() {
          my.led.turnOff();
          // my.buzzer.analogWrite(0);
          my.buzzer.digitalWrite(0);
        });




        /* analog input (temperature sensors, light sensors, etc.)
         * the analogSensor has some advantages over a direct-pin like limits
         */
        //console.log('sensor value: ' + my.analogSensor.analogRead());

    }
}).start();
