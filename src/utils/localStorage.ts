export default {
  set(itemName: string, value: any) {
    localStorage.setItem(itemName, JSON.stringify(value));
  },
  
  get(itemName: string) {
    const json = localStorage.getItem(itemName);
    if (!json) {
      return null
    } else {
      return JSON.parse(json)
    }
  }
}

