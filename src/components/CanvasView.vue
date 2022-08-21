<template>
  <div class="space-y-0">
    <p><b>Map meta data </b></p>
    <div class="flex text-sm justify-between">
      <div>Resolution : {{ map_meta_data.resolution }}</div>
      <div>Width : {{ map_meta_data.width}}</div>
      <div>Height : {{ map_meta_data.height }}</div>
    </div>

    <canvas style="background-color: #0d0d0d !important; width: 100%" id="canvas-map-robot" height="300"></canvas>
    <div class="flex justify-center">
      <img class="hidden" id="main-bot-img" :src="require(`/public/assets/image/turtleBot-3-simulation-2.webp`)" alt="Exedy App"/>
      <img class="hidden" id="bg-bot-img" :src="require(`/public/assets/image/empty-world.webp`)" alt="Exedy App"/>
    </div>
    <div class="text-left">
      <p><b>Robot position </b> x : {{ main_bot.x }}, y : {{ main_bot.y }},  </p> <br>
      <p><b>Data positions </b> <br>{{ data_positions }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CanvasView",
  data() {
    return {
      disable_while_run: false,
      target: {
        x: 0,
        y: 0,
      },
      map_meta_data: {
        resolution: 3,
        width: 3,
        height: 3,
      },
      data_positions: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      main_bot: {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      }
    }
  },
  mounted() {
    this.initCanvas()
    let canvas = document.getElementById("canvas-map-robot")
    canvas.addEventListener('click', this.handleMouseOver)
  },
  methods: {
    initCanvas() {
      let canvas_area = document.getElementById("canvas-map-robot"),
          context = canvas_area.getContext("2d"),
          bot_img = document.getElementById("main-bot-img"),
          bg_img = document.getElementById("bg-bot-img")
      context.drawImage(bg_img, 0, 0, 300, 300)
      context.drawImage(bot_img, this.main_bot.x, this.main_bot.y, this.main_bot.width, this.main_bot.height)
      setInterval(() => {
        this.updateRobotPosition()
      }, 50)
    },
    handleMouseOver(event) {
      let canvas_area = document.getElementById("canvas-map-robot"),
          rect = canvas_area.getBoundingClientRect()
      if (!this.disable_while_run) {
        let targetX = (event.pageX - (rect.left) - 40)
        let targetY = (event.pageY - (rect.top) - 40)
        this.target.x = targetX
        this.target.y = targetY
        this.data_positions.push([this.target.x, this.target.y, 0])
        this.data_positions.splice(0, 1)
      }
      this.disable_while_run = true
      console.log(this.main_bot.x)
      console.log(this.main_bot.y)
    },
    updateRobotPosition() {
      this.clearRobotPosition()
      this.updatePosition()
    },
    updatePosition() {
      if (this.main_bot.x > this.target.x) {
        while (this.main_bot.x > this.target.x) {
          this.main_bot.x -= 1
        }
      } else if (this.main_bot.x < this.target.x) {
        while (this.main_bot.x < this.target.x) {
          this.main_bot.x += 1
        }
      } else this.main_bot.x += 0
      if (this.main_bot.y > this.target.y) {
        while (this.main_bot.y > this.target.y) {
          this.main_bot.y -= 1
        }
      } else if (this.main_bot.y < this.target.y) {
        while (this.main_bot.y < this.target.y) {
          this.main_bot.y += 1
        }
      } else this.main_bot.y += 0
      this.disable_while_run = false
      this.initCanvas()
    },
    clearRobotPosition() {
      let canvas_area = document.getElementById("canvas-map-robot"),
          context = canvas_area.getContext("2d")
      context.clearRect(0, 0, canvas_area.width, canvas_area.height)
    }
  }
}
</script>

<style scoped>

</style>