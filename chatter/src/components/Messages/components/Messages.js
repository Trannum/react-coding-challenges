import React, { useContext } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";
import { useState } from "react";
import uuid from "react-uuid";
import INIT_BOT_MSG from "../../../common/constants/initialBottyMessage";

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);

  //Creating a state to hold messages
  const [message, setMessage] = useState("");

  //Defining onChangeMessage
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  //Creating a messages array for message list
  //    Changed State to array of objects on studying the Message component for message structure
  const [messages, setMessages] = useState([
    { message: INIT_BOT_MSG, user: "bot", id: uuid() },
  ]);

  //Defining sendMessage

  const sendMessage = () => {
    //Creating message object with user me as described in constant in Message component.
    const message_object = { message, user: "me", id: uuid() };
    setMessages([...messages, message_object]);
  };

  //Creating a boolean state to check if bot is typing or not
  const [isBotTyping, setIsBotTyping] = useState(false);

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {/* Using messages state to map through all messages and render Message component for every message. */}
        {messages.map((m, index) => {
          return (
            <Message
              message={m}
              nextMessage={messages[index + 1]}
              botTyping={isBotTyping}
            />
          );
        })}
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
