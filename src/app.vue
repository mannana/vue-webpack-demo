<template>
  <div id="app">
    <div id="cover"></div>
    <Header/>
    <Todo/>
    <Footer/>
  </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'
export default {
  components:{
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absoute
}
</style>