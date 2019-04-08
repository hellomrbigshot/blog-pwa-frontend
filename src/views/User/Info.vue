<template>
  <div ref="userBox">
    <div class="header" v-show="top<160">
      <van-icon name="arrow-left" color="#fff" class="back-icon" @click="$router.go(-1)"></van-icon>
      <div class="user-info">
        <img :src="imgUrl" alt="" @error="imgError" class="user-avatar">
        <div class="user-info-text">
          <div class="user-info-name">{{ username }}</div>
          <div class="user-info-bio">{{ userInfo.bio }}</div>
          <div class="user-info-oauths">
            <a :href="oauthAccounts.github.oauth&&`https://github.com/${oauthAccounts.github.oauth_user}`||'#'">
              <van-icon name="github-fill" size="22px" :color="oauthAccounts.github.oauth&&'#24292e'||'#fff'" />
            </a>
            <a :href="oauthAccounts.weibo.oauth&&`https://weibo.com/${oauthAccounts.weibo.oauth_user}`||'#'">
              <van-icon name="weibo" size="22px" style="margin-left: 5px;" :color="oauthAccounts.weibo.oauth&&'#e6162d'||'#fff'" />
            </a>
          </div>
        </div>
        <router-link v-if="editLimit" class="user-info-edit" :to="{ name: 'userSetting', params: { username: username }}">编辑</router-link>
      </div>
    </div>
    <div v-show="top>160">
      <van-nav-bar :title="username" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="content">
      <van-tabs v-model="active" sticky>
        <van-tab :title="`动态(${activityNum})`">
          <activity-list :query="{ create_user: username }"></activity-list>
        </van-tab>
        <van-tab :title="`文章(${pageNum})`">
          <activity-list :query="{ create_user: username, type: 'page' }"></activity-list>
        </van-tab>
        <van-tab :title="`评论(${commentNum})`">
          <activity-list :query="{ create_user: username, type: 'comment' }"></activity-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import mixin from '@/utils/mixin'
import { getUserDetail } from '@/api/login'
import { getActivityList, getActivityNum } from '@/api/activity'
@Component({
  mixins: [mixin],
  components: {
    activityList: () => import('@/components/Activity/List.vue'),
    pageList: () => import('@/components/Page/List.vue')
  }
})
export default class userInfo extends Vue {
  api: string = '/api/page/pagelist'
  throttleScroll: any
  imgUrl: string = ''
  top: number = 0
  editLimit: boolean = false
  username: string = ''
  defaultUrl: string = require('@/assets/img/avatar.jpg')
  userInfo: any = {
    oauthinfo: {}
  };
  oauthAccounts: any = {
    github: {
      oauth: false,
      oauth_user: ''
    },
    weibo: {
      oauth: false,
      oauth_user: ''
    }
  };
  active: number = 0
  activityNum: number = 0
  pageNum: number = 0
  commentNum: number = 0
  created() {
    this.username = decodeURIComponent(this.$route.params.username)
    this.init()
  }
  imgError() {
    this.imgUrl = this.defaultUrl
  }
  init() {
    this.imgUrl = `/api/file/avatar/user?username=${this.username}`
    getUserDetail(this.username).then((res: any) => {
      this.userInfo = res.data;
      Object.keys(this.oauthAccounts).forEach(type => {
        let filterOauthObj = this.userInfo.oauthinfo.find((item: any) => item.type === type)
        if (filterOauthObj) {
          this.oauthAccounts[type].oauth = true
          this.oauthAccounts[type].oauth_user =
            filterOauthObj.domain || filterOauthObj.name
        } else {
          this.oauthAccounts[type].oauth = false
          this.oauthAccounts[type].oauth_user = ''
        }
      })
      if (this.userInfo.username === this.Cookies.get('user')) this.editLimit = true
    })
    getActivityNum({ create_user: this.username, type: '' }).then((res: any) => {
      this.activityNum = res.data
    })
    getActivityNum({ create_user: this.username, type: 'page' }).then((res: any) => {
      this.pageNum = res.data
    })
    getActivityNum({ create_user: this.username, type: 'comment' }).then((res: any) => {
      this.commentNum = res.data
    })
    this.throttleScroll = this.throttle(() => {
      this.top = (document.documentElement as any).scrollTop
    }, 200)
    let box: any = this.$refs.userBox
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 180px;
  padding-left: 10px;
  background: linear-gradient(
    to right,
    rgba(85, 102, 118, 0.75),
    rgba(70, 96, 119, 0.8)
  );
  background: -webkit-linear-gradient(left, #556676, #466077);
  background: -o-linear-gradient(right, #556676, #466077);
  background: -moz-linear-gradient(right, #556676, #466077);
  .back-icon {
    position: absolute;
    left: 10px;
    top: 20px;
  }
  .user-info {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 60px;
    overflow: hidden;
    padding-left: 10px;
    .user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      float: left;
      margin-top: 30px;
    }
    .user-info-text {
      color: #fff;
      float: left;
      margin: 15px 0 0 20px;
      .user-info-name {
        font-size: 18px;
      }
      .user-info-bio {
        font-size: 12px;
        margin-top: 10px;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .user-info-oauths {
        position: absolute;
        bottom: 15px;
      }
    }
    .user-info-edit {
      font-size: 12px;
      position: absolute;
      color: #0099ff;
      right: 30px;
      top: 15px;
      padding: 2px 3px;
      border: 1px solid #0099ff;
      border-radius: 5px;
    }
  }
}
</style>
