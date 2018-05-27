<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎进入登录页'
    }
  },
  mounted(){
    this.msg += ', 你好！'
  }
}
</script>
