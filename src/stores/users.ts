import { ref, computed } from "vue";
import { defineStore } from "pinia";
import storage from "../utils/localStorage";

type User = {
  id?: number;
  name: string;
  password: string | null;
  type: "LDAP" | "local";
  tags: { text: string }[];
};

const cashedUsers: User[] = storage.get("users") || [];
const lastIndex: number = +storage.get("lastUserIndex") || 1;
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
  const lastUserIndex = ref<number>(lastIndex);

  function createUser() {
    users.value.push({ name: "", password: null, type: "LDAP", tags: [] });
  }

  function addUser() {
    const newUser = users.value.pop();
    users.value.push({ ...newUser!, id: ++lastUserIndex.value });
    storage.set("users", users.value);
    storage.set("lastUserIndex", lastUserIndex.value);
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
    addUser,
    saveUser,
    deleteUser,
    isAllOk,
  };
});
