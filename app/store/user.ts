export const userStore = defineStore('user', {
  state: (): UserType => {
    const { default_username } = useRuntimeConfig().public;
    return {
      sessionId: crypto.randomUUID(),
      username: default_username,
    };
  },
  actions: {
    getName() {
      return this.username;
    },
    setName(name: string) {
      this.username = name;
    },
  },
  persist: true,
});

class UserType {
  sessionId!: string;
  username!: string;
}
