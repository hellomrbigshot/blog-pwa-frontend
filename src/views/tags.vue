<template>
    <div>
        
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
    mounted () {
        this.getTagList();
    }
    getTagList () {
        getTagList({ page: this.page, pageSize: this.pageSize })
            .then(res => {
                const { result } = res.data;
                this.tagList = result;
            })
    }
}
</script>

