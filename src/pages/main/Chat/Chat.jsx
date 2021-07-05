import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import styles from "./Chat.module.css";
import iconMenu from "../../../assets/img/Menu.png";
import iconSearch from "../../../assets/img/Search.png";
import iconPlus from "../../../assets/img/Plus.png";
// import photoProfile from "../../../assets/img/photo-profile.svg";
// import checkListRead from "../../../assets/img/check-list-read.png";
// import checkListNotRead from "../../../assets/img/check-list-not-read.png";
import imgDefault from "../../../assets/img/profileDefault.png";
import profileMenu from "../../../assets/img/Profile menu.svg";
import iconSmile from "../../../assets/img/iconSmile.png";
import button from "../../../assets/img/button.png";
import { roomChat } from "..//../../redux/action/roomChat";
import { chat } from "..//../../redux/action/chat";
import Setting from "../../../components/Setting";

import { connect } from "react-redux";

function Chat(props) {
  const userId = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedRooms, setConnectedRooms] = useState({
    room: "",
    oldRoom: "",
  });
  const [dataReceiver, setDataReceiver] = useState({});
  const [userOnline, setUserOnline] = useState([]);
  const [notif, setNotif] = useState({ show: false });
  const [typing, setTyping] = useState({ isTyping: false });

  const toggleShowA = () => {
    setShowA(!showA);
  };
  const toggleShowB = () => {
    setShowB(!showB);
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    props.roomChat(sessionStorage.getItem("userid"));
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
      connect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const connect = () => {
    props.socket.emit("connect-server", userId);
    props.socket.on("list-user-online", (listUserOnline) => {
      setUserOnline(listUserOnline);
    });
    props.socket.on("chat-message", (dataMessage) => {
      setMessages([...messages, dataMessage]);
    });
    props.socket.on("notification", (data) => {
      setNotif(data);
      console.log(data);
    });
    props.socket.on("typing", (data) => {
      setTyping(data);
    });
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
    props.socket.emit("typing-message", {
      username,
      room: connectedRooms.room,
      isTyping: true,
    });
  };

  const handleStopTyping = () => {
    setTimeout(() => {
      props.socket.emit("typing-message", {
        username,
        room: connectedRooms.room,
        isTyping: false,
      });
    }, 2000);
  };

  const handleSendMessage = (event) => {
    if (event.key === "Enter") {
      if (message !== "") {
        const setData = {
          room: connectedRooms.room,
          senderId: userId,
          receiverId: dataReceiver.user_id,
          username,
          message,
          show: true,
        };
        props.socket.emit("send-message", setData);
        // [1] menjalankan socket io untuk mendapatkan realtimenya
        // props.socket.emit("send-message", setData);
        // [2] menjalankan proses axios, post data ke databse
        props.socket.emit("notif-message", setData);
        setMessage("");
      }
    }
  };

  const handleSelectRoomChat = (data) => {
    props.socket.emit("join-room", {
      room: data.room_chat,
      oldRoom: connectedRooms.oldRoom,
    });
    props.chat(data.room_chat);
    setDataReceiver(data);
    setConnectedRooms({
      ...connectedRooms,
      room: data.room_chat,
      oldRoom: data.room_chat,
    });

    // get data dari database dan disimpan ke dalam variable  penampung(message)
    // setMessages(res.data.data)
  };

  const handleConsoleLog = () => {
    console.log(messages);
  };

  return (
    <>
      <Container fluid className={styles.containerMain}>
        <Toast
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={5000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Telegram App ({notif.username})</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{notif.message}</Toast.Body>
        </Toast>
        <Row>
          <Col md={4} className={styles.coloumn1}>
            <div className={styles.navbar}>
              <h2>Telegram</h2>
              <button onClick={handleConsoleLog}>Console</button>
              <img src={iconMenu} alt="Menu" onClick={toggleShowA} />
            </div>
            <Toast show={showA} onClose={toggleShowA} className={styles.menu}>
              <Setting {...props} />
            </Toast>
            <div className={styles.search}>
              <div>
                <img src={iconSearch} alt="Search" />
                <input type="text" placeholder="Type your message..." />
              </div>
              <img src={iconPlus} alt="" />
            </div>

            {props.chatList.data.map((item, index) => {
              return (
                <div
                  className={styles.chat}
                  key={index}
                  value={item.user_name}
                  onClick={() => handleSelectRoomChat(item)}
                >
                  <div className={styles.profile} onClick={toggleShowB}>
                    {item.user_image.length > 0 ? (
                      <img src={item.user_image} alt="" />
                    ) : (
                      <img src={imgDefault} alt="" />
                    )}

                    <Col>
                      <div className={styles.nameUser}>
                        <h5>{item.user_name}</h5>
                        <h6>00:00</h6>
                      </div>
                      <div className={`${styles.message} ${styles.receiver}`}>
                        <h4>No Message</h4>
                      </div>
                    </Col>
                  </div>
                </div>
              );
            })}
          </Col>
          {/* <Col md={8} className={styles.coloumn2}>
            Please select a chat to start messaging
          </Col> */}
          <Col md={8} className={styles.coloumn21}>
            <Toast
              show={showB}
              onClose={toggleShowB}
              className={styles.toastColoumn21}
            >
              <div className={styles.top}>
                <Col md={3} className={styles.topLeft}>
                  <Row className={styles.topLeftName}>
                    {dataReceiver.user_image ? (
                      <img
                        src={
                          "http://localhost:3003/backend3/api/" +
                          dataReceiver.user_image
                        }
                        alt=""
                      />
                    ) : (
                      <img src={imgDefault} alt="" />
                    )}
                    <Col>
                      <span>{dataReceiver.user_name}</span>
                      <p>
                        {userOnline.includes(dataReceiver.user_id)
                          ? "Online"
                          : "Offline"}
                      </p>
                      {typing.isTyping && (
                        <p>
                          <em>{typing.username} is typing a message...</em>
                        </p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <div md={1} className={styles.topRight}>
                  <img src={profileMenu} alt="" />
                </div>
              </div>
              <div className={styles.messages}>
                <div className={styles.messagesReceiver}>
                  {/* {props.messages.data[1].user_image.length > 0 ? (
                  <img src={props.messages.data[1].user_image} alt="" />
                ) : (
                  <img src={imgDefault} alt="" />
                )} */}
                  {/* <div className={styles.colR}>
                    <p>Hi, son, how are you doing?</p>
                  </div> */}
                </div>
                <div className={styles.messagesSender}>
                  {/* {props.messages.data[0].user_image.length > 0 ? (
                  <img src={props.messages.data[0].user_image} alt="" />
                ) : (
                )} */}
                  {/* <img src={imgDefault} alt="" /> */}

                  <div className={styles.colS}>
                    {messages.map((item, index) => {
                      return (
                        <div key={index}>
                          <h6>
                            {item.username} :{item.message}
                          </h6>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.inputChat}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(event) => {
                    handleChangeText(event);
                    handleStopTyping();
                  }}
                  onKeyPress={handleSendMessage}
                />
                <img src={iconPlus} alt="" />
                <img src={iconSmile} alt="" />
                <img src={button} alt="" />
              </div>
            </Toast>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
  chatList: state.roomChat,
  messages: state.chat,
});

const mapDispatchToProps = { roomChat, chat };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
