import singleLoop from '@/layout/musicPlayer/images/singleLoop.svg'
import sequence from '@/layout/musicPlayer/images/sequence.svg'
import random from '@/layout/musicPlayer/images/random.svg'
import listLoop from '@/layout/musicPlayer/images/listLoop.svg'

//创建对象
const AudioContext =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.msAudioContext
let audioCtx: any = null
// 源
let audioBufferSourceNode: any = null
let buffer: any = null
//音量变更
let gainNode: any = null
// 傅里叶变换数据
let analyser: any = null
// 播放/暂停状态标识
let isPlay = ref(false)
// 记录时间定时器
let currentTimer: any = null
// 播放顺序
let orderList = [
  {
    name: '顺序播放',
    img: sequence,
  },
  {
    name: '单曲循环',
    img: singleLoop,
  },
  {
    name: '随机播放',
    img: random,
  },
  {
    name: '列表循环',
    img: listLoop,
  },
]

// 基本数据
export function useStatus() {
  return {
    isPlay,
    orderList,
  }
}

// 功能函数
export function usePlayer(musicPlayer: any) {
  // 记录播放时间函数
  const recordCurrentTime = () => {
    clearInterval(currentTimer)
    currentTimer = setInterval(() => {
      musicPlayer.currentTime++
      if (musicPlayer.currentTime >= buffer.duration) {
        clearInterval(currentTimer)
        switch (musicPlayer.currentOrder) {
          case 0:
            orderFunList.sequence()
            break
          case 1:
            orderFunList.singleLoop()
            break
          case 2:
            orderFunList.random()
          case 3:
            break
        }
      }
    }, 1000)
  }

  // 处理日时间
  const handleTime = (time = 0): string => formatDate(Math.round(time) * 1000, 'mm:ss')
  // 创建播放源
  const createPlaySource = () => {
    // 通过connect方法从音频源连接到AudioNode处理模块，再连接到输出设备，
    // 当我们修改前面的模块时，就会影响到后面AudioNode，以及我们最终听见的声音
    // 创建对象，用过AudioBuffer对象来播放音频数据
    //创建源
    audioBufferSourceNode = audioCtx.createBufferSource()
    audioBufferSourceNode.buffer = buffer
    // 将source与analyser分析器连接
    audioBufferSourceNode.connect(analyser)
    // 将analyser与gainNode分析器连接
    audioBufferSourceNode.connect(gainNode)
    // 表示 context 的最终节点，一般是音频渲染设备
    gainNode.connect(audioCtx.destination)
    audioBufferSourceNode.start(0, musicPlayer.currentTime)
    // 初始化播放音量
    gainNode.gain.value = musicPlayer.volume / 100
    // 记录时间
    recordCurrentTime()
    // 状态设置成播放
    isPlay.value = true
  }

  // 播放顺序功能函数
  const orderFunList = {
    // 顺序播放
    sequence() {
      // 如果有下一首就播放下一首
      if (!(musicPlayer.currentMusicIndex >= musicPlayer.playQueue.length - 1)) {
        goPrevOrNextMusic('next')
      } else {
        musicPlayer.currentTime = 0
        isPlay.value = false
        audioBufferSourceNode.stop()
        audioBufferSourceNode = null
      }
    },
    // 单曲循环
    singleLoop() {
      audioBufferSourceNode.stop()
      musicPlayer.currentTime = 0
      createPlaySource()
    },
    // 随机播放
    random() {
      musicPlayer.currentMusicIndex = Math.floor(Math.random() * musicPlayer.playQueue.length)
      // 清除音乐记录
      musicPlayer.clearLocalMusicStatus()
      goPlayMusic()
    },
  }

  //上一首或者下一首
  let goPrevOrNextMusic = useThrottleFn(flag => {
    switch (flag) {
      case 'prev':
        if (musicPlayer.currentMusicIndex <= 0) return ElMessage.warning('前面已经没有歌曲了')
        musicPlayer.currentMusicIndex--
        break
      case 'next':
        if (musicPlayer.currentMusicIndex >= musicPlayer.playQueue.length - 1)
          return ElMessage.warning('后面已经没有歌曲了')
        musicPlayer.currentMusicIndex++
        break
    }
    // 清除音乐记录
    musicPlayer.clearLocalMusicStatus()
    // 切换新的音乐
    goPlayMusic()
  }, 500)

  // 播放音乐
  async function goPlayMusic() {
    // 没有添加任何歌曲
    if (musicPlayer.currentMusicIndex === -1 && musicPlayer.playQueue.length === 0)
      return ElMessage.warning('当前没有能播放的歌曲，请添加')
    //  暂停后恢复
    if (audioBufferSourceNode != null) {
      audioCtx.resume()
      recordCurrentTime()
      return (isPlay.value = true)
    }
    //创建环境
    audioCtx = new AudioContext()
    // 频率及时间域分析器，声音可视化就用这个
    analyser = audioCtx.createAnalyser()
    //音量变更模块
    gainNode = audioCtx.createGain()
    // 通过ajax读取音乐文件的rawData，然后转成ArrayBuffer
    let music = musicPlayer.playQueue[musicPlayer.currentMusicIndex]
    let musicArrayBuffer = await fetch(music.musicUrl).then(r => r.arrayBuffer())
    // 将音频的ArrayBuffer解码成AudioBuffer
    try {
      buffer = await audioCtx.decodeAudioData(musicArrayBuffer)
      musicPlayer.duration = buffer.duration
    } catch (e) {
      console.log('Error decoding file', e)
      console.log(musicPlayer)
      return musicPlayer.addSongToPlayList(music)
    }
    // 播放源
    createPlaySource()
  }

  // 暂停音乐
  function goPauseMusic() {
    clearInterval(currentTimer)
    audioCtx.suspend()
    isPlay.value = false
  }

  // 点击进度条改变音乐时间
  function changeProgress() {
    try {
      audioBufferSourceNode.stop()
      createPlaySource()
    } catch (error) {}
  }

  // 播放顺序菜单点击事件
  const handleCommand = (command: number) => {
    musicPlayer.currentOrder = command
    ElMessage.success(`${orderList[command].name}`)
  }

  // 清空所有播放状态
  function resetStatus() {
    // goPauseMusic();
    // progressTime.value = 0;
    // // player.currentTime = 0;
    // setTimeout(() => {
    //   // player.src = '';
    //   currentMusicIndex.value = -1;
    //   // currentPlayList.data = [];
    //   localStorage.removeItem('musicPlayerStatus');
    // }, 20);
  }

  // 改变音乐音量
  function changeVolume(value) {
    if (value >= 0) gainNode.gain.value = value / 100
  }

  // 下载音乐
  async function downloadMusic(music) {
    let musicUrl = await musicPlayer.getMusicUrl(music)
    if (typeof musicUrl !== 'string') return
    const req = new XMLHttpservice()
    req.open('GET', musicUrl, true)
    req.responseType = 'blob'
    req.setRequestHeader('Content-Type', 'video/mp4')
    req.onload = function () {
      const data = req.response
      const blob = new Blob([data])
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.download = `${music.name}.mp3`
      a.href = blobUrl
      a.click()
    }
    req.send()
  }
  return {
    handleTime,
    goPlayMusic,
    goPauseMusic,
    changeProgress,
    goPrevOrNextMusic,
    handleCommand,
    resetStatus,
    changeVolume,
    downloadMusic,
  }
}
