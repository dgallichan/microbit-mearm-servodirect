input.onButtonPressed(Button.AB, function () {
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
    isIdle = !(isIdle)
    if (isIdle) {
        basic.showIcon(IconNames.Ghost)
    } else {
        basic.showLeds(`
            # # . . .
            . . # # #
            # # . . #
            . . . . #
            . . . . #
            `)
    }
})
radio.onReceivedValue(function (name, value) {
    if (!(isIdle)) {
        if (name == "goBase") {
            speedBase = Math.map(value, -90, 90, -2, 2)
        } else if (name == "goLeft") {
            speedLeft = Math.map(value, -90, 90, -2, 2)
        } else if (name == "goRight") {
            speedRight = Math.map(value, -90, 90, -2, 2)
        } else if (name == "goGrip") {
            speedGrip = Math.map(value, -90, 90, -2, 2)
        }
    }
})
let thisVal = 0
let currentSmooth = 0
let smoothFactor = 0
let servoGrip_target = 0
let servoRight_target = 0
let servoLeft_target = 0
let servoBase_target = 0
let isIdle = false
let speedBase = 0
let speedLeft = 0
let speedRight = 0
let speedGrip = 0
speedGrip = 0
speedRight = 0
speedLeft = 0
speedBase = 0
radio.setGroup(250)
isIdle = false
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
smoothFactor = 0.5
basic.forever(function () {
    if (!(isIdle)) {
        servoBase_target = Math.constrain(servoBase_target, 45, 135)
        servoLeft_target = Math.constrain(servoLeft_target, 50, 160)
        servoRight_target = Math.constrain(servoRight_target, 45, 160)
        servoGrip_target = Math.constrain(servoGrip_target, 90, 180)
        servoBase = smoothFactor * servoBase + (1 - smoothFactor) * servoBase_target
        servoLeft = smoothFactor * servoLeft + (1 - smoothFactor) * servoLeft_target
        servoRight = smoothFactor * servoRight + (1 - smoothFactor) * servoRight_target
        servoGrip = smoothFactor * servoGrip + (1 - smoothFactor) * servoGrip_target
        pins.servoWritePin(AnalogPin.P13, servoBase)
        pins.servoWritePin(AnalogPin.P14, servoLeft)
        pins.servoWritePin(AnalogPin.P15, servoRight)
        pins.servoWritePin(AnalogPin.P16, servoGrip)
    }
})
basic.forever(function () {
    if (!(isIdle)) {
        if (input.buttonIsPressed(Button.A)) {
            thisVal = (pins.analogReadPin(AnalogPin.P0) - 507) / 512
            speedBase = 2 * thisVal
            thisVal = (pins.analogReadPin(AnalogPin.P1) - 507) / 512
            speedLeft = 2 * thisVal
            thisVal = (pins.analogReadPin(AnalogPin.P2) - 507) / 512
            speedRight = 2 * thisVal
            speedGrip = 0
        } else if (input.buttonIsPressed(Button.B)) {
            thisVal = (pins.analogReadPin(AnalogPin.P0) - 507) / 512
            speedGrip = 2 * thisVal
            speedBase = 0
            speedLeft = 0
            speedRight = 0
        } else {
        	
        }
        servoBase_target = servoBase_target - speedBase
        servoLeft_target = servoLeft_target + speedLeft
        servoRight_target = servoRight_target + speedRight
        servoGrip_target = servoGrip_target + speedGrip
    }
})
