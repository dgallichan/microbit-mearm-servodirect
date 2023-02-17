input.onButtonPressed(Button.A, function () {
    servoRight_target += 5
})
input.onButtonPressed(Button.B, function () {
    servoRight_target += -5
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    servoBase_target = 90
    servoLeft_target = 90
    servoRight_target = 90
    servoGrip_target = 135
})
let servoGrip = 0
let servoRight = 0
let servoLeft = 0
let servoBase = 0
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
basic.forever(function () {
    servoBase_target = Math.constrain(servoBase_target, 0, 180)
    servoLeft_target = Math.constrain(servoLeft_target, 15, 165)
    servoRight_target = Math.constrain(servoRight_target, 0, 180)
    servoGrip_target = Math.constrain(servoGrip_target, 90, 180)
    servoBase = 0.95 * servoBase + 0.05 * servoBase_target
    servoLeft = 0.95 * servoLeft + 0.05 * servoLeft_target
    servoRight = 0.95 * servoRight + 0.05 * servoRight_target
    servoGrip = 0.95 * servoGrip + 0.05 * servoGrip_target
    pins.servoWritePin(AnalogPin.P13, servoBase_target)
    pins.servoWritePin(AnalogPin.P14, servoLeft_target)
    pins.servoWritePin(AnalogPin.P15, servoRight_target)
    pins.servoWritePin(AnalogPin.P16, servoGrip_target)
    basic.pause(100)
})
