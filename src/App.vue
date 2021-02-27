<template>
  <Layout>
    <template v-slot:header>
      <Header></Header>
    </template>
    <template v-slot:default>
      <router-view></router-view>
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from './components/Layout.vue'
import Header from './components/Header.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Layout,
    Header
  }
})
</script>
