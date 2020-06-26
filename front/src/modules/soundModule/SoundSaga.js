
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

export function* playAddMessageSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/add_message.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playReceiveMessageSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/receive_message.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playJoinRoomSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/入店するときのベル.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playLeaveRoomSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/se_maoudamashii_chime08.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}