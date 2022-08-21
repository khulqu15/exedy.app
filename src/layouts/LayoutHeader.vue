<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <div class="flex justify-center">
        <div class="self-center ml-4" @click="this.$router.push({ name: 'Home' })">
          <ion-img class="h-12 mx-auto" :src="require(`/public/assets/image/home.png`)" alt="Exedy App"></ion-img>
        </div>
        <div class="grow w-full -ml-4 self-end justify-self-end">
          <ion-img class="w-36 mx-auto" :src="require(`/public/assets/image/app.png`)" alt="Exedy App"></ion-img>
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader, IonIcon, IonImg, IonToolbar } from '@ionic/vue';
export default {
  name: "LayoutHeader",
  components: {
    IonHeader,
    IonImg,
    IonIcon,
    IonToolbar
  },
}
</script>