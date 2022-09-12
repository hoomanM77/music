////////////////////Variables//////////////////////////////////////
const $=document
const playIcon=_q('.bi-play-circle-fill')
const changeState=_id('change_state')
const backwardIcon=_q('.backward_icon')
const forwardIcon=_q('.forward_icon')
const audioTag=_q('audio')
const showImageTag=_q('.show_img')
const musicCurrentTimeTag=_q('.music-current-time')
const musicDuration=_q('.music-duration')
const musicDetailName=_q('.music-detail-name')
const musicProgressTag=_q('.music-progress')
const progressionTag=_id('progression')
let musicSinger=_q('.music-detail-singer')
let audioSrcArray=['media/1.mp3','media/2.mp3','media/3.mp3']
let imgSrcArray=['images/1.jpg','images/2.jpg','images/3.jpg']
let audioNamesArray=['Aerobic1','Aerobic2','Aerobic3']
let singerNameArray=['artist 1','artist 2','artist 3']
let width=1
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)

}
////////////////////////// timeDurationCalculator calculates the duration of audio ////////////////////////
function timeDurationCalculator() {
    setTimeout(function () {
        let firstTwoDigits=Math.floor(audioTag.duration/60)
        let secondDigits=Math.floor(audioTag.duration%60)
        if(firstTwoDigits<10){
            if(secondDigits<10){
                musicDuration.innerHTML=`0${firstTwoDigits}:0${secondDigits}`
            }else{
                musicDuration.innerHTML=`0${firstTwoDigits}:${secondDigits}`
            }
        }else{
            if(secondDigits<10){
                musicDuration.innerHTML=`${firstTwoDigits}:0${secondDigits}`
            }else{
                musicDuration.innerHTML=`${firstTwoDigits}:${secondDigits}`
            }
        }
    },1000)
}
///////////////////////////////// setInterValHandler calculate the current time of audio /////////////////////////////
function setInterValHandler() {
    let timer=setInterval(function () {
            let currentMinute=Math.floor(audioTag.currentTime/60)
            let currentSecond=Math.floor(audioTag.currentTime%60)
            if (changeState.classList.contains('bi-play-circle-fill')){
                clearInterval(timer)
            }
            let firstTwoDigits=Math.floor(audioTag.duration/60)
            let secondDigits=Math.floor(audioTag.duration%60)
            if(currentMinute===firstTwoDigits && currentSecond===secondDigits){
                clearInterval(timer)
            }
            if(currentSecond<10){
                musicCurrentTimeTag.innerHTML=`0${currentMinute}:0${currentSecond}`
            }
            if(currentSecond >=10){
                musicCurrentTimeTag.innerHTML=`0${currentMinute}:${currentSecond}`
            }
            if(currentSecond===59){
                currentSecond=0
                currentMinute++
                musicCurrentTimeTag.innerHTML=`0${currentMinute}:0${currentSecond}`
            }
            if(currentMinute>=10){
                musicCurrentTimeTag.innerHTML=`${currentMinute}:0${currentSecond}`
                if(currentSecond>=10){
                    musicCurrentTimeTag.innerHTML=`${currentMinute}:${currentSecond}`
                }
                if(currentSecond<10){
                    musicCurrentTimeTag.innerHTML=`${currentMinute}:0${currentSecond}`
                }
            }
            currentSecond++
    },1000)

}
////////////////////////////////// width progress handler //////////////////////
function widthHandler() {
    let timer=setInterval(function () {
        let duration=audioTag.duration
        let currentTime=audioTag.currentTime
        let progressPercent=(currentTime/duration)*100
        progressionTag.style.width=`${progressPercent}%`
        if(progressPercent===100){
            clearInterval(timer)
        }
    },1000)
}
/////////////////////////////////// fire on play icon ///////////////////////////////
playIcon.addEventListener('click',function () {
    audioTag.play()
    musicCurrentTimeTag.style.display='block'
    musicDuration.style.display='block'
    setInterValHandler()
    widthHandler()
    timeDurationCalculator()
    if(playIcon.classList.contains('bi-play-circle-fill')){
        playIcon.classList.remove('bi-play-circle-fill')
        playIcon.classList.add('bi-pause-circle-fill')
    }else{
        playIcon.classList.add('bi-play-circle-fill')
        playIcon.classList.remove('bi-pause-circle-fill')
    }
})
changeState.addEventListener('click',function () {
    if(!changeState.classList.contains('bi-pause-circle-fill')){
        timeDurationCalculator()
        audioTag.pause()
    }
})
/////////////////////////////////// fire on forward icon ///////////////////////////////
forwardIcon.addEventListener('click',function () {
    musicCurrentTimeTag.style.display='block'
    musicDuration.style.display='block'
    forwardIcon.classList.add('forward_active')
    playIcon.classList.remove('bi-play-circle-fill')
    playIcon.classList.add('bi-pause-circle-fill')
    audioTag.pause()
    let playingNowSrc=audioTag.getAttribute('src')
    let indexOfPlayingNowSrc=audioSrcArray.findIndex(function (item) {
        return item===playingNowSrc
    })
    if(indexOfPlayingNowSrc===2){
        indexOfPlayingNowSrc=-1
    }
    audioTag.setAttribute('src',audioSrcArray[indexOfPlayingNowSrc+1])
    showImageTag.setAttribute('src',imgSrcArray[indexOfPlayingNowSrc+1])
    musicDetailName.innerHTML=audioNamesArray[indexOfPlayingNowSrc+1]
    musicSinger.innerHTML=singerNameArray[indexOfPlayingNowSrc+1]
    timeDurationCalculator()
    setInterValHandler()
    widthHandler()
    audioTag.play()
    setTimeout(function () {
        forwardIcon.classList.remove('forward_active')
    },1000)

})
/////////////////////////////////// fire on backward icon ///////////////////////////////
backwardIcon.addEventListener('click',function () {
    musicCurrentTimeTag.style.display='block'
    musicDuration.style.display='block'
    backwardIcon.classList.add('backward_active')
    playIcon.classList.remove('bi-play-circle-fill')
    playIcon.classList.add('bi-pause-circle-fill')
    audioTag.pause()
    let playingNowSrc=audioTag.getAttribute('src')
    let indexOfPlayingNowSrc=audioSrcArray.findIndex(function (item) {
        return item===playingNowSrc
    })
    if(indexOfPlayingNowSrc===0){
        indexOfPlayingNowSrc=3
    }
    audioTag.setAttribute('src',audioSrcArray[indexOfPlayingNowSrc-1])
    showImageTag.setAttribute('src',imgSrcArray[indexOfPlayingNowSrc-1])
    musicDetailName.innerHTML=audioNamesArray[indexOfPlayingNowSrc-1]
    musicSinger.innerHTML=singerNameArray[indexOfPlayingNowSrc-1]
    timeDurationCalculator()
    setInterValHandler()
    widthHandler()
    audioTag.play()
    setTimeout(function () {
        backwardIcon.classList.remove('backward_active')
    },1000)

})
/////////////////////////// fire on music progress div /////////////////////////////
musicProgressTag.addEventListener('click',function (event) {
    let clientWidth=this.clientWidth
    let offsetX=event.offsetX
    let moveToCurrent=((offsetX/clientWidth))*(audioTag.duration)
    console.log(moveToCurrent)
    progressionTag.style.width=`${offsetX}px`
    audioTag.currentTime=moveToCurrent
})


