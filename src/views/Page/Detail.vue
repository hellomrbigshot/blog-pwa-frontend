<template>
    <div>
        <main class="container main-container" style="margin: 50px 0;" v-if="detail.content" ref="scrollBody">
            <div class="page-detail">
                <div>
                    <h1>{{ detail.title }}</h1>
                </div>
                <div class="auto-info">
                    <a class="auto-avatar inline-block">
                        <img :src="imgUrl" alt="头像" class="inline-block" ref="img" @error="imgError">
                    </a>
                    <div class="auto-info-text">
                        <div class="auto-name">{{ detail.create_user }}</div>
                        <div class="auto-create-time">{{ formatTime(detail.create_date, '3') }}发布</div>
                    </div>
                </div>
                <div class="page-content" v-html="marked(detail.content)"></div>
            </div>
            <div></div>    

        </main>
        <set-comment :detail="detail"></set-comment>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPageDetail } from '@/api/page'
import mixin from '@/utils/mixin.ts'
import { setTimeout } from 'timers';
@Component({
    mixins: [mixin],
    components: {
        setComment: () => import('./components/setComment.vue')
    }
})
export default class pageDetail extends Vue {
    detail: any = {}
    title: string = '世说新语'
    box: any = {}
    imgUrl: string = require('../../assets/img/avatar.jpg')
    defaultImg: string = require('../../assets/img/avatar.jpg')
    get id (): string {
        return this.$route.params.id;
    }
    mounted() {
        getPageDetail(this.id).then(res => {
            this.detail = res.data;
            this.imgUrl = `/api/file/avatar/user?username=${this.detail.create_user}`;
            setTimeout(() => {
                this.hljsCode();
            }, 50);
        })
    }
    imgError () {
        this.imgUrl = this.defaultImg
    }
}
</script>
<style lang="scss" scoped>
    .auto-info {
        margin-top: 10px;
        display: flex;
        .auto-avatar {
            padding-right: 10px;
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .auto-info-text {
            .auto-name {
                font-size: 15px;
                font-weight: 700;
            }
            .auto-create-time {
                font-size: 13px;
                color: #909090;
                margin-top: 2px;
            }
        }
    }
</style>

