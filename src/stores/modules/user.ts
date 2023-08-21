import { defineStore } from "pinia";
import type { IUserState } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => ({
    token: "",
    userInfo: {},
    organizations: []
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: IUserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    setOrganizations(organizations: IUserState["organizations"]) {
      this.organizations = organizations;
    }
  },
  persist: piniaPersistConfig("user")
});