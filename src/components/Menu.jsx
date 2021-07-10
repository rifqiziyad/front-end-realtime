import React from "react";
import iconSetting from "../assets/img/Settings.png";
import iconContact from "../assets/img/Contacts.png";
import iconInvite from "../assets/img/Invite friends.png";
import iconFaq from "../assets/img/FAQ.png";
import styles from "../pages/main/Chat/Chat.module.css";

function Menu(props) {
  const manipulationDataSetting = () => {
    props.throwData(true);
  };

  const manipulationDataInviteFriend = () => {
    props.throwDataInviteFriend(true);
  };

  const manipulationDataContact = () => {
    props.throwDataContact(true);
  };

  return (
    <>
      <div className={styles.icon} onClick={manipulationDataSetting}>
        <img src={iconSetting} alt="" />
        <p>Setings</p>
      </div>
      <div className={styles.icon} onClick={manipulationDataContact}>
        <img src={iconContact} alt="" />
        <p>Contacts</p>
      </div>
      <div className={styles.icon} onClick={manipulationDataInviteFriend}>
        <img src={iconInvite} alt="" />
        <p>Invite Friend</p>
      </div>
      <div className={styles.icon}>
        <img src={iconFaq} alt="" />
        <p>Telegram FAQ</p>
      </div>
    </>
  );
}

export default Menu;
