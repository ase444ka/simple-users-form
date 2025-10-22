<template>
  <v-row>
    <v-col class="pt-4">
      <v-text-field density="compact" variant="outlined" v-model="tagsText" />
    </v-col>
    <v-col class="pt-4" cols="2">
      <v-select
        density="compact"
        variant="outlined"
        :items="[
          { title: 'Локальная', value: 'local' },
          { title: 'LDAP', value: 'LDAP' },
        ]"
        v-model="type"
      ></v-select>
    </v-col>
    <v-col class="pt-4">
      <v-text-field density="compact" variant="outlined" v-model="name" />
    </v-col>
    <v-col class="pt-4">
      <v-text-field
        density="compact"
        variant="outlined"
        type="password"
        v-model="password"
        :append-inner-icon="'mdi-eye'"
        @click:append-inner=""
      />
    </v-col>
    <v-col cols="1">
      <v-btn icon="mdi-delete" text class="ml-2 text-h5"></v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import type { Ref } from "vue";
import { useUserStore } from "../stores/users";

const userStore = useUserStore();
const props = defineProps<{
  user: User;
}>();

const tagsText: Ref<string> = ref("");
const type = ref(props.user.type);
const name = ref(props.user.name);
const id = ref(props.user.id);
const password = ref(props.user.password);
const tags = computed(() =>
  tagsText.value.split(";").map((t) => ({ text: t }))
);

watchEffect(() => {
  userStore.updateUser(id.value, {
    id: id.value,
    tags: tags.value,
    type: type.value,
    name: name.value,
    password: password.value,
  });
});
</script>

<style lang="scss" scoped></style>
