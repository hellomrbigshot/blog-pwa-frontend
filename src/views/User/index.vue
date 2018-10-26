<template>
    <div>
        <div class="header">
            <van-icon name="arrow-left" color="#fff" class="back-icon"></van-icon>
            <div class="user-info">
                <img :src="imgUrl" alt="" @error="imgError" class="user-avatar">
                <div class="user-info-text">
                    <div class="user-info-name">{{ username }}</div>
                    <div class="user-info-bio">{{ userInfo.bio }}</div>
                    <div class="user-info-oauths">
                        <van-icon name="github-fill" size="22px" :color="oauth_accounts.github.oauth&&'#24292e'||'#fff'"/>
                        <van-icon name="weibo" size="22px" style="margin-left: 5px;" :color="oauth_accounts.github.oauth&&'#e6162d'||'#fff'"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <van-tabs v-model="active">
                <van-tab title="动态()">
                    
                </van-tab>
                <van-tab title="文章()">

                </van-tab>
                <van-tab title="评论()">
                    
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getUserDetail } from '@/api/login'
@Component
export default class userInfo extends Vue {
    imgUrl: string = '';
    defaultUrl: string = require('@/assets/img/avatar.jpg');
    userInfo: any = {
        oauthinfo: {}
    };
    oauth_accounts: any = {
        github: {
            oauth: false,
            oauth_user: ''
        },
        weibo: {
            oauth: false,
            oauth_user: ''
        }
    };
    active: number = 0;
    get username () {
        return this.$route.params.username
    }
    mounted () {
        this.imgUrl = `/api/file/avatar/user?username=${this.username}`;
        getUserDetail(this.username).then((res: any) => {
            this.userInfo = res.data;
            Object.keys(this.oauth_accounts).forEach(type => {
                let filter_oauth_obj = this.userInfo.oauthinfo.find((item: any) => item.type === type)
            if (filter_oauth_obj) {
                this.oauth_accounts[type].oauth = true
                this.oauth_accounts[type].oauth_user =
                filter_oauth_obj.domain || filter_oauth_obj.name
            } else {
                this.oauth_accounts[type].oauth = false
                this.oauth_accounts[type].oauth_user = ''
            }
            })
        })
    }
    imgError () {
        this.imgUrl = this.defaultUrl;
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    height: 180px;
    padding-left: 10px;
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
    }
}
</style>
