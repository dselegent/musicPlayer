<template>
  <div class="Sakura">
    <canvas id="canvas_sakura" ref="canvas_sakuraRef" :style="{ zIndex: zIndex }"></canvas>
  </div>
</template>

<script setup lang="ts" name="Sakura">
  import sakuraImg from './sakura.png'

  interface Props {
    sakuraNum: number
  }
  const props = withDefaults(defineProps<Props>(), {
    sakuraNum: 20,
  })

  const {
    proxy: { $bus },
  } = getCurrentInstance() as any

  $bus.on('changeSakuraNum', startSakura)

  class Sakura {
    constructor(x, y, s, r, fn, img) {
      this.x = x
      this.y = y
      this.s = s
      this.r = r
      this.fn = fn
      this.img = img
    }
    draw(cxt) {
      cxt.save()
      var xc = (40 * this.s) / 4
      cxt.translate(this.x, this.y)
      cxt.rotate(this.r)
      cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s)
      cxt.restore()
    }
    update() {
      this.x = this.fn.x(this.x, this.y)
      this.y = this.fn.y(this.y, this.y)
      this.r = this.fn.r(this.r)
      if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr')
        if (Math.random() > 0.4) {
          this.x = getRandom('x')
          this.y = 0
          this.s = getRandom('s')
          this.r = getRandom('r')
        } else {
          this.x = window.innerWidth
          this.y = getRandom('y')
          this.s = getRandom('s')
          this.r = getRandom('r')
        }
      }
    }
  }

  class SakuraList {
    constructor() {
      this.list = []
    }
    push(sakura) {
      this.list.push(sakura)
    }
    update() {
      for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update()
      }
    }
    draw(cxt) {
      for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt)
      }
    }
    get(i) {
      return this.list[i]
    }
    size() {
      return this.list.length
    }
  }

  let staticx = $ref(false)
  let stop = $ref(null)
  // let num = sakuraNum;
  let zIndex = $ref(9999)
  let canvas_sakuraRef = $ref(null)

  function getRandom(option) {
    let ret, random
    switch (option) {
      case 'x':
        ret = Math.random() * window.innerWidth
        break
      case 'y':
        ret = Math.random() * window.innerHeight
        break
      case 's':
        ret = Math.random()
        break
      case 'r':
        ret = Math.random() * 6
        break
      case 'fnx':
        random = -0.5 + Math.random() * 1
        ret = function (x, y) {
          return x + 0.5 * random - 1.7
        }
        break
      case 'fny':
        random = 1.5 + Math.random() * 0.7
        ret = function (x, y) {
          return y + random
        }
        break
      case 'fnr':
        random = Math.random() * 0.03
        ret = function (r) {
          return r + random
        }
        break
    }
    return ret
  }

  function startSakura() {
    requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame
    var canvas = document.getElementById('canvas_sakura')
    staticx = true
    canvas_sakuraRef.width = window.innerWidth
    canvas_sakuraRef.height = window.innerHeight
    var cxt = canvas_sakuraRef.getContext('2d')
    var sakuraList = new SakuraList()
    const img = new Image()
    img.src = sakuraImg //樱花效果图相对路径
    for (var i = 0; i < props.sakuraNum; i++) {
      let sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR
      randomX = getRandom('x')
      randomY = getRandom('y')
      randomR = getRandom('r')
      randomS = getRandom('s')
      randomFnx = getRandom('fnx')
      randomFny = getRandom('fny')
      randomFnR = getRandom('fnr')
      sakura = new Sakura(
        randomX,
        randomY,
        randomS,
        randomR,
        {
          x: randomFnx,
          y: randomFny,
          r: randomFnR,
        },
        img,
      )
      sakura.draw(cxt)
      sakuraList.push(sakura)
    }
    stop = requestAnimationFrame(function fn() {
      cxt.clearRect(0, 0, canvas.width, canvas.height)
      sakuraList.update()
      sakuraList.draw(cxt)
      stop = requestAnimationFrame(fn)
    })
  }

  function stopp() {
    if (staticx) {
      let child = document.getElementById('canvas_sakura')
      child.parentNode.removeChild(child)
      window.cancelAnimationFrame(stop)
      staticx = false
    } else {
      startSakura()
    }
  }

  onMounted(() => {
    nextTick(() => {
      startSakura()
    })
  })
</script>

<style scoped>
  #canvas_sakura {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
