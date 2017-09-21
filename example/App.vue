<style lang="less">
</style>

<template>
    <v-layout name="v-verify"
              :navConfig="navConfig">
      <router-view></router-view>
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
          title: '用例展示',
          path: '/'
        }]
      }]
    }
  }
}
</script>
<style src="@/assets/style/basic.scss" lang="scss"></style>
<style src="@/assets/style/example.scss" lang="scss"></style>
