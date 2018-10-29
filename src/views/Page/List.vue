<template>
    <div>
        <van-tabs v-model="active" style="padding-bottom: 50px;" swipeable :sticky="true" :offset-top="46">
            <van-tab title="最热">
                <page-list key="最热" :query="{ status: 'normal', type: '', content: '', secret: false }"></page-list>
            </van-tab>
            <van-tab title="最新">
                <page-list key="最新" :query="{ status: 'normal', type: '', content: '', secret: false }"></page-list>
            </van-tab>
            <van-tab title="关注">
                <page-list key="关注" :query="{ status: 'normal', type: '', content: '', secret: false }"></page-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPageList, searchPage }  from '@/api/page.ts';
@Component({
    components: {
        pageList: () => import('@/components/Page/List.vue')
    }
})
export default class Home extends Vue {
    active: number = 0;
}
</script>

