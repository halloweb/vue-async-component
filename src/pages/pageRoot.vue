<template>
  <div>
    'ppp'
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import pageConfig from '@/pages/pageConfig'
export default {
  data () {
    return {
      currentComponent: '',
      componentName: ''
    }
  },
  methods: {
    renderComponent () {
      if (pageConfig[this.componentName].type === 'local-async') {
        this.currentComponent = (resolve) => ({
          component: import(`@/pages/${this.componentName}`),
          loading: { template: '<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载中</div></div></div>' },
          error: { template: '<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载错误</div></div></div>' },
          delay: 200,
          timeout: 10000
        })
      } else if (pageConfig[this.componentName].type === 'local') {
        require(`@/pages/${this.componentName}`)
        this.currentComponent = this.componentName
      } else if (pageConfig[this.componentName].type === 'remote') {
        if (!window[this.componentName]) {
          window.Vue.component(this.componentName, (resolve, reject) => {
            this.loadScript(pageConfig[this.componentName].src).then(() => {
              resolve(window[this.componentName])
            }).catch(() => {
              reject()
            })
          })
        }
        this.currentComponent = this.componentName
      }
    },
    loadScript (url) {
      console.log(url)
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        // ie9+,chrome,ff
        script.onload = function () {
          resolve(url)
        }

        let oHead = document.getElementsByTagName('head')[0]
        oHead.insertBefore(script, oHead.firstChild)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.componentName = this.$route.params.branch
      this.renderComponent()
    }
  },
  created () {
    console.log('aa')
    this.componentName = this.$route.params.branch
    this.renderComponent()
  }
}
</script>
