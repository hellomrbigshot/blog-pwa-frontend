<template>
    <div>
        <van-cell-group style="margin-top: 20px;">
            <van-cell title="头像" value="内容" />
            <van-cell title="昵称" value="内容"  />
        </van-cell-group>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class userSetting extends Vue {
    get username () {
        return this.$route.params.username
    }
    get info () {
        const info: any = localStorage.getItem('user');
        return JSON.parse(info);
    }
}
</script>

