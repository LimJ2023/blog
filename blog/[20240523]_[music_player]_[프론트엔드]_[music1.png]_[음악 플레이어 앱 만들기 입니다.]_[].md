
![음악1](post_img/music-app/music1.png)

![음악2](post_img/music-app/music2.png)


[실행하기](app/musicPlayerApp/index.html)



간단하지만 멋진 음악 재생 앱을 만들었다.


css에서부터 꽤 섬세하게 작업을 해야했는데

```css
@keyframes rotate {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
.container .disk .active {
    animation: rotate 10s linear 0s infinite forwards;
}
```

첫번째로 cd처럼 이미지를 돌아가게 하는 애니메이션 구현이다.

keyframes 안의 퍼센테이지를 조절하면 움직이는 모양을 더 자세히 조절할 수 있다.

rotateZ는 z축을 기준으로 회전시킨다는 뜻인데, z축은 화면상에서 나에게 쏘아지는 방향이므로
사진이 좌우로 가만히 회전하는 모양새가 나온다.

간단하게 rotateZ라고 하면 모서리를 잡고 좌우로 회전시킨다고 생각하자.


```css
.container .disk .cover {
    width: 145px;
    height: 145px;
    position: absolute;
    top: -5px;
    left: -10px;
    background: url(img/thumbnail1.png);
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgb(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
}
```

둘째로 동그란 커버 이미지를 삽입하는 방법인데

img자체를 넣지 않고 background에 url을 지정하는 방식을 사용했다.

이를 통해 얻을 수 있는 이점이 있는데

background-positiong을 통해 div 내부에서 위치 조절을 할 수 있고

z-index설정을 통해 이미지 레이어링도 가능하다.

border-radius나 box-shadow 설정도 그대로 사용 가능하다.



다음은 js이다.

```js
const songList = [
    {
        name: "별자리가 될 수 있다면",
        artist: "결속밴드",
        src: "mp3/song1.mp3",
        cover: "img/thumbnail1.png"
    },
    {
        name: "카라카라",
        artist: "결속밴드",
        src: "mp3/song2.mp3",
        cover: "img/thumbnail3.png"
    }
]

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');


let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {

    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
})

function loadSong(index) {
    const {name, artist, src, cover: thumb } = songList[index];
    artistName.textContent = artist;
    musicName.textContent = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;

}

function updateProgress() {
    if(song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.textContent = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause(){
    if(playing) {
        song.pause();
    } else {
        song.play
    }
    playing = !playing;

    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}
function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}
function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;

    song.currentTime = pos;
}
```

전문을 적고 하나씩 정리해야겠다.

우선 객체 배열을 만들어 곡 목록을 만들어준다.

DOMContentLoaded로 페이지가 로드되면 실행될 함수를 적어준다.

loadSong 함수는 객체배열을 분해하여 재구성해 각 변수에 대입해준다.

updateProgress 함수는 현재 재생중인 곡의 진행상황을 정해준다(현재 몇 초인지, 몇 퍼센트 재생인지)

formatTime 함수는 초 단위로 저장된 시간을 00:00 형식의 분,초로 바꿔주는 역할을 한다.

togglePlayPause 함수는 일시정지,재생 버튼을 눌렀을 때의 토글기능이다.
```js
playBtn.classList.toggle('fa-pause', playing);
playBtn.classList.toggle('fa-play', !playing);
```
이 코드에서 혼동이 올 수 있는데, classList.toggle은 첫번째 인자를 두번째 인자로 판단하여 추가,삭제한다.

즉 실행중일 경우 fa-pause 버튼이 추가되어야하고

정지중일 경우 fa-play버튼이 보여야한다.

정지 상태라면, playing = false 이고 fa-pause는 false를, fa-play에는 그 반대는 !playing(true)를 할당해주는 것이다.

토글 기능같은 경우 참,거짓의 혼동이 자주 오기 때문에

난 실제로 돌려보기도 한다.(쉽게 알 수 있다.)

```js
function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}
function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}
```
다음, 이전곡 재생이다.

현재 곡에서 다음 곡으로 넘어가려면 (현재 인덱스 + 1)만 할것이 아니라 최대 값을 넘어갈 경우 0<- 첫번째 곡으로 넘어가도록 해야하는 것이다. 따라서 나머지 연산자를 이용해 곡의 최대 길이로 나눈 나머지를 구하면

1. 곡이 5곡일 때 : (4 + 1) % 5 = 0. 인덱스는 0가 됨.첫번째 곡 재생.
2. 이전 곡 일 때 : (4 - 1 + 5) % 5 = 3, (0 - 1 + 5) % 5 = 4. 마지막 곡 재생

페이징 처리와도 비슷한 방식으로 처음엔 어려웠지만 보다보니 이해가 가는 코드였다.

