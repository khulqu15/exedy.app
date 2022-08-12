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
          <div class="flex">
            <div class="grow w-full">
              <ion-item>
                <ion-label position="floating">ロボットのステータス</ion-label>
                <ion-input v-model="form.status"></ion-input>
              </ion-item>
            </div>
            <div class="self-center p-3">
              <ion-button id="reset-button" color="primary">
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
  IonContent,
  IonLoading,
  IonHeader,
  IonImg,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonItem } from '@ionic/vue';
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
    IonButton,
    IonImg,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonLabel,
    IonInput,
    IonItem,
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
