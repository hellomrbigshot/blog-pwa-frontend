<template>
    <div class="page" @click="">
        <div class="page-tag">来自标签<span>{{ page.tags[0] }}</span></div>
        <div class="page-head">
            <h4>{{ page.title }}</h4>
        </div>
        <div class="page-content" v-html="page.content">
        </div>
        <div class="page-bottom">
            <span class="create-user">{{ page.create_user }}</span>
            <span class="dot">·</span>
            <span class="create-time">{{ page.create_date.substring(5, 10) }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Page extends Vue {
    @Prop() page: any;
}
</script>
<style lang="scss" scoped>
.page {
    margin-top: 15px;
    padding-bottom: 5px;
    color: #9E9E9E;
    border-bottom: 1px dashed #9E9E9E;
    .page-tag, .page-content {
        font-size: 14px;
        color: #9E9E9E;
    }
    .page-head {
        margin: 5px 0;
    }
    .page-content {
        margin-bottom: 15px;
    }
    .page-bottom {
        margin-bottom: 5px;
        .create-user {
            color: #666;
        }
        .dot {
            padding: 0 5px;
        }
        .create-time {
            font-size: 13px;
        }
    }
}
</style>


