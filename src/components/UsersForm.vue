<template>
  <v-container max-width="900">
    <div class="mb-8 text-h5">
      Учетные записи
      <v-btn icon="mdi-plus" class="ml-2 text-h5"></v-btn>
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
    <v-row>
      <v-col class="pt-4">
        <v-text-field density="compact" variant="outlined" />
      </v-col>
      <v-col class="pt-4" cols="2">
        <v-select
          density="compact"
          :items="['Локальная', 'LDAP']"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col class="pt-4">
        <v-text-field density="compact" variant="outlined" />
      </v-col>
      <v-col class="pt-4">
        <v-text-field
          density="compact"
          variant="outlined"
          type="password"
          :append-inner-icon="'mdi-eye'"
          @click:append-inner=""
        />
      </v-col>
      <v-col cols="1">
        <v-btn icon="mdi-delete" text class="ml-2 text-h5"></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>
