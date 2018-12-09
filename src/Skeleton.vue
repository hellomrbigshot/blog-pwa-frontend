<template>
    <div class="skeleton-wrapper">
        <header class="skeleton-header">
            <div class="skeleton-header-center"></div>
        </header>
        <section class="skeleton-block">
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-bottom">
                    <div class="skeleton-page-bottom-man"></div>
                    <div class="skeleton-page-bottom-time"></div>
                </div>
            </div>
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-bottom">
                    <div class="skeleton-page-bottom-man"></div>
                    <div class="skeleton-page-bottom-time"></div>
                </div>
            </div>
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-bottom">
                    <div class="skeleton-page-bottom-man"></div>
                    <div class="skeleton-page-bottom-time"></div>
                </div>
            </div>
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-content"></div>
                <div class="skeleton-page-bottom">
                    <div class="skeleton-page-bottom-man"></div>
                    <div class="skeleton-page-bottom-time"></div>
                </div>
            </div>
            <div class="skeleton-bottom"></div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'skeleton'
};
</script>

<style scoped lang="scss">
.skeleton-wrapper {
    height: 100vh;
    overflow: hidden;
}
.skeleton-header {
  height: 46px;
  background: #fafafa;
  width: 100%;
  overflow: hidden;
}
.skeleton-header .skeleton-header-center {
    width: 130px;
    height: 36px;
    margin: 5px auto;
    background: #fff;
}

.skeleton-block {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  margin: 0 15px;
}
.skeleton-block .skeleton-page-tag {
  background: #fafafa;
  height: 19px;
  width: 100px;
}
.skeleton-block .skeleton-page-header {
  background: #fafafa;
  height: 28px;
  margin: 5px 0;
  width: 150px;
}
.skeleton-block .skeleton-page-content {
  background: #fafafa;
  height: 26px;
  margin-bottom: 4px;
}
.skeleton-page-bottom {
    height: 26px;
    margin-bottom: 10px;
}
.skeleton-page-bottom div {
    display: inline-block;
    background: #fafafa;
    height: inherit;
}
.skeleton-page-bottom .skeleton-page-bottom-man {
    width: 80px;
}
.skeleton-page-bottom .skeleton-page-bottom-time {
    width: 40px;
    margin-left: 5px;
}
.skeleton-block .skeleton-bottom {
  background: #fafafa;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>