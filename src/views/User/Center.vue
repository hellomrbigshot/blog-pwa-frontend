<template>
  <div>
    <div class="user-header" @click="toUserInfoPage">
      <template v-if="!username">
        <div class="avatar-icon">
          <van-icon 
            name="contact"
            size="25px"
            color="#fff"
          />
        </div>
        <div class="user-info">
          登录/注册
        </div>
        <van-icon
          name="arrow"
          style="line-height: 40px; float: right;"
        />
      </template>
      <template v-else>
        <div class="avatar-icon">
          <img v-lazy="imgUrl" alt="" class="avatar-img" @error="imgError">
        </div>
        <div class="user-info">
          <h4>{{ Cookies.get('user') }}</h4>
        </div>
        <van-icon name="arrow" style="line-height: 40px; float: right;" />
      </template>
    </div>
    <van-cell-group style="margin-top: 10px;">
      <van-cell size="large" title="写文章" @click="$router.push({ name: 'pageCreate' })">
        <i class="iconfont iconNew-article van-cell__left-icon" style="font-size: 20px; color: #2db7f5;" slot="icon" />
      </van-cell>
      <van-cell size="large" title="消息中心" @click="$router.push({ name: 'commentList' })">
        <van-icon slot="icon" name="chat" color="#2db7f5" size="20" class="van-cell__left-icon" />
      </van-cell>
      <van-cell size="large" title="文章列表" @click="$router.push({ name: 'myList' })">
        <van-icon slot="icon" name="wap-nav" size="20" color="#19b16b" class="van-cell__left-icon" />
      </van-cell>
      <van-cell size="large" title="草稿箱" @click="$router.push({ name: 'draft' })">
        <van-icon slot="icon" name="tosend" color="#ff972a" size="20" class="van-cell__left-icon" />
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: 10px;" v-if="username">
      <van-cell size="large" title="退出登录" icon="setting" @click="Singout">
        <i class="iconfont iconSignout van-cell__left-icon" style="font-size: 20px; color: #2db7f5;" slot="icon" />
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { signoutApi } from '@/api/login'
@Component
export default class Mine extends Vue {
  imgUrl: string = require('@/assets/img/avatar.jpg')
  defaultImg: string = require('@/assets/img/avatar.jpg')
  username: string = ''
  mounted() {
    this.username = this.Cookies.get('user')
    if (this.username) {
      this.imgUrl = `/api/file/avatar/user?username=${this.Cookies.get('user')}`
    }
  }
  activated() {
    this.username = this.Cookies.get('user')
    if (this.username) {
      this.imgUrl = `/api/file/avatar/user?username=${this.Cookies.get('user')}`
    }
  }
  imgError() {
    this.imgUrl = this.defaultImg
  }
  toUserInfoPage() {
    if (this.username) {
      this.$router.push({ name: 'userInfo', params: { username: encodeURIComponent(this.username) } })
    } else {
      this.$router.push({ name: 'login' })
    }
  }
  Singout() {
    signoutApi().then((res: any) => {
      this.Cookies.remove('user')
      this.Cookies.remove('token')
      this.Cookies.remove('refreshToken')
      this.$router.push({ name: 'pageListPage' })
    })
  }
}
</script>
<style lang="scss" scoped>
.user-header {
  padding: 10px 15px;
  background: #fff;
  overflow: hidden;
  margin: 10px 0;
  .avatar-icon {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background: #eee;
    float: left;
    .avatar-img {
      border-radius: 50%;
    }
  }

  .user-info {
    font-size: 22px;
    font-weight: 600;
    margin-left: 15px;
    float: left;
    h4 {
      font-weight: bolder;
      font-size: 20px;
      color: #333;
    }
  }
}
.van-cell__left-icon {
  font-size: 20px;
}
</style>


