function 태그인식 () {
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
    while (인식 == 0) {
        huskylens.request()
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            인식 = huskylens.readBox_s(Content3.ID)
            if (인식 == 0) {
                continue;
            }
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            basic.showNumber(ㅇㅇㅇ[인식 - 1])
            얼굴인식()
            break;
        }
        basic.pause(1000)
    }
}
function 얼굴인식 () {
    basic.pause(2000)
    huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
    huskylens.request()
    while (얼굴 == 0) {
        huskylens.request()
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            얼굴 = huskylens.readBox_s(Content3.ID)
            if (얼굴 == 인식) {
                basic.showIcon(IconNames.Square)
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
                basic.pause(1000)
                스위치 = 1
                break;
            } else {
                basic.showIcon(IconNames.No)
                basic.pause(1000)
                스위치 = 1
                break;
            }
        }
        basic.pause(1000)
    }
}
let 스위치 = 0
let 얼굴 = 0
let 인식 = 0
let ㅇㅇㅇ: number[] = []
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
ㅇㅇㅇ = [
40,
28,
33,
50,
18,
50
]
인식 = 0
얼굴 = 0
스위치 = 0
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
태그인식()
while (스위치 == 0) {
    basic.pause(500)
}
for (let index = 0; index < 5; index++) {
    if (얼굴 == 인식) {
        basic.showIcon(IconNames.Square)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        basic.pause(1000)
    } else {
        basic.showIcon(IconNames.No)
        basic.pause(1000)
    }
    basic.showNumber(ㅇㅇㅇ[인식 - 1])
    basic.pause(1000)
}
basic.pause(1000)

