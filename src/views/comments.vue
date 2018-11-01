<template>
    <div>
        <van-tabs v-model="active" sticky :offset-top="46">
            <van-tab title="我收到的">
                <comment-list :query="{ type: 'to_user', create_user: '', to_user: Cookies.get('user') }"></comment-list>
            </van-tab>
            <van-tab title="我发出的">
                <comment-list :query="{ type: 'create_user', create_user: Cookies.get('user'), to_user: '' }"></comment-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {
        commentList: () => import('@/components/Comment/List.vue')
    }
})
export default class commentsPage extends Vue {
    active: number = 0;
}
</script>

