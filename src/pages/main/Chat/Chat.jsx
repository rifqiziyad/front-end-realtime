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
import iconSetting from "../../../assets/img/Settings.png";
import iconContact from "../../../assets/img/Contacts.png";
import iconInvite from "../../../assets/img/Invite friends.png";
import iconFaq from "../../../assets/img/FAQ.png";
import imgDefault from "../../../assets/img/profileDefault.png";
import profileMenu from "../../../assets/img/Profile menu.svg";
import iconSmile from "../../../assets/img/iconSmile.png";
import button from "../../../assets/img/button.png";
import { roomChat } from "..//../../redux/action/roomChat";
import { chat } from "..//../../redux/action/chat";

import { connect } from "react-redux";

function Chat(props) {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({ new: "", old: "" });
  const username = props.user.data.user_name;
  const [dataReceiver, setDataReceiver] = useState({});

  const toggleShowA = () => {
    setShowA(!showA);
  };
  const toggleShowB = () => {
    setShowB(!showB);
  };
  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/login");
  };

  useEffect(() => {
    console.log("use effect");
    props.roomChat(props.user.data.user_id);
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket]);

  const handleChangeText = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    // console.log("Send Message: " + message);
    // console.log("Username: " + username);
    // console.log("Room :" + room.new);
    event.preventDefault();
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

  const handleSelectRoomChat = (event, data) => {
    props.chat(data.room_chat);
    props.socket.emit("joinRoom", {
      room: data.room_chat,
      oldRoom: room.old,
      username, // username: username
    });
    setDataReceiver(data);
    setRoom({ ...room, new: data.room_chat, old: data.room_chat });
    console.log(data.room_chat);
  };

  // console.log(dataReceiver);

  return (
    <>
      <Container fluid className={styles.containerMain}>
        <Row>
          <Col md={4} className={styles.coloumn1}>
            <div className={styles.navbar}>
              <h2>Telegram</h2>
              <img src={iconMenu} alt="Menu" onClick={toggleShowA} />
            </div>
            <Toast show={showA} onClose={toggleShowA} className={styles.menu}>
              <div className={styles.icon}>
                <img src={iconSetting} alt="" />
                <p>Setings</p>
              </div>
              <div className={styles.icon}>
                <img src={iconContact} alt="" />
                <p>Contacts</p>
              </div>
              <div className={styles.icon}>
                <img src={iconInvite} alt="" />
                <p>Invite Friend</p>
              </div>
              <div className={styles.icon}>
                <img src={iconFaq} alt="" />
                <p>Telegram FAQ</p>
              </div>
              <button onClick={handleLogout}>Logout</button>
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
                  onClick={(event) => handleSelectRoomChat(event, item)}
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
                        {/* <h3>3</h3> */}
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
                      <p>Online</p>
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
                          {/* <h6>{localStorage.getItem("name")}</h6>:{item.message} */}
                          <h6>anon : hello world</h6>
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
                  onChange={(event) => handleChangeText(event)}
                />
                <img src={iconPlus} alt="" />
                <img src={iconSmile} alt="" />
                <img src={button} alt="" onClick={handleSendMessage} />
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
