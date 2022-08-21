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
              <ion-img class="w-94" :src="require(`/public/assets/image/gazebo-pic.webp`)" alt="Exedy App"></ion-img>
            </div>
          </div>
          <ion-button @click="onSubmit" size="large" expand="block" color="primary">追従開始</ion-button>
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
      form: {
        status: "Loading"
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
    IonPage,
    IonLabel,
    IonInput,
    IonItem,
  },
  methods: {
    onSubmit() {
      this.showLoading(null, 5000)
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