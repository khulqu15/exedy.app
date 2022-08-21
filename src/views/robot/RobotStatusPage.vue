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
            <div class="flex justify-center">
              <ion-img v-if="!camera_view" class="w-94" :src="require(`/public/assets/image/camera_no_found.png`)" alt="Robot cam not found"></ion-img>
              <ion-img v-else class="w-94" :src="camera_view" alt="Robot cam not found"></ion-img>
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
  IonLabel,
  IonInput,
  IonItem } from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import LayoutHeader from '@/layouts/LayoutHeader.vue';
import LoadingMixin from "@/mixins/LoadingMixin.vue";
import ToastMixin from "@/mixins/ToastMixin.vue";
export default defineComponent({
  name: 'HomePage',
  mixins: [LoadingMixin, ToastMixin],
  data() {
    return {
      camera_view: false,
      form: {
        status: "Loading",
      }
    }
  },
  mounted() {
    // setInterval(() => {
    this.getCamera()
    // }, 1000)
    this.getStatus()
  },
  components: {
    LayoutHeader,
    IonButton,
    IonImg,
    IonContent,
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
    getCamera() {
      this.axios.get(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/camera/image`).then((response: any) => {
        this.camera_view = response.data
      }).catch((error: any) => {
        this.showToast(error.response.data.errors[0].message, 'danger', 20000, 'top')
      })
    },
    getStatus(reload = false) {
      this.axios.get(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/status`).then((response: any) => {
        console.log(response)
        if(!response.data.status)
          this.showToast('Robot id is not found', 'danger', 5000, 'top')
        else {
          this.form.status = response.data.status
        }
      })
      if(reload)
        this.showToast('Data is loaded', 'success', 5000, 'top')
    }
  }
});
</script>