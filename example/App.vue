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
        title: '开始',
        list: [{
          title: 'test',
          path: '/test'
        }, {
          title: 'index',
          path: '/'
        }]
      }]
    }
  }
}
</script>
<style src="@/assets/style/basic.scss" lang="scss"></style>
