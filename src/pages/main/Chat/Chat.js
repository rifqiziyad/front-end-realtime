import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import styles from "./Chat.module.css";
import { Container, Form, Row, Col } from "react-bootstrap";

function Chat(props) {
  const username = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({ new: "", old: "" });

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
  }, [props.socket, messages]);

  const handleSelectRoom = (event) => {
    // console.log(event.target.value);
    // if (room.old) {
    //   console.log("sudah pernah masuk ke room " + room.old);
    //   console.log("dan akan masuk ke room " + event.target.value);
    // } else {
    //   console.log("belum pernah masuk ke ruang manapun");
    //   console.log("dan akan masuk ke room " + event.target.value);
    // }

    props.socket.emit("joinRoom", {
      room: event.target.value,
      oldRoom: room.old,
      username, // username: username
    });
    setRoom({ ...room, new: event.target.value, old: event.target.value });
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log("Username :", username);
    console.log("Room :", room);
    console.log("Send Message :", message);
    // const setData = {
    //   username,
    //   message,
    // };
    // props.socket.emit("globalMessage", setData);
    // props.socket.emit("privateMessage", setData);
    // props.socket.emit("brodcastMessage", setData);
    // ===========================
    const setData = {
      room: room.new,
      username,
      message,
    };
    // [1] menjalankan socket io untuk mendapatkan realtimenya
    props.socket.emit("roomMessage", setData);
    // [2] menjalankan proses axios, post data ke databse
    setMessage("");
  };

  return (
    <Container className="text-center">
      <Navbar />
      <h1>Chat App</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={(event) => handleSelectRoom(event)}
          >
            <option value="">Pilih Room ...</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JS</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <hr />
      <Row>
        <Col sm={2}>
          <div className={styles.chat}>
            <div className={styles.chatWindow}>
              <p className={styles.room}>User 1</p>
              <hr />
              <p className={styles.room}>User 2</p>
              <hr />
            </div>
          </div>
        </Col>
        <Col sm={10}>
          <div className={styles.chat}>
            <div className={styles.chatWindow}>
              <div className={styles.output}>
                {messages.map((item, index) => (
                  <p key={index}>
                    <strong>{item.username} : </strong>
                    {item.message}
                  </p>
                ))}
              </div>
            </div>
            <input
              className={styles.inputMessage}
              onChange={(event) => handleChangeText(event)}
              type="text"
              value={message}
              placeholder="Message"
            />
            <button onClick={handleSendMessage} className={styles.btnSubmit}>
              Send
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
