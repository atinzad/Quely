import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import { INIT_ID, SERVICE_ID, TEMPLATE_ID } from "../.email.config";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

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
      if (setRefreshing) {
        setRefreshing(false);
      }
    } catch (error) {
      setRefreshing(false);
      console.log("error");
    }
  };

  addMember = async (queue, newMember, fieldValues) => {
    try {
      newMember.queue = queue._id;
      newMember.fieldValues = fieldValues;

      const response = await instance.post("/members", newMember);
      this.members.push(response.data.payload);
      //queue.memebers.push(response.data.payload._id); //@ahmad, the members for the particular queue needs to be updated
      // await this.fetchMembers(() => {});
    } catch (error) {
      console.log("failed to add new member", error);
    }
  };
  deleteMember = async (memberId) => {
    try {
      this.members = this.members.filter((member) => member._id !== memberId);
      const response = await instance.delete(`/members/${memberId}`);
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

  serveMember = async (memberId) => {
    try {
      this.members = this.members.map((member) =>
        member._id === memberId ? { ...member, waiting: false } : member
      );

      const updateMember = { waiting: false };
      const response = await instance.put(`/members/${memberId}`, updateMember);
    } catch (error) {
      console.log("failed to update member", error);
    }
  };

  waitMember = async (memberId) => {
    try {
      this.members = this.members.map((member) =>
        member._id === memberId ? { ...member, waiting: true } : member
      );

      const updateMember = { waiting: true };
      const response = await instance.put(`/members/${memberId}`, updateMember);
    } catch (error) {
      console.log("failed to update member", error);
    }
  };
}

const memberStore = new MemberStore();
memberStore.fetchMembers(() => {});
export default memberStore;
