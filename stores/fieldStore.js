import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

class fieldStore {
  fields = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchFields = async () => {
    try {
      const response = await instance.get("/fields");
      this.fields = response.data.payload;
    } catch (error) {
      console.log("error");
    }
  };
}

const fieldStore = new FieldStore();
fieldStore.fetchFields();
export default fieldStore;
