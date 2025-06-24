import ChatView from "@/sections/chat/views/chats-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Chatting Page",
  description: "Manage all your chats with other branches.",
};

export default function BranchesPage() {
  return <ChatView />;
}
