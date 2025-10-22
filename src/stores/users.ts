import { ref, computed } from "vue";
import { defineStore } from "pinia";
import storage from "../utils/localStorage";



const cashedUsers: User[] = storage.get("users") || [];
let lastIndex: number = +storage.get("lastUserIndex") || 1;
const isValid = (user: User) => {
  if (user.tags.map((t) => t.text).join(";").length > 50) {
    return false;
  }
  if (!user.name || user.name.length > 100) {
    return false;
  }
  if (
    (user.type === "local" && !user.password) ||
    (user.password && user.password.length > 100)
  ) {
    return false;
  }
};

export const useUserStore = defineStore("users", () => {
  const users = ref<User[]>(cashedUsers);

  function createUser() {
    users.value.push({ id: ++lastIndex, name: "", password: null, type: "LDAP", tags: [] });
  }

  function updateUser(id: number, value: User) {
    const updatingIndex = users.value.findIndex(user => user.id === id)
    users.value[updatingIndex] = value
  }

  function addUser() {
    storage.set("users", users.value);
    storage.set("lastUserIndex", lastIndex);
  }

  function saveUser() {
    storage.set("users", users.value);
  }

  function deleteUser(id: number) {
    users.value = users.value.filter((user) => user.id !== id);
    storage.set("users", users.value);
  }

  const isAllOk = computed(() => users.value.every((user) => isValid(user)));

  return {
    users,
    createUser,
    updateUser,
    addUser,
    saveUser,
    deleteUser,
    isAllOk,
  };
});
