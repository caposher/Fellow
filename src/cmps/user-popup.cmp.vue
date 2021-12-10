<template>
  <section class="card-popup user-popup">
    <section class="popup-header">
      <div @click.stop="close">
        <span class="close-popup icon-md icon-close"></span>
      </div>
      <h4>Account</h4>
      <div class="user-short">

       <avatar
          :username="user.fullname"
          :size="32"
          :lighten="200"
          :src="user.imgUrl"
          :title="`${user.fullname} (${user.username})`"
        ></avatar>
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

export default {
  props: {
    user: {
      type: Object
    }
  },
  components:{
Avatar
  }
};
</script>

<style>
</style>