<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <div class="flex justify-center">
          <ion-img class="w-94" :src="require(`/public/assets/image/image-removebg-preview.png`)" alt="Exedy App"></ion-img>
        </div>
        <div class="px-12 space-y-4" v-if="!is_loading">
          <Form @submit.prevent="onSubmit">
            <ion-item>
              <ion-label position="floating">Robot IDを入力してください</ion-label>
              <ion-input rules="required" v-model="form.robot_id"></ion-input>
            </ion-item>
            <ion-button type="submit" size="large" expand="block" color="primary">接続開始</ion-button>
          </Form>
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
  toastController,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonItem } from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import { informationCircle } from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      is_loading: ref(false),
      timeout: 5000,
      form: {
        robot_id: ""
      }
    }
  },
  components: {
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
    async openToastOptions() {
      const toast = await toastController
          .create({
            header: 'Robot Id is required',
            icon: informationCircle,
            color: 'danger',
            duration: 5000,
            position: 'top',
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  console.log('Cancelled');
                }
              }
            ]
          })
      await toast.present();

      const { role } = await toast.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
    onSubmit() {
      console.log(this.form.robot_id.length)
      if (this.form.robot_id.length == 0) {
        this.openToastOptions()
        return false
      }

      console.log(this.form.robot_id)
      // consums api function
      this.onLoading(true)
      setTimeout(() => {
        this.$router.push({
          path: '/robot/status'
        });
      }, 5000)
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
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
