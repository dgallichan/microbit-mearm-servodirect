input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showLeds(`
        # # # # #
        # . . . #
        # . # . #
        # . . . #
        # # # # #
        `)
    currentSmooth = smoothFactor
    smoothFactor = 0.9
    servoBase_target = 90
    servoLeft_target = 90
    servoRight_target = 90
    servoGrip_target = 135
    basic.pause(2000)
    smoothFactor = currentSmooth
    basic.showLeds(`
        # # . . .
        . . # # #
        # # . . #
        . . . . #
        . . . . #
        `)
})
let thisVal = 0
let currentSmooth = 0
let smoothFactor = 0
let servoGrip_target = 0
let servoRight_target = 0
let servoLeft_target = 0
let servoBase_target = 0
basic.showLeds(`
    # # . . .
    . . # # #
    # # . . #
    . . . . #
    . . . . #
    `)
servoBase_target = 90
servoLeft_target = 90
servoRight_target = 90
servoGrip_target = 135
let servoBase = 90
let servoLeft = 90
let servoRight = 90
let servoGrip = 135
smoothFactor = 0.2
basic.forever(function () {
    servoBase_target = Math.constrain(servoBase_target, 0, 180)
    servoLeft_target = Math.constrain(servoLeft_target, 15, 165)
    servoRight_target = Math.constrain(servoRight_target, 0, 180)
    servoGrip_target = Math.constrain(servoGrip_target, 90, 180)
    servoBase = smoothFactor * servoBase + (1 - smoothFactor) * servoBase_target
    servoLeft = smoothFactor * servoLeft + (1 - smoothFactor) * servoLeft_target
    servoRight = smoothFactor * servoRight + (1 - smoothFactor) * servoRight_target
    servoGrip = smoothFactor * servoGrip + (1 - smoothFactor) * servoGrip_target
    if (Math.abs(servoBase - servoBase_target) > 3) {
        pins.servoWritePin(AnalogPin.P13, servoBase)
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
    }
    if (Math.abs(servoLeft - servoLeft_target) > 3) {
        pins.servoWritePin(AnalogPin.P14, servoLeft)
    } else {
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    if (Math.abs(servoRight - servoRight_target) > 3) {
        pins.servoWritePin(AnalogPin.P15, servoRight)
    } else {
        pins.digitalWritePin(DigitalPin.P15, 0)
    }
    if (Math.abs(servoGrip - servoGrip_target) > 3) {
        pins.servoWritePin(AnalogPin.P16, servoGrip)
    } else {
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
})
basic.forever(function () {
    thisVal = (pins.analogReadPin(AnalogPin.P0) - 507) / 1024
    if (Math.abs(thisVal) > 0.1) {
        servoBase_target = servoBase_target + 1 * thisVal
    }
    thisVal = (pins.analogReadPin(AnalogPin.P1) - 507) / 1024
    if (Math.abs(thisVal) > 0.1) {
        servoRight_target = servoRight_target + 1 * thisVal
        servoLeft_target = servoLeft_target + 1 * thisVal
    }
    thisVal = (pins.analogReadPin(AnalogPin.P2) - 507) / 1024
    if (Math.abs(thisVal) > 0.1) {
        servoGrip_target = servoGrip_target + 1 * thisVal
    }
    serial.writeValue("x.val", servoBase)
    serial.writeValue("x.target", servoBase_target)
})
