<template>
  <ion-page>
    <ion-content :fullscreen="true">
        <div class="my-32">
          <div class="flex justify-center place-content-cente">
            <ion-img class="w-94" :src="require(`/public/assets/image/app.png`)" alt="Exedy App"></ion-img>
          </div>
          <div class="px-12 space-y-4">
            <Form @submit.prevent="onSubmit">
              <ion-item>
                <ion-label position="floating">Robot IDを入力してください</ion-label>
                <ion-input rules="required" v-model="form.robot_id"></ion-input>
              </ion-item>
              <ion-button type="submit" size="large" expand="block" color="primary">接続開始</ion-button>
            </Form>
          </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonItem } from '@ionic/vue'
import {defineComponent} from 'vue'
import ToastMixin from '@/mixins/ToastMixin.vue'
import LoadingMixin from '@/mixins/LoadingMixin.vue'

export default defineComponent({
  mixins: [ToastMixin, LoadingMixin],
  name: 'HomePage',
  data() {
    return {
      form: {
        robot_id: ""
      }
    }
  },
  mounted() {
    this.form.robot_id = ''
  },
  components: {
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
    onSubmit: function (event: any) {
      if (this.form.robot_id.length == 0) {
        this.showToast('Robot id is required', 'danger', 5000, 'top')
      }
      event.preventDefault()
      this.axios.get(`${process.env.VUE_APP_URL}${this.form.robot_id}/status`).then((response: any) => {
        if(!response.data.status)
          this.showToast('Robot id is not found', 'danger', 5000, 'top')
        else {
          this.showLoading(null, 5000)
          setTimeout(() => {
            this.$router.push({
              path: `/robot/${this.form.robot_id}/status`
            });
          }, 5000)
        }
      }).catch((error: any) => {
        if(error.response != undefined) {
          if(error.response.status == 404)
            this.showToast('Request not found', 'danger', 5000, 'top')
        }
      })
    }
  }
});
</script>