<template>
  <v-container max-width="900">
    <div class="mb-8 text-h5">
      Учетные записи
      <v-btn
        icon="mdi-plus"
        class="ml-2 text-h5"
        @click="userStore.createUser"
        :disabled="!userStore.isAllOk"
      ></v-btn>
    </div>
    <v-alert icon="mdi-help-circle"
      >Для указания нескольких меток для одной пары используйте разделитель
      ;</v-alert
    >
    <v-row class="mt-4 text-disabled" align="start">
      <v-col>Метки</v-col>
      <v-col cols="2">Тип записи</v-col>
      <v-col>Логин</v-col>
      <v-col cols="4">Пароль</v-col>
    </v-row>
    <TransitionGroup name="list">
      <UserComponent
        v-for="user in userStore.users"
        :user="user"
        :key="user.id"
      />
    </TransitionGroup>
  </v-container>
</template>

<script setup lang="ts">
import UserComponent from "./UserComponent.vue";
import { useUserStore } from "../stores/users";

const userStore = useUserStore();
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
