<template>
    <div>
        <div style="padding: 10px 15px; color: #999; background: #fff;">当前共有 <span style="color: #555; font-weight: 550;">{{ total }}</span> 个标签</div>
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="padding: 5px 15px 15px; background: #fff; margin-top: 10px; min-height: 70vh;">
            <router-link :to="{ name: 'tagDetail', params: { name: item.name }}" style="padding: 5px 0 15px; border-bottom: 1px dashed #888; display: block;" v-for="(item, index) in tagList" :key="index">
                <h4 style="font-size: 18px; color: #555; padding: 5px 0;">{{ item.name }}<span style="color: #888;">({{ item.page_num }})</span></h4> 
                <div style="color: #888; font-size: 12px;">{{ item.description }}</div>
            </router-link>
        </van-pull-refresh>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTagList } from '@/api/tag.ts';
@Component
export default class Tags extends Vue {
    tagList: object[] = [];
    page: number = 1;
    pageSize: number = 999;
    pullLoading: boolean = false;
    total: number = 0;
    mounted () {
        this.getTagList();
    }
    getTagList () {
        getTagList({ page: this.page, pageSize: this.pageSize })
            .then(res => {
                this.pullLoading = false;
                const { result, total } = res.data;
                this.tagList = result;
                this.total = total;
            })
    }
    onRefresh () {
        this.getTagList();
    }
}
</script>

