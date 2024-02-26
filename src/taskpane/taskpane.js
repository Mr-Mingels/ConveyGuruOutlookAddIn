import { getUserProfile } from "../helpers/sso-helper";
import { createApp } from "vue";
import router from "../router/index";
import App from "../App.vue";

export let emailMessages = []
export let emailFolders = []

export async function run(callback) {
  getUserProfile((result) => {
    emailMessages = result.emailMessages ? result.emailMessages.value : []
    emailFolders = result.emailFolders ? result.emailFolders.value : []
    if (callback) {
      callback(true);
    }
  });
}

Office.onReady(() => {
  const app = createApp(App);

  app.use(router);
  app.mount("#app");
});
