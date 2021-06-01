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
  const [messages, setMessages] = useState([INIT_BOT_MSG]);

  //Defining sendMessage

  const sendMessage = () => {
    setMessages([...messages, message]);
  };

  //Creating a boolean state to check if bot is typing or not
  const [isBotTyping, setIsBotTyping] = useState(false);

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list"></div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
