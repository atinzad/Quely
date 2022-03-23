import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class MemberStore {
  members = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchMembers = async () => {
    console.log("fetchMembers");
    try {
      const response = await instance.get("/members");
      this.members = response.data.payload;
      console.log("members", this.members);
    } catch (error) {
      console.log("error");
    }
  };

  addMember = async (queue, newMember) => {
    try {
      newMember.queue = queue._id;

      const response = await instance.post("/members", newMember);
      this.members.push(response.data.payload);
      //queue.memebers.push(response.data.payload._id); //@ahmad, the members for the particular queue needs to be updated
      await this.fetchMembers();
    } catch (error) {
      console.log("failed to add new member", error);
    }
  };
}

const memberStore = new MemberStore();
memberStore.fetchMembers();
export default memberStore;
