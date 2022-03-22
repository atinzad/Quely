import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class QueueStore {
  queues = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchQueues = async () => {
    console.log("fetchQueues");
    try {
      const response = await instance.get("/queue");
      this.queues = response.data.payload;
      console.log("queues", this.queues);
    } catch (error) {
      console.log("error");
    }
  };
}

const queueStore = new QueueStore();
queueStore.fetchQueues();
export default queueStore;
