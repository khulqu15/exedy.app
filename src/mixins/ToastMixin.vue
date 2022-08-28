<script>
import {toastController} from "@ionic/vue";
import {informationCircle} from "ionicons/icons";

export default {
  name: "ToastMixin",
  methods: {
    async showToast(message, type, duration, position) {
      const toast = await toastController
          .create({
            header: message,
            icon: informationCircle,
            color: type,
            duration: 5000,
            position: position,
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
    },
  }
}
</script>