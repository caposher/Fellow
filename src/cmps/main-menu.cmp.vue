<template>
  <section class="card-popup main-menu">
    <header class="popup-header">
      <h4>Menu</h4>
      <div @click="closeMenu">
        <span class="menu-close icon-md icon-close"></span>
      </div>
    </header>
    <ul class="main-menu-actions">
      <li class="menu-about">
        <h3><span class="menu-action-icon icon-lg icon-board"></span> About this board</h3>
        <!-- <p>Add a description to your board</p> -->
      </li>
      <li class="menu-action" @click="isChangeColor = true">
        <span class="icon-img" :style="styleToShow"></span>
        <h3>Change background</h3>
      </li>
      <li class="menu-action" @click="openDashboard">
        <h3><span class="menu-action-icon icon-lg icon-home"></span>Dashboard</h3>
      </li>
      <li class="menu-action" @click="deleteBoard">
        <h3><span class="menu-action-icon icon-lg icon-archive"></span>Archive board</h3>
      </li>
    </ul>
    <ul class="delete-board"></ul>
    <ul class="main-menu-activity">
      <li></li>
    </ul>

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
        <!-- <span class="icon-md icon-search"></span> -->
        <input type="text" v-model="searchKey" @change="requestPhotos()" />
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

export default {
  data() {
    return {
      isChangeColor: false,
      isColorSelected: false,
      isPhotosSelected: false,
      searchKey: '',
      colorSet: ['#0079bf', '#d29134', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#13aecc', '#838c91'],
      loading: '',
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
      await this.$store.dispatch({ type: 'loadBoards'});
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
    // board(){
    //   return this.$store.getters.board
    // }
  },
};
</script>
