
const bgm = new Audio(`${process.env.PUBLIC_URL}/Nomad.mp3`)
bgm.loop = true

export function* playBGM() {
    yield bgm.play().catch(err => {
        console.log(err)
    })
}

export function* pauseBGM() {
    bgm.currentTime = 0.0
    yield bgm.pause()
}