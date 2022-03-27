import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class TestStore {
  tests = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchTests = async () => {
    try {
      const response = await instance.get("/tests");
      this.tests = response.data.payload;
    } catch (error) {
      console.log("error");
    }
  };
}

const testStore = new TestStore();
testStore.fetchTests();
export default testStore;
