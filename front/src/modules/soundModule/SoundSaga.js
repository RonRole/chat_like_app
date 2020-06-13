
const bgm = new Audio(`${process.env.PUBLIC_URL}/Nomad.mp3`)
bgm.loop = true

export function* playBGM() {
    // yield bgm.play().catch(err => {
    //     console.log(err)
    // })
}

export function* pauseBGM() {
    bgm.currentTime = 0.0
    yield bgm.pause()
}

export function* playAddMessageSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/add_message.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playReceiveMessageSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/receive_message.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}