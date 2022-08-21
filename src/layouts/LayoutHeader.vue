<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <div class="flex justify-center">
        <div class="self-center" @click="this.$router.push({ name: 'Home' })">
          <ion-icon class="cursor-pointer relative -right-4 top-1" name="close-outline" size="large"></ion-icon>
        </div>
        <div class="grow w-full self-end justify-self-end">
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