<template>
  <v-card
    max-width="600"
    class="mx-auto"
  >
    <v-toolbar
      color="light-blue"
    >

      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
      <v-toolbar-title>알림</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-list
      subheader
      two-line
    >

      <v-list-item
        v-for="notice in this.$store.state.notification.notice"
        :key="notice.notificationId"
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title textContent="notice.notificationId">{{ notice.notificationId }}</v-list-item-title>

          <v-list-item-subtitle textContent="notice.notificationContent">{{ notice.notificationContent }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="check(notice.notificationId)">
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {

  methods: {
    check(notificationId) {
      axios.post(`/notification/${notificationId}`);
    }
  }
}
</script>

<style>
</style>