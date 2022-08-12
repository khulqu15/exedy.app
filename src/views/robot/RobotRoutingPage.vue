<template>
  <ion-page>

    <LayoutHeader/>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container" class="pt-6">
        <div class="px-12 space-y-4" v-if="!is_loading">
          <div class="px-8 my-6 mb-12">
            <ion-button @click="onSubmit" expand="block" color="primary">
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
        <div class="px-12 space-y-4" v-else>
          <ion-loading
              :is-open="is_loading"
              cssClass="my-custom-class"
              message="接続中..."
              :duration="timeout"
              @didDismiss="onLoading(false)"
          ></ion-loading>
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
  IonLoading,
  IonHeader,
  IonImg,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar} from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import LayoutHeader from '@/layouts/LayoutHeader.vue';
export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      is_loading: ref(false),
      timeout: 5000,
      form: {
        status: "停止中"
      }
    }
  },
  components: {
    LayoutHeader,
    IonLoading,
    IonRow,
    IonCol,
    IonGrid,
    IonButton,
    IonImg,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  methods: {
    onLoading(state: boolean) {
      this.is_loading = this.is_loading = state
    },
    onSubmit() {
      console.log(this.form.status)
      // consums api function
      this.onLoading(true)
    }
  }
});
</script>

<style scoped>
#reset-button {
  --border-radius: 100% !important;
  width: 50px !important;
  height: 50px !important;
}
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
