<template>
  <section class="card-popup main-menu">
    <header class="popup-header">
      <h4>Menu</h4>
      <div @click="closeMenu">
        <span class="menu-close icon-md icon-close"></span>
      </div>
    </header>

    <!-- main actions -->
    <ul class="main-menu-actions">
      <li class="menu-about">
        <h3><span class="menu-action-icon icon-lg icon-board"></span> About this board</h3>
      </li>
      <li class="menu-action" @click="isChangeColor = true">
        <span class="icon-img" :style="styleToShow"></span>
        <h3>Change background</h3>
      </li>
      <li class="menu-action" @click="openDashboard">
        <h3><span class="menu-action-icon icon-lg icon-home"></span>Dashboard</h3>
      </li>
    </ul>

    <!-- <span class="menu-br"></span> -->

    <!-- side actions -->
    <ul class="action-board">
      <li class="menu-action">
        <h3><span class="menu-action-icon icon-md icon-members"></span>Members</h3>
        <section class="main-menu-members-container">
          <avatar
            v-for="(member, index) in membersToShow"
            :key="member.id"
            :style="{ 'z-index': membersToShow.length - index }"
            :username="member.fullname"
            :size="28"
            :lighten="200"
            :src="member.imgUrl"
            :title="member.fullname"
            class
          />
        </section>
      </li>
      <li class="menu-action" @click="showUserPopup = true">
        <h3><span class="menu-action-icon icon-md icon-member"></span>User account</h3>
      </li>
      <li class="menu-action" @click="deleteBoard">
        <h3><span class="menu-action-icon icon-md icon-archive"></span>Archive board</h3>
      </li>
      <!-- <li class="menu-action" @click="showAct=!showAct">
        <h3><span class="menu-action-icon icon-md icon-activity"></span>Activity</h3>
      </li>-->
    </ul>

    <span class="menu-br"></span>

    <ul class="activity">
      <li class="menu-action" @click="showAct = !showAct">
        <h3><span class="menu-action-icon icon-lg icon-activity"></span>Activity</h3>
      </li>
    </ul>
    <!-- <ul v-for="(activity,idx) in getLatestActivities" :key="activity.id" class="menu-act-list">
      <li>
         <activity-item :activity="activity" :idx="idx" :inCard="false" />
        </li>
      </ul> -->

    <!-- Change background -->
    <section v-show="isChangeColor" class="card-popup main-menu">
      <header class="popup-header">
        <h4>Change background</h4>
        <span @click="isChangeColor = false" class="back-popup icon-md icon-back"></span>
        <div>
          <span @click="closeMenu" class="menu-close icon-md icon-close"></span>
        </div>
      </header>
      <ul class="main-menu-background">
        <li>
          <div class="menu-background-size background-photo" @click="requestPhotos"></div>
          <p>Photos</p>
        </li>
        <li>
          <div class="menu-background-size background-colors" @click="isColorSelected = true"></div>
          <p>Colors</p>
        </li>
      </ul>
      <section class="menu-bgc-custom">
        <h2>Custom</h2>
        <div class="menu-background-size action-btn">
          <span class="custom-btn icon-md icon-plus"></span>
        </div>
      </section>
    </section>

    <!-- Change background -  solid color -->
    <section v-show="isColorSelected" class="card-popup main-menu">
      <header class="popup-header">
        <h4>Colors</h4>
        <span @click="isColorSelected = false" class="back-popup icon-md icon-back"></span>
        <div>
          <span @click="closeMenu" class="menu-close icon-md icon-close"></span>
        </div>
      </header>
      <ul class="menu-color-set">
        <li v-for="color in colorSet" :key="color">
          <div @click="setBg(color)" class="menu-background-size" :style="{ backgroundColor: color }"></div>
        </li>
      </ul>
    </section>

    <!-- Change background - imgs -->
    <section v-show="isPhotosSelected" class="card-popup main-menu">
      <header class="popup-header">
        <h4>Photos</h4>
        <span @click="isPhotosSelected = false" class="back-popup icon-md icon-back"></span>
        <div>
          <span @click="closeMenu" class="menu-close icon-md icon-close"></span>
        </div>
      </header>
      <div class="main-menu-search">
        <input type="text" v-model="searchKey" @change="requestPhotos()" placeholder="Photos" />
      </div>
      <ul class="menu-color-set">
        <li v-for="(url, idx) in getImgs" :key="idx">
          <div
            @click="setBg(url.regular)"
            class="menu-background-size"
            :style="{ backgroundImage: 'url(' + url.regular + ')' }"
          >
            <div class="loader" v-if="loading === url.regular">
              <img :src="require('../assets/img/loader.svg')" alt />
              Uploading...
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import FastAverageColor from 'fast-average-color';
import Avatar from 'vue-avatar';
import userPopup from '../cmps/user-popup.cmp.vue';
import activityItem from '../cmps/activity-item.cmp.vue';

export default {
  data() {
    return {
      isChangeColor: false,
      isColorSelected: false,
      isPhotosSelected: false,
      searchKey: '',
      colorSet: ['#0079bf', '#d29134', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#13aecc', '#838c91'],
      loading: '',
      showAct: false,
    };
  },

  methods: {
    requestPhotos() {
      this.isPhotosSelected = true;
      this.$store.dispatch({
        type: 'requestPhotos',
        searchKey: this.searchKey,
      });
    },
    async setBg(val) {
      let style;
      if (val.charAt(0) === '#') {
        style = {
          imgUrl: null,
          bgColor: val,
          isDark: true,
        };
      } else {
        this.loading = val;
        const fac = new FastAverageColor();
        const color = await fac.getColorAsync(val);
        style = {
          imgUrl: val,
          bgColor: color.rgba,
          isDark: color.isDark,
        };
      }
      try {
        console.log('style', style);
        const boardId = this.$store.getters.boardId;
        await this.$store.dispatch({ type: 'setBackground', boardId, style });
        //  const filterBy = {user: this.$store.getters.user}
        // await this.$store.dispatch({ type: 'loadBoards' , filterBy});
        await this.$store.dispatch({ type: 'loadBoards' });
        this.loading = '';
      } catch (err) {
        console.log('cant set board bg', err);
      }
    },
    openDashboard() {
      this.$store.commit({ type: 'toggleDashboard' });
      this.closeMenu();
    },
    closeMenu() {
      this.$emit('close');
      this.isChangeColor = false;
      this.isColorSelected = false;
      this.isPhotosSelected = false;
      this.searchKey = '';
    },
    deleteBoard() {
      this.$emit('deleteBoard');
    },
  },
  computed: {
    styleToShow() {
      if (!this.boardStyle) return;
      if (this.boardStyle.imgUrl)
        return {
          backgroundImage: `url("${this.boardStyle.imgUrl}")`,
        };
      return {
        backgroundColor: this.boardStyle.bgColor,
      };
    },
    boardStyle() {
      return this.$store.getters.board.style;
    },
    getImgs() {
      return this.$store.getters.getBgPhotos;
    },
    membersToShow() {
      return this.$store.getters.board.members;
    },
    //     getLatestActivities() {
    //   // console.log('this.activities.', this.activities);
    //   // return this.activities.slice(0, 10);
    //   return this.$store.getters.getActivities;
    // },
  },
  components: {
    Avatar,
    userPopup,
    activityItem,
  },
};
</script>
