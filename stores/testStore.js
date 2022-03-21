import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class TestStore {
  tests = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchTests = async () => {
    console.log("fetchTests");
    try {
      const response = await instance.get("/tests");
      this.tests = response.data.payload;
      console.log(this.tests);
    } catch (error) {
      console.log("error");
    }
  };
}

const testStore = new TestStore();
testStore.fetchTests();
export default testStore;
