import mongoose from "mongoose";

const converstaionSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: {
      text: String,
      sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", converstaionSchema);
export default Conversation;
