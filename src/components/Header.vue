<template>
  <v-flex class="d-flex justify-space-between align-center flex-grow-1">
    <div style="width: 48px"></div>
    <v-card-title class="">SUDOKU</v-card-title>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          class="avatar"
          color="green"
          size="48"
          v-bind="attrs"
          v-on="on">
          {{userInitials}}
        </v-avatar>
      </template>
      <v-list>
          <v-list-item key="logout">
            <v-list-item-title @click="logout">{{ 'Выход' }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import userStore from '@/store/modules/user'

@Component
export default class Header extends Vue {
  get userInitials () {
    return userStore.getInitials
  }

  async logout () {
    await userStore.dispatchLogout()
    await this.$router.push({ name: 'Login' })
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    color: white;
  }
</style>
