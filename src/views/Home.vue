<template>
    <div>
        <div>
            <keep-alive :include="aliveArray">
                <router-view></router-view>
            </keep-alive>
        </div>
        <tab-bar v-if="typeof $route.meta.tab_active !== 'undefined'"></tab-bar>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
        tabBar: () => import('@/components/tabBar.vue')
    }
})
export default class Home extends Vue {
    @Prop() private title!: string;
    active: number = 0;
    aliveArray: [string] = ['pageList'];
}
</script>