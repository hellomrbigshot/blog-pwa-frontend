<template>
    <div>
        <van-nav-bar
            title="标题"
            left-text="返回"
            left-arrow
            @click-left="$router.go(-1)"
        />
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

    get id (): string {
        return this.$route.params.id;
    }
    mounted() {
        getPageDetail(this.id).then(res => {
            
        })
    }
}
</script>
