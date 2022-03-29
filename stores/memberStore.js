import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import { INIT_ID, SERVICE_ID, TEMPLATE_ID } from "../.email.config";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";

init(INIT_ID);

class MemberStore {
  members = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchMembers = async (setRefreshing) => {
    try {
      const response = await instance.get("/members");
      this.members = response.data.payload;
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log("error");
    }
  };

  addMember = async (queue, newMember) => {
    try {
      newMember.queue = queue._id;

      const response = await instance.post("/members", newMember);
      this.members.push(response.data.payload);
      //queue.memebers.push(response.data.payload._id); //@ahmad, the members for the particular queue needs to be updated
      await this.fetchMembers(() => {});
    } catch (error) {
      console.log("failed to add new member", error);
    }
  };
  deleteMember = async (memberId) => {
    try {
      const response = await instance.delete(`/members/${memberId}`);
      this.members = this.members.filter((member) => member._id !== memberId);
    } catch (error) {
      console.log("failed to remove member", error);
    }
  };

  sendEmailtoMember = (queue, member) => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      message: "Your turn is up in the queue",
      user_email: member.email,
      member_id_4: member._id.substring(member._id.length - 4),
      queue_name: queue.name,
      reply_to: "quelyapp@gmail.com",
    });
  };
}

const memberStore = new MemberStore();
memberStore.fetchMembers(() => {});
export default memberStore;
