<template>
    <div class="content-center">
        <img :src="imgUrl"/>
        <van-button size="small" type="primary" @click="$router.go(-1)">返回</van-button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class login extends Vue {
    imgUrl: string = require('@/assets/img/404_black_transparent.png');
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


