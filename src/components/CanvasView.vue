<template>
  <div class="space-y-0">
    <p><b>Map meta data </b></p>
    <div class="flex text-sm justify-between">
      <div>Resolution : {{ map_meta_data.resolution }}</div>
      <div>Width : {{ map_meta_data.width}}</div>
      <div>Height : {{ map_meta_data.height }}</div>
    </div>
    <div class="h-96 w-full overflow-auto" id="scrollable-content">
      <canvas id="canvas" width="100" height="100"></canvas>
    </div>
    <div class="flex justify-center">
      <img class="hidden" id="main-bot" :src="require(`/public/assets/image/main-bot.webp`)" alt="Exedy App"/>
    </div>
    <div class="text-left">
      <p><b>Robot position </b> x : {{ main_bot.x }}, y : {{ main_bot.y }},  </p> <br>
    </div>
<!--    <div class="flex">-->
<!--      <div>-->
<!--        <ion-button color="primary" @click="onZoom(true)">-->
<!--          <ion-icon name="add-circle-outline"></ion-icon>-->
<!--        </ion-button>-->
<!--      </div>-->
<!--      <div class="grow text-center w-full self-center">-->
<!--        <span>100%</span>-->
<!--      </div>-->
<!--      <div>-->
<!--        <ion-button color="primary" @click="onZoom(false)">-->
<!--          <ion-icon name="remove-circle-outline"></ion-icon>-->
<!--        </ion-button>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import LoadingMixin from "@/mixins/LoadingMixin.vue"
import ToastMixin from "@/mixins/ToastMixin.vue"
export default {
  mixins: [LoadingMixin, ToastMixin],
  name: "CanvasView",
  data() {
    return {
      zoomScale: 1,
      height: 300,
      width: 300,
      maxValue: 400,
      src_image: null,
      map_meta_data: {
        resolution: 3,
        width: 3,
        height: 3,
      },
      main_bot: {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      }
    }
  },
  mounted() {
    this.getDataCanvas()
  },
  methods: {
    onZoom(status) {
      let canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d')
      if(status) this.zoomScale += 10
      else this.zoomScale -= 10
      context.scale(this.zoomScale, this.zoomScale)
      this.getDataCanvas()
    },
    getDataCanvas() {
      this.axios.get(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/map`, {
      }).then((response) => {
        this.src_image = response.data.image
        this.main_bot.x = response.data.robot_position.x
        this.main_bot.y = response.data.robot_position.y
        this.map_meta_data.resolution = response.data.map_meta_data.resolution
        this.map_meta_data.width = response.data.map_meta_data.width
        this.map_meta_data.height = response.data.map_meta_data.height
        if(this.src_image != null) {
          this.getImageData()
        }
      })
    },
    setPositionScroll(x, y) {
      let scrollable = document.getElementById('scrollable-content')
      scrollable.scrollTo(x, y)
    },
    getImageData() {
      let canvas = document.getElementById('canvas')
      if(this.src_image != null) {
        this.axios.get(`${this.src_image}`, {
          responseType: 'arraybuffer'
        }).then((response) => {
          let bytes = new Uint8Array(response.data)
          let readIndex = 0
          if(bytes[readIndex++] !== 80 || bytes[readIndex++] !== 53) {
            console.log("---非pgm--")
            return false
          }
          readIndex++
          let c = bytes[readIndex++]
          if(c === 35) {
            do {
              c = bytes[readIndex++]
            } while(c !== 10 && c !== 13)
            c = bytes[readIndex++]
          }
          if(c < 48 || c > 57){
            console.log("---读取宽错误--:"+c)
            return false
          }
          let k = 0
          do {
            k = k * 10 + c - 48
            c = bytes[readIndex++]
          } while(c >= 48 && c <= 57)
          this.width = k
          c = bytes[readIndex++]
          if(c < 48 || c > 57){
            console.log("---读取宽错误--:"+c)
            return false
          }
          k = 0
          do {
            k = k * 10 + c - 48
            c = bytes[readIndex++]
          } while(c >= 48 && c <= 57)
          this.height = k
          c = bytes[readIndex++]
          if(c < 48 && c > 57) {
            console.log("---读取宽错误--:"+c)
            return false
          }
          k = 0
          do {
            k = k * 10 + c - 48
            c = bytes[readIndex++]
          } while(c >= 48 && c <= 57)
          this.maxValue = k
          canvas.width = this.width
          canvas.height = this.height
          let content = canvas.getContext('2d').createImageData(this.width, this.height)
          for(let m = 0; m < this.width*this.height; m++) {
            c = bytes[readIndex++]
            content.data[m * 4] = c
            content.data[m*4+1] = c
            content.data[m*4+2] = c
            content.data[m*4+3] = 255
          }
          canvas.getContext('2d').putImageData(content, 0, 0)
          this.initRobot()
        })
      }
    },
    initRobot() {
      let canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          robot = document.getElementById('main-bot')
      this.main_bot.width = ((this.width / 100) * 3)
      this.main_bot.height = ((this.height / 100) * 3)
      context.drawImage(robot, this.main_bot.x, this.main_bot.y, this.main_bot.width, this.main_bot.height)
      this.setPositionScroll((this.main_bot.x / 2.5), (this.main_bot.y / 2.5))
    }
  }
}
</script>

<style scoped>

</style>