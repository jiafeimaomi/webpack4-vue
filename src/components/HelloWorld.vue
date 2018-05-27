<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    测试helloworld打包文件变化
    <p class="imgUrl"></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello world'
    }
  },
  mounted(){
    this.msg += ', 你好！'
  }
}
</script>

<style lang='scss'>
  @import 'assets/style/helloworld.scss';
</style>