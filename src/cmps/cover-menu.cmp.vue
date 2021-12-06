<template>
  <section class="cover-menu">
    <!-- <form @submit.prevent="changeCover"> -->
    <label class="">Size</label>
    <label class="">Colors</label>
    <div class="colors-container">
     <button v-for="(colorCode) in colors" :key="colorCode"
        @click="makeCover(colorCode)"
        class="color"
        :style="{ backgroundColor: colorCode }"
        :class="{'selected-btn':card.cover===colorCode}"
      ></button>
    </div>
    <label class="img-attachs">Attachments</label>
    <div class="attachments-container">
      <button
        v-for="img in imgAttachs"
        :key="img.href"
        :class="{'selected-btn':card.cover===img.href}"
        :style="backgroundImg(img)"
        @click="makeCover(img.href)"
      ></button>
    </div>
    <label class="" >Unsplash</label>
    <button @click="unsplashImgs"> imgs</button>
  </section>
</template>

<script>
export default {
  props: {
    card: {
      type: Object
    }
  },
  data() {
    return {
      colors: ["#7bc86c", "#f5dd29", "#ffaf3f", "#ef7564", "#cd8de5", "#5ba4cf", "#29cce5", "#6deca9", "#ff8ed4", "#172b4d"]
    };
  },
  created(){

  },
  methods: {
    makeCover(val) {
      this.$emit("makeCover", val);
    //   console.log(val);
    },
    backgroundImg(img) {
    //   console.log("img", img);
      return { backgroundImage: `url("${img.href}")` };
    },
      unsplashImgs(){
          var imgs = this.$store.getters.getBgPhotos
          console.log(imgs);
      }
  },
  computed: {
    imgAttachs() {
      if (!this.card.attachments) return;
      return this.card.attachments.filter(
        attachment => attachment.type === "img"
      );
    },
  }
};
</script>

<style>
</style>