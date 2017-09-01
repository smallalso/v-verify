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
</style>

<template>
    <div>
      <mu-drawer :open="open">
        <mu-appbar>
          v-verify
        </mu-appbar>
        <mu-list @change="handleMenuChange">
          <mu-list-item title="开始" :open="true" toggleNested>
            <mu-list-item value="/test" slot="nested" title="test1" />
            <mu-list-item value="/" slot="nested" title="test2" />
            <mu-list-item slot="nested" title="test3" />
          </mu-list-item>
          <mu-list-item title="案例" toggleNested>
            <mu-list-item slot="nested" title="test1" />
            <mu-list-item slot="nested" title="test2" />
            <mu-list-item slot="nested" title="test3" />
          </mu-list-item>
        </mu-list>
      </mu-drawer>
      <mu-appbar class="example-appbar" :class="{'nav-hide': !open}">
        <mu-icon-button @click="toggleNav" icon="menu" slot="left"/>
        <mu-icon-button slot="right" href="https://github.com/museui/muse-ui" icon=":mudocs-icon-custom-github"/>
      </mu-appbar>
      <div class="example-content" :class="{'nav-hide': !open}">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      open: true,
      openWidth: 990
    }
  },
  mounted () {
    if (window.innerWidth < this.openWidth) {
      this.open = false
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
    },
    handleMenuChange (val) {
      console.log(val)
      this.$router.push({
        path: val
      })
      // this.menuVal = val
      // if (this.docked) {
      //   window.location.hash = this.menuVal
      // } else {
      //   this.changeHref = true
      // }
      // this.$emit('change', val)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style src="@/assets/style/basic.scss" lang="scss"></style>
