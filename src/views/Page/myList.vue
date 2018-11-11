<template>
    <page-list key="关注" :query="{ status: 'normal', type: 'create_user', content: Cookies.get('user') }" :api="api"></page-list>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {
        pageList: () => import('@/components/Page/List.vue')
    }
})
export default class myList extends Vue {
    api: string = '/api/page/limitpagelist';
}
</script>