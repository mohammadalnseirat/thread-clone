import { handleErrors } from "../utils/error.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

// !1-Function To Send Message:
const sendMessage_Post = async (req, res, next) => {
  try {
    const { message, recipientId } = req.body;
    const senderId = req.user._id;

    // !Find the Conversation:
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recipientId],
      },
    });

    // !Check If the conversation not Exists:
    if (!conversation) {
      // ?Create a New Conversation
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
      // !Save The Conversation:
      await conversation.save();
    }

    // !Create The Message:
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
    });

    await Promise.all([
      newMessage.save(),
      //?update the last message in the conversation:
      Conversation.updateOne({
        lastMessage: {
          text: message,
          sender: senderId,
        },
      }),
    ]);
    // *Send response back:
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending message:", error.message);
    next(error);
  }
};

export { sendMessage_Post };
