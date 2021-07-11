import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Toast, Modal, Button } from "react-bootstrap";
import styles from "./Chat.module.css";
import axiosApiIntances from "../../../utils/axios";
import { roomChat } from "..//../../redux/action/roomChat";
import { chat } from "..//../../redux/action/chat";
import { connect } from "react-redux";
import Menu from "../../../components/Menu";
import ContactInfo from "../../../components/ContactInfo";
import Settings from "../../../components/Settings";
import iconMenu from "../../../assets/img/Menu.png";
import iconSearch from "../../../assets/img/Search.png";
import iconPlus from "../../../assets/img/Plus.png";
import iconPrev from "../../../assets/img/back.png";
import imgDefault from "../../../assets/img/profileDefault.png";
import profileMenu from "../../../assets/img/Profile menu.svg";
import iconSmile from "../../../assets/img/iconSmile.png";
import iconChat from "../../../assets/img/iconChat.png";

function Chat(props) {
  const userId = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  const [isSettings, setIsSetting] = useState(false);
  const [friendData, setFriendData] = useState([]);
  const [search, setSearch] = useState("");
  const [isContact, setIsContact] = useState(false);

  const toggleShowA = () => {
    setShowA(!showA);
  };

  const toggleShowB = () => {
    setShowB(!showB);
  };

  const toggleShowChat = (data) => {
    console.log(data);
    const roomChat = data.room_chat;
    if (connectedRooms.room !== roomChat) {
      setShowB(true);
    } else {
      setShowB(!showB);
    }
  };
  const toggleShowContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };
  const handleShowModal = () => {
    setShowModal(!showModal);
    setFriendData([]);
  };

  useEffect(() => {
    props.roomChat(sessionStorage.getItem("userid"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
        const postData = {
          roomChat: setData.room,
          senderId: setData.senderId,
          receiverId: setData.receiverId,
          messages: setData.message,
        };
        axiosApiIntances
          .post("/chat", postData)
          .then((res) => {
            return res.data.data;
          })
          .catch((err) => {
            return err.response.data.msg;
          });
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
    axiosApiIntances
      .get(`chat/?roomChat=${data.room_chat}`)
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        return err.response.data.msg;
      });
  };

  const handleSearch = (e) => {
    const searchRoomChat = e.target.value;
    props.roomChat(sessionStorage.getItem("userid"), searchRoomChat);
  };

  const handleSearchInviteFriend = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFriendData([]);
    } else {
      getFriendData(e.target.value);
    }
  };

  const handleSearchContact = (e) => {
    setSearch(e.target.value);
    getAllContact(e.target.value);
  };

  const getAllContact = (search) => {
    axiosApiIntances
      .get(`contact/all-contact?id=${userId}&search=${search}`)
      .then((res) => {
        setFriendData(res.data.data);
      })
      .catch((err) => {
        alert(err.response);
      });
  };

  const getFriendData = (search) => {
    axiosApiIntances
      .get(`contact?id=${userId}&search=${search}`)
      .then((res) => {
        setFriendData(res.data.data);
      })
      .catch((err) => {
        return err.reponse;
      });
  };

  const captureSettings = (data) => {
    setIsSetting(data);
    setShowA(false);
  };

  const captureInviteFiend = (data) => {
    setShowModal(data);
    setShowA(!showA);
    setIsContact(false);
  };

  const captureContact = (data) => {
    setShowModal(data);
    setShowA(!showA);
    setIsContact(true);
    getAllContact("");
  };

  const createContact = (data) => {
    const setData = {
      userId,
      friendId: data.user_id,
    };
    if (window.confirm(`Tambahkan ${data.user_name} ?`) === true) {
      axiosApiIntances
        .post("contact", setData)
        .then(() => {
          getFriendData(search);
          alert("Add contact successful");
        })
        .catch((err) => {
          alert(err.response);
        });
    }
  };

  const createRoomChat = (id) => {
    // eslint-disable-next-line array-callback-return

    const Id = `${id}`;
    if (props.chatList.data.filter((e) => e.user_id === Id).length) {
      return {};
    } else {
      axiosApiIntances
        .post("/room-chat", { userId, friendId: Id })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    }
  };

  return (
    <>
      <Container fluid className={styles.containerMain}>
        <Toast
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={5000}
          autohide
          className={styles.toastNotif}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Lelegram App ({notif.username})</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{notif.message}</Toast.Body>
        </Toast>
        <Row>
          {isSettings ? (
            <Col md={4} className={styles.settings}>
              <Settings
                {...props}
                throwData={(data) => captureSettings(data)}
              />
            </Col>
          ) : (
            <Col md={4} className={styles.coloumn1}>
              <div className={styles.navbar}>
                <h2>Lelegram</h2>

                <div onClick={toggleShowA}>
                  <img src={iconMenu} alt="Menu" />
                </div>
              </div>
              <Toast show={showA} onClose={toggleShowA} className={styles.menu}>
                <Menu
                  throwData={(data) => {
                    captureSettings(data);
                  }}
                  throwDataInviteFriend={(data) => {
                    captureInviteFiend(data);
                  }}
                  throwDataContact={(data) => {
                    captureContact(data);
                  }}
                />
              </Toast>
              <div className={styles.search}>
                <div>
                  <img src={iconSearch} alt="Search" />
                  <input
                    type="search"
                    placeholder="Type your contact..."
                    name="search"
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
              </div>

              {props.chatList.data.length <= 0 ? (
                <h2 style={{ textAlign: "center" }}>Tidak ada pesan</h2>
              ) : (
                props.chatList.data.map((item, index) => {
                  return (
                    <div
                      className={styles.chat}
                      key={index}
                      value={item.user_name}
                      onClick={() => {
                        handleSelectRoomChat(item);
                        toggleShowChat(item);
                      }}
                    >
                      <div className={styles.profile}>
                        {item.user_image.length > 0 ? (
                          <img
                            src={
                              "https://agile-brushlands-60708.herokuapp.com/backend3/api/" +
                              item.user_image
                            }
                            alt=""
                          />
                        ) : (
                          <img src={imgDefault} alt="" />
                        )}

                        <h5>{item.user_name}</h5>
                      </div>
                    </div>
                  );
                })
              )}
            </Col>
          )}

          {showB === false ? (
            <Col md={8} className={styles.coloumn2}>
              Please select a chat to start messaging
            </Col>
          ) : (
            <Col md={showContactInfo ? 5 : 8} className={styles.coloumn21}>
              <Toast
                show={showB}
                onClose={toggleShowB}
                className={styles.toastColoumn21}
              >
                <div className={styles.top}>
                  <Col md={5} className={styles.topLeft}>
                    <Row className={styles.topLeftName}>
                      {dataReceiver.user_image ? (
                        <img
                          src={
                            "https://agile-brushlands-60708.herokuapp.com/backend3/api/" +
                            dataReceiver.user_image
                          }
                          alt=""
                        />
                      ) : (
                        <img src={imgDefault} alt="" />
                      )}
                      <Col>
                        <span>{dataReceiver.user_name}</span>
                        {typing.isTyping ? (
                          <p>
                            <em>{typing.username} is typing a message...</em>
                          </p>
                        ) : (
                          <p>
                            {userOnline.includes(parseInt(dataReceiver.user_id))
                              ? "Online"
                              : "Offline"}
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={1}
                    className={styles.topRight}
                    onClick={toggleShowContactInfo}
                  >
                    <div>
                      {showContactInfo ? (
                        <img src={iconPrev} alt="iconPrev" />
                      ) : (
                        <img src={profileMenu} alt="" />
                      )}
                    </div>
                  </Col>
                </div>
                <div className={styles.messages}>
                  {messages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={
                          item.sender_id === parseInt(userId) ||
                          parseInt(item.senderId) === parseInt(userId)
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                      >
                        <span
                          className={
                            item.sender_id === parseInt(userId) ||
                            parseInt(item.senderId) === parseInt(userId)
                              ? styles.sender
                              : styles.receiver
                          }
                        >
                          {item.message}
                        </span>
                      </div>
                    );
                  })}
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
                </div>
              </Toast>
            </Col>
          )}

          <Col md={3} className={styles.contactInfo}>
            <Toast show={showContactInfo} onClose={toggleShowContactInfo}>
              <ContactInfo
                receiverData={dataReceiver}
                userOnline={userOnline}
              />
            </Toast>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModal}
        onHide={handleShowModal}
        centered
        className={styles.modalAddFriend}
      >
        <Modal.Body>
          <h3>{isContact ? "Contact" : "Invite Friend"}</h3>
          <div className={styles.search}>
            <div>
              <img src={iconSearch} alt="Search" />
              <input
                type="search"
                placeholder="Search contact name"
                name="search"
                onChange={
                  isContact
                    ? (e) => handleSearchContact(e)
                    : (e) => handleSearchInviteFriend(e)
                }
              />
            </div>
          </div>
          <div className={styles.containerAddContact}>
            {friendData.length <= 0 ? (
              <h2
                style={{ textAlign: "center" }}
              >{`Nama ${search} tidak ditemukan`}</h2>
            ) : (
              friendData.map((item, index) => {
                return (
                  <div className={styles.addFriendContact} key={index}>
                    <div className={styles.addFriend} onClick={toggleShowB}>
                      {item.user_image.length > 0 ? (
                        <img
                          src={
                            "https://agile-brushlands-60708.herokuapp.com/backend3/api/" +
                            item.user_image
                          }
                          alt=""
                        />
                      ) : (
                        <img src={imgDefault} alt="" />
                      )}

                      <h5>{item.user_name}</h5>
                    </div>
                    {parseInt(item.friend_id) === parseInt(userId) ||
                    isContact ? (
                      <img
                        src={iconChat}
                        alt=""
                        className={styles.iconChat}
                        onClick={() => {
                          handleSelectRoomChat(item);
                          handleShowModal();
                          createRoomChat(item.friend_id);
                        }}
                      />
                    ) : (
                      <img
                        src={iconPlus}
                        alt=""
                        className={styles.iconAdd}
                        onClick={() => createContact(item)}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
