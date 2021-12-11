<template>
  <section class="card-popup user-popup">
    <section class="popup-header">
      <div @click.stop="close">
        <span class="close-popup icon-md icon-close"></span>
      </div>
      <h4>Account</h4>
      <div class="user-short">
        <div class="user-icon">
          <avatar :username="user.fullname" :size="40" :lighten="200" :src="user.imgUrl"></avatar>
        </div>
        <div class="text">
          <div class="name">{{user.fullname}}</div>
          <span>{{user.username}}</span>
        </div>
      </div>
      <div class="br"></div>
      <nav>
        <button class="user-btn not-yet">Profile</button>
        <button class="user-btn not-yet">Activity</button>
        <button class="user-btn not-yet">Cards</button>
      </nav>
      <div class="br"></div>
      <!-- <div class="logout" @click.stop="logout" >
        <button class="user-btn">Log out</button>
      </div>-->
      <GoogleLogin
        v-if="user.googleUser"
        class="user-btn"
        :params="params"
        :logoutButton="true"
        :onSuccess="logout"
      >Logout</GoogleLogin>
      <!-- <div class="logout" @click.stop="fbLogout" v-if="user.fbUser">
        <button class="user-btn">Logout</button>
      </div> -->
      <div class="logout" @click.stop="logout" v-else>
        <button class="user-btn">Logout</button>
      </div>
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import GoogleLogin from "vue-google-login";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      params: {
        client_id:
          "961995621272-60aj5sk5o9vlm2a68pqoqbtd32uo5ka3.apps.googleusercontent.com"
      }
    };
  },
  created() {
    // console.log('created');
    // window.fbAsyncInit = function() {
    //   window.FB.init({
    //     appId: "668161277923698",
    //     xfbml: true,
    //     version: "v2.7"
    //   });
    //   window.FB.AppEvents.logPageView();
    // };
  },
  methods: {
    close() {
      this.$emit("closePopup");
    },
    async logout() {
      if (!this.user) return;
      try {
        await this.$store.dispatch({ type: "logout" });
        this.$router.push("/");
      } catch (err) {
        console.log("cant logout", err);
      }
    },
    // async fbLogout() {
    //   const copyThis = this;
    //   // console.log("fb");
    //   var connected = true;
    //   window.FB.logout(async function(response) {
    //     // console.log("fb logged out", response);
    //     if (connected) {
    //       copyThis.logout();
    //       connected = false;
    //     } else return;
    //   });
    // }
  },
  components: {
    Avatar,
    GoogleLogin
  }
};
</script>

<style>
</style>