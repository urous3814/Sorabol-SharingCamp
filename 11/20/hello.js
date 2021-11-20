function 태그인식 () {
    while (인식 == 0) {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
        huskylens.request()
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            인식 = huskylens.readBox_s(Content3.ID)
            if (인식 == 0) {
                continue;
            }
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            basic.showNumber(ㅇㅇㅇ[인식])
            얼굴인식()
        }
        basic.pause(500)
    }
}
function 얼굴인식 () {
    basic.pause(2000)
    while (얼굴 == 0) {
        if (인식 == 0) {
            태그인식()
            break;
        }
        huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
        huskylens.request()
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            얼굴 = huskylens.readBox_s(Content3.ID)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            if (얼굴 == 인식) {
                basic.showIcon(IconNames.No)
                스위치 = 1
            } else {
                스위치 = 1
            }
        }
        basic.pause(500)
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
basic.forever(function () {
    인식 = 0
    얼굴 = 0
    스위치 = 0
    태그인식()
    while (스위치 == 0) {
        basic.pause(500)
    }
    basic.pause(5000)
})
