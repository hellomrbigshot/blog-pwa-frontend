<template>
    <div class="badge">
        <slot name="content">
            <span>{{ content }}</span>
        </slot>
        <div class="badge-info">
            <slot name="info">{{ info }}</slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mixin from '@/utils/mixin.ts'
@Component({
    mixins: [mixin]
})
export default class Badge extends Vue {
    @Prop({ default: '' }) content!: string
    @Prop({ default: 0 }) info!: number
}
</script>
<style lang="scss" scoped>
.badge {
    position: relative;
    width: 25px;
    // padding: 10px;
    .badge-info {
        position: absolute;
        top: -1px;
        left: 12px;
        font-size: 0.1em;
        line-height: 1;
        transform: scale(0.65);
    }
}
</style>


