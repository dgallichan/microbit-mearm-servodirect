input.onButtonPressed(Button.A, function () {
    servoGrip += 5
    servoGrip = Math.constrain(servoGrip, 0, 90)
})
input.onButtonPressed(Button.B, function () {
    servoGrip += -5
    servoGrip = Math.constrain(servoGrip, 0, 90)
})
let servoGrip = 0
basic.showLeds(`
    # # . . .
    . . # # #
    # # . . #
    . . . . #
    . . . . #
    `)
servoGrip = 45
basic.forever(function () {
    pins.servoWritePin(AnalogPin.P16, servoGrip)
    basic.pause(100)
})
