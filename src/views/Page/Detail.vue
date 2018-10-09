<template>
    <div>
        <van-nav-bar
            title="世说新语"
            left-text="返回"
            left-arrow
            @click-left="$router.go(-1)"
        />
        <main class="container main-container" v-if="detail.content">
            <div class="page-detail">
                <div>
                    <h1>{{ detail.title }}</h1>
                </div>
                <div class="auto-info">
                    <a class="auto-avatar inline-block">
                        <img src="" alt="" class="inline-block ">
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
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPageDetail } from '@/api/page'
import mixin from '@/utils/mixin.ts'
@Component({
    mixins: [mixin]
})
export default class Detail extends Vue {
    detail: any = {};
    get id (): string {
        return this.$route.params.id;
    }
    mounted() {
        getPageDetail(this.id).then(res => {
            this.detail = res.data;
            this.$nextTick(() => {
                this.hljsCode();
            })
        })
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

