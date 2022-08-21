<template>
  <ion-page>

    <LayoutHeader/>

    <ion-content :fullscreen="true">
      <div id="container" class="pt-6 pb-24">
        <div class="px-12 space-y-4">
          <div class="px-8 my-6 mb-12">
            <ion-button @click="onUpdate()" expand="block" color="primary">
              <ion-icon name="refresh-outline"></ion-icon>
              <span class="inline-block mx-3">Update Map</span>
            </ion-button>
          </div>
          <div class="flex justify-center">
            <ion-img class="w-94" :src="require(`/public/assets/image/closed-room-world-1024x555.webp`)" alt="Exedy App"></ion-img>
          </div>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button size="large" expand="block" color="danger">ルートのリセット</ion-button>
              </ion-col>
              <ion-col>
                <ion-button @click="onSubmit" size="large" expand="block" color="primary">走行開始</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonRow,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonButton} from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import LayoutHeader from '@/layouts/LayoutHeader.vue';
import LoadingMixin from "@/mixins/LoadingMixin.vue";
import ToastMixin from "@/mixins/ToastMixin.vue";
export default defineComponent({
  name: 'RobotRoutingPage',
  mixins: [LoadingMixin, ToastMixin],
  components: {
    LayoutHeader,
    IonRow,
    IonCol,
    IonGrid,
    IonButton,
    IonImg,
    IonContent,
    IonPage,
  },
  methods: {
    onUpdate() {
      this.showLoading(null, 4000)
      setTimeout(() => {
        this.showToast('Data is loaded', 'success', 5000, 'top')
      }, 5000)
    },
    onSubmit() {
      this.showLoading(null, 5000)
      // consums api function
    }
  }
});
</script>
