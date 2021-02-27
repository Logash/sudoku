<template>
<v-app>
    <v-app-bar
      app
      color="primary"
    >
      <slot name="header"></slot>
    </v-app-bar>

    <v-main>
      <v-card color="blue-grey lighten-5"
              class="d-flex justify-center align-center"
              height="100%">
        <slot></slot>
      </v-card>
    </v-main>

    <v-footer>
      <slot name="footer"></slot>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {}
</script>
