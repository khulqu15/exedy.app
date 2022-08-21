<script>
import { IonButton, loadingController } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "LoadingMixin",
  components: { IonButton },
  methods: {
    async showLoading (message, duration) {
      const loading = await loadingController.create({
        message: message == null ? '接続中...' : message,
        duration: duration,
      });
      loading.present();
    }
  }
});
</script>