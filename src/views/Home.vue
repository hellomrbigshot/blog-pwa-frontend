<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
        <tab-bar></tab-bar>
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
}
</script>