function 장애물_회피 () {
    if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        X = huskylens.readeBox(1, Content1.xCenter) - 160
        따라가기()
    }
}
function 범죄자_추적 () {
    huskylens.request()
    if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        X = huskylens.readeBox(1, Content1.xCenter) - 160
        따라가기()
    }
}
function 태그인식 () {
    for (let index = 0; index < 5; index++) {
        huskylens.request()
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                속도 = 20
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
                break;
            } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
                break;
            } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                모드 = 1
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
                break;
            }
        }
        basic.pause(200)
    }
    모드 = 0
}
input.onButtonPressed(Button.A, function () {
    모드 = 1
})
function 라인_트레킹 () {
    huskylens.request()
    if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        X = huskylens.readeArrow(1, Content2.xOrigin)
        X = X - huskylens.readeArrow(1, Content2.xTarget)
        따라가기()
    }
}
input.onButtonPressed(Button.AB, function () {
    모드 = 3
})
input.onButtonPressed(Button.B, function () {
    모드 = 2
})
function 따라가기 () {
    if (-20 < X && X < 20) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 속도)
    } else if (-20 >= X) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 속도 / 2)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 속도 / 2)
    } else {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 속도 / 2)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 속도 / 2)
    }
    basic.pause(100)
}
let 과거_모드 = 0
let 기능_초기화_카운터 = 0
let 속도 = 0
let X = 0
let 모드 = 0
모드 = 0
maqueen.motorStop(maqueen.Motors.All)
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
huskylens.saveModelToTFCard(HUSKYLENSMode.LOAD, 0)
loops.everyInterval(1000, function () {
    if (!(huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) && 기능_초기화_카운터 == 5) {
        모드 = 0
        기능_초기화_카운터 = 0
    } else if (!(huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock))) {
        기능_초기화_카운터 += 1
    }
})
basic.forever(function () {
    if (과거_모드 != 모드) {
        huskylens.saveModelToTFCard(HUSKYLENSMode.LOAD, 모드)
        if (모드 == 0) {
            huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
        } else if (모드 == 1) {
            huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        } else if (모드 == 2) {
            huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
        } else {
            huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
        }
    } else {
        과거_모드 = 모드
    }
    if (모드 == 0) {
        라인_트레킹()
    } else if (모드 == 1) {
        장애물_회피()
    } else if (모드 == 2) {
        범죄자_추적()
    } else {
        태그인식()
        basic.pause(1000)
    }
    basic.pause(100)
})
