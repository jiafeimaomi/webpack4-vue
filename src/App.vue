<template>
  <div class="app-wrapper">
    <ul class = 'guide'>
      <li @click="$router.push('/')">首页</li>
      <li @click="$router.push('/helloworld')">welcome页</li>
      <!--<li @click="$router.push('/helloworld')">welcome页</li>-->
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  methods: {

  },
  mounted(){
  }
}
</script>
<style lang='scss'>
  @import 'assets/style/reset.scss';
  @import 'assets/style/app.scss';
</style>
