<template>
    <div>
        <page-list key="关注" :query="{ status: 'draft', type: 'creator', content: Cookies.get('user') }" :api="api"></page-list>
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
export default class Draft extends Vue {
    api: string = '/api/page/limitpagelist';
}
</script>