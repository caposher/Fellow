<template>
   <div class="img-upload-container">
       <label class="clickable add-img" v-if="!isLoading">
       <input type="file" id="uploadImg" @change="onUploadImg" hidden />
       </label>
       <img v-else :src="require('../assets/img/loader.svg')" alt="" />
   </div>
</template>

<script>
import { uploadImg } from '@/services/imgUpload.service.js'

export default {
data() {
    return {
        isLoading: false
    }
},
methods: {
    async onUploadImg(ev) {
        this.isLoading = true
        let res = await uploadImg(ev);
        // console.log(res);
        this.$emit('onSaveImg', res.url)
        this.isLoading = false
    }
}
}
</script>

<style>

</style>