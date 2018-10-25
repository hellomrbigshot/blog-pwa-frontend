<template>
    <div>
        <div class="header">
            <van-icon name="arrow-left" color="#fff" class="back-icon"></van-icon>
            <div class="user-info">
                <img :src="imgUrl" alt="" @error="imgError" class="user-avatar">
                <div class="user-info-text">
                    <div class="user-info-name">{{ username }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class userInfo extends Vue {
    imgUrl: string = '';
    defultUrl: string = require('@/assets/img/avatar.jpg');
    get username () {
        return this.$route.params.username
    }
    mounted () {
        this.imgUrl = `/api/file/avatar/user?username=${this.username}`;
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    height: 180px;
    background: linear-gradient(to right, rgba(85,102,118,0.75), 	rgba(70,96,119,0.8));
    background: -webkit-linear-gradient(left, #556676, 	#466077);
    background: -o-linear-gradient(right, #556676, 	#466077);
    background: -moz-linear-gradient(right, #556676, 	#466077);
    .back-icon {
        position: absolute;
        left: 10px;
        top: 20px;
    }
    .user-info {
        position: absolute;
        left: 0;
        bottom: 0;
        padding-left: 10px; 
        top: 60px;
        overflow: hidden;
        width: 100%;
        .user-avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            float: left;
            margin-top: 30px;
        }
        .user-info-text {
            color: #fff;
            float: left;
            margin-left: 10px;
            .user-info-name {
                font-size: 18px;
            }
        }
    }
}
</style>
