import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Toast, Modal, Button } from "react-bootstrap";
import styles from "./Chat.module.css";
import iconMenu from "../../../assets/img/Menu.png";
import iconSearch from "../../../assets/img/Search.png";
import iconPlus from "../../../assets/img/Plus.png";
import photoProfile from "../../../assets/img/photo-profile.svg";
import checkListRead from "../../../assets/img/check-list-read.png";
import checkListNotRead from "../../../assets/img/check-list-not-read.png";
import iconSetting from "../../../assets/img/Settings.png";
import iconContact from "../../../assets/img/Contacts.png";
import iconInvite from "../../../assets/img/Invite friends.png";
import iconFaq from "../../../assets/img/FAQ.png";
import imgDefault from "../../../assets/img/default.jpg";
// import profileMenu from "../../../assets/img/Profile menu.svg";
// import iconSmile from "../../../assets/img/iconSmile.png";
// import button from "../../../assets/img/button.png";
import { roomChat } from "..//../../redux/action/roomChat";
import { connect } from "react-redux";

function Chat(props) {
  const [showA, setShowA] = useState(false);
  const [show, setShow] = useState(false);

  const toggleShowA = () => {
    setShowA(!showA);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   chatList();
  // });

  const chatList = () => {
    props.roomChat(props.user.data.user_id).then((res) => {
      console.log(res);
    });
  };

  console.log(props);

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
                <Col className={styles.chat} key={index}>
                  <Row>
                    {item.user_image.length > 0 ? (
                      <img src={item.user_image} alt="" />
                    ) : (
                      <img src={imgDefault} alt="" />
                    )}

                    <Col>
                      <div className={styles.nameUser}>
                        <h5>{item.user_name}</h5>
                        <h6>21:16</h6>
                      </div>
                      <div className={`${styles.message} ${styles.receiver}`}>
                        <h4>Woy</h4>
                        <h3>3</h3>
                      </div>
                    </Col>
                  </Row>
                </Col>
              );
            })}

            {/* <Col className={styles.chat}>
              <Row>
                <img src={photoProfile} alt="" />
                <Col>
                  <div className={styles.nameUser}>
                    <h5>Rifqi Ziyad Imtinan</h5>
                    <h6>21:16</h6>
                  </div>
                  <div className={`${styles.message} ${styles.sender}`}>
                    <h4>Woy</h4>
                    <img src={checkListRead} alt="" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className={styles.chat}>
              <Row>
                <img src={photoProfile} alt="" />
                <Col>
                  <div className={styles.nameUser}>
                    <h5>Rifqi Ziyad Imtinan</h5>
                    <h6>21:16</h6>
                  </div>
                  <div className={`${styles.message} ${styles.sender}`}>
                    <h4>Woy</h4>
                    <img src={checkListNotRead} alt="" />
                  </div>
                </Col>
              </Row>
            </Col> */}
            {/* <Col className={styles.chat}>
              <Row>
                <img src={photoProfile} alt="" />
                <Col>
                  <div className={styles.nameUser}>
                    <h5>Rifqi Ziyad Imtinan</h5>
                    <h6>Yesterday</h6>
                  </div>
                  <div className={`${styles.message} ${styles.sender}`}>
                    <h4>Woy</h4>
                  </div>
                </Col>
              </Row>
            </Col> */}
          </Col>
          <Col md={8} className={styles.coloumn2}>
            {/* Please select a chat to start messaging */}
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          {/* <Col md={8} className={styles.coloumn21}>
            <div className={styles.top}>
              <Col md={3} className={styles.topLeft}>
                <Row className={styles.topLeftName}>
                  <img src={photoProfile} alt="" />
                  <Col>
                    <span>Mother</span>
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
                <img src={photoProfile} alt="" />
                <div className={styles.colR}>
                  <p>
                    Hi, son, how are you doing? Today, my father and I went to
                    buy a car, bought a cool car.
                  </p>
                </div>
              </div>
              <div className={styles.messagesSender}>
                <img src={photoProfile} alt="" />
                <div className={styles.colS}>
                  <p>
                    Hi, son, how are you doing? Today, my father and I went to
                    buy a car, bought a cool car.
                  </p>
                </div>
              </div>
              <div className={styles.messagesReceiver}>
                <img src={photoProfile} alt="" />
                <div className={styles.colR}>
                  <p>
                    Hi, son, how are you doing? Today, my father and I went to
                    buy a car, bought a cool car.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.inputChat}>
              <input type="text" placeholder="Type your message..." />
              <img src={iconPlus} alt="" />
              <img src={iconSmile} alt="" />
              <img src={button} alt="" />
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
  chatList: state.roomChat,
});

const mapDispatchToProps = { roomChat };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
