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
      <div class="logout" @click.stop="logout" v-else>
        <button class="user-btn">Logout</button>
      </div>
    </section>

    <!-- <form @submit.prevent="addAttach">
      <label class="img-upload-container">
        Computer
        <div>
          <label class="clickable add-img" v-if="!isLoading">
            <input type="file" id="uploadImg" @change="onUploadImg" hidden />
          </label>
          <div v-else class="loader">
            <img :src="require('../assets/img/loader.svg')" alt />
          </div>
        </div>
      </label>
      <label v-if="!isLoading">Attach a link</label>
      <input v-if="!isLoading" type="text" v-model="newAttach.href" />
      <label v-show="newAttach.href">Link name (optional)</label>
      <input v-show="newAttach.href" type="text" v-model="newAttach.name" />
      <button class="submit">Add</button>
    </form>-->
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
  methods: {
    close() {
      this.$emit("closePopup");
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: "logout" });
        this.$router.push("/");
      } catch (err) {
        console.log("cant logout", err);
      }
    }
  },
  components: {
    Avatar,
    GoogleLogin
  }
};
</script>

<style>
</style>