import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import authStore from "./authStore";

class QueueStore {
  queues = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchQueues = async () => {
    console.log("fetchQueues");
    try {
      const response = await instance.get("/queues");
      this.queues = response.data.payload;
      console.log("queues", this.queues);
    } catch (error) {
      console.log("error");
    }
  };

  addQueue = async (newQueue) => {
    try {
      newQueue.owner = authStore.user._id;
      
      const response = await instance.post("/queues", newQueue);
      this.queues.push(response.data.payload);
      await this.fetchQueues();
    } catch (error) {
      console.log("failed to add new queue", error);
    }
  };
}

const queueStore = new QueueStore();
queueStore.fetchQueues();
export default queueStore;
