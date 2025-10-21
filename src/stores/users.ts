import {ref} from 'vue';
import {defineStore} from 'pinia';
import storage from '../utils/localStorage'

type user = {
  id?: number;
  name: string;
  password: string | null;
  type: 'LDAP' | 'local';
  tags: {text: string}[]
}

const cashedUsers = storage.get('users') || []
const lastIndex = +storage.get('lastUserIndex') || 1

export const useUserStore = defineStore('users', () => {
  const users = ref<user[]>(cashedUsers);
  const lastUserIndex = ref<number>(lastIndex)

  function createUser() {
    users.value.push({name: '', password: null, type: 'LDAP', tags: []})
  }

  function addUser() {
    const newUser = users.value.pop()
    users.value.push({...newUser!, id: ++lastUserIndex.value})
    storage.set('users',users.value)
    storage.set('lastUserIndex', lastUserIndex.value)
  }

  return {
    users,
    createUser,
    addUser
  };
});
