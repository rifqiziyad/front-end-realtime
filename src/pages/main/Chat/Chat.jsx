import React from "react";
import { useState } from "react";
import { Container, Row, Col, Toast, Button } from "react-bootstrap";
import styles from "./Chat.module.css";
import iconMenu from "../../../assets/img/Menu.png";
import iconSearch from "../../../assets/img/Search.png";
import iconPlus from "../../../assets/img/Plus.png";
import photoProfile from "../../../assets/img/photo-profile.png";
import checkListRead from "../../../assets/img/check-list-read.png";
import checkListNotRead from "../../../assets/img/check-list-not-read.png";
import iconSetting from "../../../assets/img/Settings.png";
import iconContact from "../../../assets/img/Contacts.png";
import iconInvite from "../../../assets/img/Invite friends.png";
import iconFaq from "../../../assets/img/FAQ.png";

function Chat(props) {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => {
    setShowA(!showA);
  };
  return (
    <>
      <Container fluid className={styles.containerMain}>
        <Row>
          <Col md={3} className={styles.coloumn1}>
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
            <Col className={styles.chat}>
              <Row>
                <img src={photoProfile} alt="" />
                <Col>
                  <div className={styles.nameUser}>
                    <h5>Rifqi Ziyad Imtinan</h5>
                    <h6>21:16</h6>
                  </div>
                  <div className={`${styles.message} ${styles.receiver}`}>
                    <h4>Woy</h4>
                    <h3>3</h3>
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
            </Col>
            <Col className={styles.chat}>
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
            </Col>
          </Col>
          <Col md={9} className={styles.coloumn2}>
            Please select a chat to start messaging
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Chat;
