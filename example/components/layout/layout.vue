<style lang="less">
@import "~muse-components/styles/import.less";
.example-appbar{
  position: fixed;
  left: 256px;
  right: 0;
  top: 0;
  width: auto;
  transition: all .45s @easeOutFunction;
  &.nav-hide {
    left: 0;
  }
}
.example-content{
  padding-top: 54px;
  padding-left: 256px;
  transition: all .45s @easeOutFunction;
  &.nav-hide {
    padding-left: 0;
  }
}
@media (max-width: 750px) {
  .markdown-body {
    padding: 20px;
  }
  .example-content{
    padding-left: 0;
  }
}
.active {
  color: red;
}
</style>

<template>
    <div>
      <mu-drawer :open="open"
                 :docked="docked"
                 @close="toggleNav">
        <mu-appbar>
          {{name}}
        </mu-appbar>
        <mu-list @change="handleMenuChange" :value="menuVal">
          <mu-list-item v-for="nav in navConfig"
                        :key="nav.title"
                        :title="nav.title"
                        :open="true" toggleNested>
            <mu-list-item v-for="item in nav.list"
                          :key="item.title"
                          :value="item.path"
                          slot="nested"
                          :title="item.title" />
          </mu-list-item>
        </mu-list>
      </mu-drawer>
      <mu-appbar class="example-appbar" :class="{'nav-hide': !open}" :title="title">
        <mu-icon-button @click="toggleNav" icon="menu" slot="left"/>
        <mu-icon-button slot="right" href="https://github.com/museui/muse-ui" icon=":mudocs-icon-custom-github"/>
      </mu-appbar>
      <div class="example-content" :class="{'nav-hide': !open}">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'v-layout',
  data () {
    return {
      open: true,
      docked: true,
      mobileWidth: 750,
      menuVal: this.$route.path,
      title: null
    }
  },
  props: {
    name: String,
    openWidth: {
      type: Number,
      default: 990
    },
    navConfig: {
      type: [ Array ],
      required: true
    }
  },
  mounted () {
    if (window.innerWidth < this.openWidth) {
      this.open = false
    }
    if (window.innerWidth < this.mobileWidth) {
      this.docked = false
    }
    if (this.menuVal) {
      this.setTitle(this.menuVal)
    }
    window.addEventListener('resize', () => {
      this.handleResize(this.openWidth)
    })
  },
  methods: {
    toggleNav () {
      this.open = !this.open
    },
    handleResize (width) {
      if (window.innerWidth < width) {
        this.open = false
      } else {
        this.open = true
      }
      if (window.innerWidth < this.mobileWidth) {
        this.docked = false
      } else {
        this.docked = true
      }
    },
    handleMenuChange (val) {
      this.menuVal = val
      this.setTitle(val)
      this.$router.push({
        path: val
      })
    },
    setTitle (path) {
      if (!this.navConfig) return
      for (var i = 0; i < this.navConfig.length; i++) {
        if (this.navConfig[i].title) {
          this.title = this.navConfig[i].title
        }
        if (!this.navConfig[i].list) return
        for (var j = 0; j < this.navConfig[i].list.length; j++) {
          if (this.navConfig[i].list[j].path !== path) return
          this.title += `－${this.navConfig[i].list[j].title}`
          break
        }
      }
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
