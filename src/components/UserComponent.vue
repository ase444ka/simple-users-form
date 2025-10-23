<template>
  <v-row>
    <v-col class="pt-4">
      <v-text-field
        density="compact"
        variant="outlined"
        v-model="tagsText"
        @blur="isTagsClean = false"
        :error-messages="isTagsClean ? '' : tagsErrorMessage(tagsText)"
      />
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
    <v-col class="pt-4" :cols="type === 'local' ? 3 : 6">
      <v-text-field
        density="compact"
        variant="outlined"
        v-model="name"
        @blur="isNameClean = false"
        :error-messages="isNameClean ? '' : nameErrorMessage(name)"
      />
    </v-col>
    <v-col class="pt-4" v-if="type === 'local'">
      <v-text-field
        density="compact"
        variant="outlined"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        @blur="isPasswordClean = false"
        :error-messages="
          isPasswordClean ? '' : passwordErrorMessage(localUser, password)
        "
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
      />
    </v-col>
    <v-col cols="1">
      <v-btn
        icon="mdi-delete"
        text
        class="ml-2 text-h5"
        @click="deleteUser"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";
import type { Ref } from "vue";
import { useUserStore } from "../stores/users";
import {
  isValid,
  tagsErrorMessage,
  nameErrorMessage,
  passwordErrorMessage,
} from "../validations/user";

const userStore = useUserStore();
const props = defineProps<{
  user: User;
}>();

const tagsText: Ref<string> = ref(props.user.tags.map((t) => t.text).join(";"));
const type = ref(props.user.type);
const name = ref(props.user.name);
const id = ref(props.user.id);
const password = ref(props.user.password);

const isTagsClean = ref(true);
const isNameClean = ref(true);
const isPasswordClean = ref(true);

const showPassword = ref(false)

const tags = computed(() =>
  tagsText.value.split(";").map((t) => ({ text: t }))
);
const localUser = computed(() => ({
  id: id.value,
  tags: tags.value,
  type: type.value,
  name: name.value,
  password: type.value === "local" ? password.value : null,
}));

watch(localUser, (value) => {
  userStore.updateUser(id.value, value);
  if (isValid(value)) {
    nextTick(() => userStore.saveUser());
  }
});

const deleteUser = () => {
  userStore.deleteUser(localUser.value.id)
}
</script>

<style lang="scss" scoped>

</style>
