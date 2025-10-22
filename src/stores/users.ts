import { ref, computed, nextTick } from "vue";
import { defineStore } from "pinia";
import storage from "../utils/localStorage";
import {isValid} from '../validations/user'



const cashedUsers: User[] = storage.get("users") || [];
let lastIndex: number = +storage.get("lastUserIndex") || 0;


export const useUserStore = defineStore("users", () => {
  const users = ref<User[]>(cashedUsers);

  function createUser() {
    users.value.push({ id: ++lastIndex, name: "", password: null, type: "LDAP", tags: [] });
    nextTick(() => storage.set("lastUserIndex", lastIndex))

  }

  function updateUser(id: number, value: User) {
    const updatingIndex = users.value.findIndex(user => user.id === id)
    users.value[updatingIndex] = value
  }

  function saveUser() {
    storage.set("users", users.value);
  }

  function deleteUser(id: number) {
    users.value = users.value.filter((user) => user.id !== id);
    nextTick(() => storage.set("users", users.value))
  }

  const isAllOk = computed(() => users.value.every((user) => isValid(user)));

  return {
    users,
    createUser,
    updateUser,
    saveUser,
    deleteUser,
    isAllOk,
  };
});
