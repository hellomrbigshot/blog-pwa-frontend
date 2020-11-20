<template>
  <div class="content-center">
    <img :src="imgUrl" />
    <div>
      <van-button size="small" type="primary" @click="$router.go(-1)">返回</van-button
      >
    </div>
    <div>
      <van-button
        size="small"
        style="margin-top: 10px;"
        @click="$router.push({ name: 'pageListPage' })"
      >首页</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class login extends Vue {
  imgUrl: string = require('@/assets/img/404_black_transparent.png')
}
</script>
<style lang="scss" scoped>
.content-center {
  margin-top: 30vh;
  text-align: center;
  img {
    display: block;
    margin: 0 auto;
  }
}
</style>
