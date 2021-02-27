<template>
  <v-card class="pa-14" width="30%" min-width="400px">
    <v-form class="d-flex flex-column align-stretch">
      <v-text-field
        v-model="userName"
        :counter="20"
        label="Введите имя"
        required
      ></v-text-field>
      <v-btn
        color="success"
        class="mt-4"
        @click="login"
      >
        Войти
      </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import userStore from '@/store/modules/user'

@Component
export default class Login extends Vue {
  userName = ''
  valid = false

  async login () {
    await userStore.dispatchLogin(this.userName)
    this.$router.push({ name: 'Menu' })
  }
}
</script>
