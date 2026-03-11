export const userStore = defineStore('user', {
  state: (): UserType => {
    return {
      sessionId: crypto.randomUUID(),
    };
  },
  actions: {
    setName(name: string) {
      this.name = name;
    },
  },
  persist: true,
});

class UserType {
  sessionId!: string;
  name?: string;
}
