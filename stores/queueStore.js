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
      const response = await instance.get("/queue");
      this.queues = response.data.payload;
      console.log("queues", this.queues);
    } catch (error) {
      console.log("error");
    }
  };

  addQueue = async (newQueue) => {
    try {
      //newQueue.owner = authStore.user._id;    //@hadeel, this is where we get the user id and add it to owner
      const response = await instance.post("/queue", newQueue);
      this.queues.push(response.data.payload);
      await this.fetchTrips();
    } catch (error) {
      console.log("failed to add new queue", error);
    }
  };
}

const queueStore = new QueueStore();
queueStore.fetchQueues();
export default queueStore;
