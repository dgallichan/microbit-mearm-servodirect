input.onButtonPressed(Button.A, function () {
    servoGrip += 5
    servoGrip = Math.constrain(servoGrip, 90, 180)
})
input.onButtonPressed(Button.B, function () {
    servoGrip += -5
    servoGrip = Math.constrain(servoGrip, 90, 180)
})
let servoGrip = 0
basic.showLeds(`
    # # . . .
    . . # # #
    # # . . #
    . . . . #
    . . . . #
    `)
servoGrip = 135
basic.forever(function () {
    pins.servoWritePin(AnalogPin.P16, servoGrip)
    basic.pause(100)
})
