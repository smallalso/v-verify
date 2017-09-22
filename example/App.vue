<style lang="less">
.github-icon {
  position: fixed;
  bottom: -60px;
  right: -60px;
  width: 120px;
  height: 120px;
  z-index: 9999;
  background-color: #41B883;
  transform: rotateZ(-45deg);
  background-image: url(http://owgk3x2u9.bkt.clouddn.com/github%20%281%29.svg);
  background-size: 30%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 50% 8%;
}
@media (max-width: 750px) {
  .github-icon {
    display: none;
  }
}
</style>

<template>
    <v-layout name="v-verify"
              :navConfig="navConfig">
      <router-view></router-view>
      <a href="https://github.com/joinyi/v-verify" target="_blank">
        <div class="github-icon">
        </div>
      </a>
    </v-layout>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      open: true,
      openWidth: 990,
      navConfig: [{
        title: '快速开始',
        list: [{
          title: '安装',
          path: '/start'
        }, {
          title: '使用',
          path: '/usage'
        }]
      }, {
        title: '用例展示',
        list: [{
          title: '基本用例',
          path: '/basic'
        }, {
          title: '提交验证',
          path: '/submit'
        }]
      }]
    }
  }
}
</script>
<style src="@/assets/style/basic.scss" lang="scss"></style>
<style src="@/assets/style/example.scss" lang="scss"></style>
