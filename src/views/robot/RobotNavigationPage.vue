<template>
  <ion-page>

    <LayoutHeader/>

    <ion-content :fullscreen="true">
      <div id="container" class="pt-6 pb-24">
        <div class="px-12 space-y-4">
          <div class="px-8 my-6 mb-12">
            <ion-button @click="getMap(true)" expand="block" color="primary">
              <ion-icon name="refresh-outline"></ion-icon>
              <span class="inline-block mx-3">Update Map</span>
            </ion-button>
          </div>
          <canvas-view/>
          <ion-item>
            <ion-label>Choose mode</ion-label>
            <ion-select v-model="form.mode">
              <ion-select-option value="auto">自律走行</ion-select-option>
              <ion-select-option value="run">先導走行</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button @click="onSubmit" size="large" expand="block" color="primary">走行開始</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonButton,
  IonLabel,
  IonItem } from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import CanvasView from '@/components/CanvasView.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue';
import LoadingMixin from "@/mixins/LoadingMixin.vue";
import ToastMixin from "@/mixins/ToastMixin.vue";
export default defineComponent({
  mixins: [LoadingMixin, ToastMixin],
  name: 'HomePage',
  data() {
    return {
      data: [],
      map_meta_data: {},
      robot_position: {},
      form: {
        mode: ""
      }
    }
  },
  mounted() {
    this.getMap()
    this.initCanvas()
  },
  components: {
    CanvasView,
    LayoutHeader,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
  },
  methods: {
    initCanvas() {

    },
    getMap(reload = false) {
      this.axios.get(`${process.env.VUE_APP_URL}${this.$route.params.robot_id}/map`).then((response: any) => {
        if(response.data.status) {
          this.map_meta_data = response.data.map_meta_data
          this.data = response.data.data
          this.robot_position = response.data.robot_position
        }
        if(reload)
          this.showToast('Data is loaded', 'success', 5000, 'top')
      })
    },
    onSubmit() {
      this.showLoading(null, 5000)
      console.log(this.form.mode)
      // consums api function
    }
  }
});
</script>