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

// !2-Function To Get Messages:
const getAllMessages_Get = async (req, res, next) => {
  const { otheruserId } = req.params;
  const userId = req.user._id;
  try {
    // !Find The Conversation:
    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, otheruserId],
      },
    });
    if (!conversation) {
      return next(handleErrors(404, "Conversation not found!"));
    }
    // !Find All Messages:
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    // !Send response back:
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting messages:", error.message);
    next(error);
  }
};

export { sendMessage_Post, getAllMessages_Get };
