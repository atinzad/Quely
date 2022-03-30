import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import authStore from "./authStore";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

class QueueStore {
  queues = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchQueues = async () => {
    try {
      const response = await instance.get("/queues");
      this.queues = response.data.payload;
    } catch (error) {
      console.log("error");
    }
  };

  addQueue = async (newQueue, newFields) => {
    try {
      newQueue.owner = authStore.user._id;
      newQueue.fields = newFields;
      const response = await instance.post("/queues", newQueue);
      this.queues.push(response.data.payload);
      await this.fetchQueues();
    } catch (error) {
      console.log("failed to add new queue", error);
    }
  };

  deleteQueue = async (queueId) => {
    try {
      this.queues = this.queues.filter((queues) => queues._id !== queueId);
      const response = await instance.delete(`/queues/${queueId}`);
    } catch (error) {
      console.log("failed to remove queue", error);
    }
  };
}

const queueStore = new QueueStore();
queueStore.fetchQueues();
export default queueStore;
