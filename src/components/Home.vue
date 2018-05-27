<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <!--<img src="~assets/images/home.jpg">-->
    <div class="box">自动补充前缀</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: '欢迎来到首页！！！'
    }
  },
  mounted(){
    this.msg += 'nice to meet you!'
  }
}
</script>

<style lang='scss'>
  @import 'assets/style/home.scss';
  .box{
    width: 100px;
    height: 100px;
    transform: translateX(100px);
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>