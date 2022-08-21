<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="status" :href="`/robot/${$route.params.robot_id}/status`">
          <ion-icon name="invert-mode-outline"></ion-icon>
          <ion-label>Staus / Mode</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="navigation" :href="`/robot/${$route.params.robot_id}/navigation`">
          <ion-icon name="location-outline"></ion-icon>
          <ion-label>Navigation</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="routing" :href="`/robot/${$route.params.robot_id}/routing`">
          <ion-icon name="share-social-outline"></ion-icon>
          <ion-label>Routing</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonTabs,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/vue'
import { calendar, personCircle } from 'ionicons/icons';

export default defineComponent({
  components: { IonIcon, IonRouterOutlet, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs },
  methods: {
    beforeTabChange() {
      // do something before tab change
    },
    afterTabChange() {
      // do something after tab change
    }
  }
});
</script>