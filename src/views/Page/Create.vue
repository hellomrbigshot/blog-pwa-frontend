<template>
  <div>
    <div class="nav-bar">
      <i :class="['iconfont', step==='title'&&'iconcross'||'iconcc-arrow-left', 'nav-bar-left']" slot="left" @click="handleBack"/>
      <div class="nav-bar-title">
        <div v-if="!showErrorMsg">{{ stepMapping[step] }}</div>
        <div v-else class="error-msg">{{ errorMsg }}</div>
      </div>
      <div :class="['nav-bar-right', forwardAvaliable && 'active' || '']" slot="right" @click="handleForward">下一步</div>
    </div>
    <div class="title-content" v-if="step === 'title'">
      <textarea type="textarea" style="border: none;" v-model="page.title" ref="input"/>
    </div>
    <div class="tag-content" v-else-if="step === 'tag'">
      <div class="tag-list" v-if="page.tag.length">
        <div class="tag-item" v-for="(tag, i) in page.tag" @click="handleTag(tag, i)" :key="i">{{ tag }}</div>
      </div>
      <div class="input-wrapper">
        <input v-model="tagSearchStr" ref="input" v-debounce="[($e) => { filterTag($e) }, 500]"/>
      </div>
      <div class="tag-ul-wrapper">
        <ul class="tag-ul">
          <li class="tag-li" v-for="(tag, i) in showTagList" :key="i" @click="addTag(tag)">
            <div class="tag-icon">{{ tag.trim().substring(0, 1) }}</div>
            <div class="tag-name">{{ tag }}</div>
          </li>
        </ul>
      </div>
      <van-actionsheet
        v-model="showActionSheet"
      >
        <div class="create-action">
          <div>删除标签   {{ deleteTag.tag }}</div>
          <div class="create-btn" @click="handleDeleteTag(true)">确认</div>
          <div class="create-btn" @click="handleDeleteTag(false)">取消</div>
        </div>
      </van-actionsheet>
    </div>
    <div class="content-content" v-else-if="step === 'content'">
      <textarea type="textarea" style="border: none;" v-model="page.content" ref="input"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from '@/utils/methods'
import { getAllTags } from '@/api/tag'
import { newPage } from '@/api/page'
Vue.directive('debounce', {
  bind (el: any, { value }: any, vnode: any) {
    const [target, time] = value
    const debounced = debounce(target, vnode, time)
    el.addEventListener('input', debounced)
    el._debounced = debounced
  }
})
@Component
export default class Create extends Vue {
  step: string = 'title'
  errorMsg: string = ''
  showErrorMsg: boolean = false
  forwardAvaliable: boolean = false
  showActionSheet: boolean = false
  tagSearchStr: string = ''
  deleteTag: any = {
    tag: '',
    index: 0
  }
  tagList: any[] = []
  showTagList: any[] = []
  stepMapping: any = {
    title: '添加标题',
    tag: '添加标签',
    content: '添加内容'
  }
  page: any = {
    title: '',
    tag: [],
    content: ''
  }
  @Watch('step')
  onStepChange (newVal: string) {
    this.validateForm()
    this.showErrorMsg = false
    this.errorMsg = ''
    setTimeout(() => {
      const input = this.$refs['input'] as HTMLElement
      input.focus()
    }, 100)
  }
  @Watch('page', { deep: true })
  onPageChange (newVal: any) {
    this.validateForm()
  }
  mounted() {
    const input = this.$refs['input'] as HTMLElement
    input.focus()
    this.getAllTagList()
  }
  handleForward() {
    if (!this.forwardAvaliable) {
      return
    }
    const stepArr = Object.keys(this.stepMapping)
    const currentStepIndex = stepArr.indexOf(this.step)
    if (currentStepIndex === stepArr.length - 1) {
      // 提交文章
      newPage(this.page.title, this.page.tag, this.page.content).then(res => {
        this.$toast.success('发表成功')
        setTimeout(() => {
          this.$router.push({ name: 'pageListPage' })
        }, 1000)
      })
    } else {
      // 跳转到下一步
      this.step = stepArr[currentStepIndex + 1]
    }
  }
  handleBack() {
    const stepArr = Object.keys(this.stepMapping)
    const currentStepIndex = stepArr.indexOf(this.step)
    if (currentStepIndex === 0) {
      // 退到上一个界面
      this.$router.go(-1)
    } else {
      // 跳转到上一步
      this.step = stepArr[currentStepIndex - 1]
    }
  }
  getAllTagList() {
    getAllTags().then((res: any) => {
      this.tagList = res.data
    })
  }
  validateForm() {
    if (this.step === 'title') {
      if (this.page.title.trim()) {
        this.forwardAvaliable = true
        this.errorMsg = ''
        this.showErrorMsg = false
      } else {
        this.forwardAvaliable = false
        this.errorMsg = '标题不能为空'
        this.showErrorMsg = true
      }
    }
    if (this.step === 'tag') {
      if (this.page.tag.length) {
        this.forwardAvaliable = true
        this.errorMsg = ''
        this.showErrorMsg = false
      } else {
        this.forwardAvaliable = false
        this.errorMsg = '至少要选一个标签'
        this.showErrorMsg = true
      }
    }
    if (this.step === 'content') {
      if (this.page.content.trim().length > 10) {
        this.forwardAvaliable = true
        this.errorMsg = ''
        this.showErrorMsg = false
      } else {
        this.forwardAvaliable = false
        this.errorMsg = '内容要超过10个字'
        this.showErrorMsg = true
      }
    }
  }
  filterTag(e: string) {
    if (!this.tagSearchStr.trim()) {
      this.showTagList = []
    } else {
      this.showTagList = this.tagList.filter((tag: any) => {
        return tag.indexOf(this.tagSearchStr) > -1
      })
    }
  }
  addTag(tag: any) {
    if (this.page.tag.includes(tag)) {
      return
    } else {
      this.page.tag.push(tag)
    }
  }
  handleTag(tag: any, i: number) {
    this.deleteTag.tag = tag
    this.deleteTag.index = i
    this.showActionSheet  = true
  }
  handleDeleteTag(del: boolean) {
    if (del) {
      this.page.tag.splice(this.deleteTag.index, 1)
      this.showActionSheet = false
    } else {
      this.showActionSheet = false
      this.deleteTag.tag = ''
      this.deleteTag.index = 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/create.scss';
</style>
