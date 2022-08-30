<template>
  <ion-page>

    <LayoutHeader/>

    <ion-content :fullscreen="true">
      <div id="container" class="pt-6 pb-24">
        <div class="px-12 space-y-4">
          <div class="flex">
            <div class="grow w-full">
              <ion-item>
                <ion-label position="floating">ロボットのステータス</ion-label>
                <ion-input v-model="form.status" readonly></ion-input>
              </ion-item>
            </div>
            <div class="self-center p-3">
              <ion-button @click="getStatus(true)" id="reset-button" color="primary">
                <ion-icon name="refresh-outline"></ion-icon>
              </ion-button>
            </div>
          </div>
          <div class="border-b-0 text-left">
          <ion-label position="floating" class="text-xs">カメラ映像</ion-label>
            <div v-if="!is_loaded_image">
              <div class="data-placeholder rounded-lg h-48 min-w-screen w-full overflow-hidden relative bg-gray-200">
                <div class="flex justify-center items-center h-48">
                  <div class="space-x-3">
                    <ion-icon name="reload-outline" class="animate-spin"></ion-icon>
                    <span>Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <ion-img v-if="error_load" class="w-94" :src="require(`/public/assets/image/camera_no_found.png`)" alt="Robot cam not found"></ion-img>
              <ion-img v-else class="w-94" :src="camera_view" id="image-preview" alt="Robot cam not found"></ion-img>
            </div>
          </div>
          <ion-button @click="onStart" size="large" expand="block" color="primary">追従開始</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonImg,
  IonPage,
  IonButton,
  IonIcon,
  IonLabel,
  IonInput,
  IonItem } from '@ionic/vue';
import {defineComponent} from 'vue';
import LayoutHeader from '@/layouts/LayoutHeader.vue';
import LoadingMixin from "@/mixins/LoadingMixin.vue";
import ToastMixin from "@/mixins/ToastMixin.vue";
export default defineComponent({
  name: 'HomePage',
  mixins: [LoadingMixin, ToastMixin],
  data() {
    return {
      camera_view: '',
      error_load: false,
      is_loaded_image: false,
      form: {
        status: "Loading",
      }
    }
  },
  mounted() {
    this.getStatus()
  },
  components: {
    LayoutHeader,
    IonButton,
    IonImg,
    IonContent,
    IonIcon,
    IonPage,
    IonLabel,
    IonInput,
    IonItem,
  },
  methods: {
    onStart() {
      this.axios.post(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/commands/follow`).then((response: any) => {
        console.log(response)
        this.showToast('Command follow started', 'success', 5000, 'top')
      }).catch((error: any) => {
        if(error.response != undefined) {
          if(error.response.status == 404)
            this.showToast('Request not found', 'danger', 5000, 'top')
        }
      })
    },
    getCamera: function () {
      this.axios.get(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/camera/image`, {
        responseType: 'blob'
      }).then((response: any) => {
        let imageElement = document.getElementById('image-preview'),
            reader = new FileReader()
        reader.readAsDataURL(response.data)
        reader.onload = () => {
          let imageUrl = reader.result
          if(imageElement)
            imageElement.setAttribute('src', imageUrl as string)
        }
        this.camera_view = URL.createObjectURL(response.data)
        this.is_loaded_image = true
      })
      .catch((error: any) => {
        if(error.response) {
          this.showToast(error.response.data.errors[0].message, 'danger', 20000, 'top')
          this.error_load = true
        }
      })
    },
    getStatus(reload = false) {
      this.is_loaded_image = false
      this.axios.get(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/status`).then((response: any) => {
        console.log(response)
        if(!response.data.status)
          this.showToast('Robot id is not found', 'danger', 5000, 'top')
        else {
          this.form.status = response.data.status
        }
      })
      this.getCamera()
      if(reload)
        this.showToast('Data is loaded', 'success', 5000, 'top')
    }
  }
});
</script>

<style scoped>
.data-placeholder::after {
  content: " ";
  box-shadow: 0 0 50px 9px rgba(254,254,254);
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  animation: load 1s infinite;
}
@keyframes load {
  0%{ left: -100%}
  100%{ left: 150%}
}
</style>