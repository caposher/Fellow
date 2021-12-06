<template>
  <section class="card-popup main-menu">
    <header class="popup-header">
      <h4>Menu</h4>
      <div @click="$emit('close')">
        <span class="close-popup icon-md icon-close"></span>
      </div>
    </header>
    <ul class="main-menu-actions">
      <li class="menu-about">
        <h3><span class="menu-action-icon icon-lg icon-board"></span> About this board</h3>
        <p>Add a description to your board</p>
      </li>
      <li class="menu-action" @click="isChangeColor = true">
        <span class="icon-img" :style="{ backgroundImage: 'url(' + setImgIcon + ')' }"></span>
        <h3>Change background</h3>
      </li>
    </ul>
    <ul class="main-menu-activity">
      <li></li>
    </ul>

    <!-- Change background -->
    <section v-show="isChangeColor" class="card-popup main-menu">
      <header class="popup-header">
        <h4>Change background</h4>
        <span @click="isChangeColor = false" class="back-popup icon-md icon-back"></span>
        <div>
          <span @click="$emit('close')" class="close-popup icon-md icon-close"></span>
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
        <div class="menu-background-size action-btn"><span class="back-popup icon-md icon-back"></span></div>
      </section>
    </section>

    <!-- Change background -  solid color -->
    <section v-show="isColorSelected" class="card-popup main-menu">
      <header class="popup-header">
        <h4>Colors</h4>
        <span @click="isColorSelected = false" class="back-popup icon-md icon-back"></span>
        <div>
          <span @click="$emit('close')" class="close-popup icon-md icon-close"></span>
        </div>
      </header>
      <ul class="menu-color-set">
        <li v-for="color in colorSet" :key="color">
          <div class="menu-background-size" :style="{ backgroundColor: color }"></div>
        </li>
      </ul>
    </section>

    <!-- Change background - imgs -->
    <section v-show="isPhotosSelected" class="card-popup main-menu">
      <header class="popup-header">
        <h4>Photos</h4>
        <span @click="isPhotosSelected = false" class="back-popup icon-md icon-back"></span>
        <div>
          <span @click="$emit('close')" class="close-popup icon-md icon-close"></span>
        </div>
      </header>
      <div class="main-menu-search">
        <!-- <span class="icon-md icon-search"></span> -->
        <input type="text" v-model="searchKey" @change="requestPhotos()" />
      </div>
      <ul class="menu-color-set">
        <li v-for="(url, idx) in getImgs" :key="idx">
          <div
            @click="setBg(url)"
            class="menu-background-size"
            :style="{ backgroundImage: 'url(' + url.regular + ')' }"
          ></div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isChangeColor: false,
      isColorSelected: false,
      isPhotosSelected: false,
      searchKey: '',
      colorSet: ['#0079bf', '#d29134', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#13aecc', '#838c91'],
    };
  },

  methods: {
    requestPhotos() {
      this.isPhotosSelected = true;
      this.$store.dispatch({ type: 'requestPhotos', searchKey: this.searchKey });
    },
    setBg(bg) {
      const boardId = this.$store.getters.boardId;
      this.$store.dispatch({ type: 'setBackground', boardId, url: bg.full });
    },
  },
  computed: {
    setImgIcon() {
      return this.$store.getters.board.style.imgUrl;
    },
    getImgs() {
      return this.$store.getters.getBgPhotos;
    },
  },
};
</script>
