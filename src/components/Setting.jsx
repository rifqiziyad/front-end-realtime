import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import iconSetting from "../assets/img/Settings.png";
import iconContact from "../assets/img/Contacts.png";
import iconInvite from "../assets/img/Invite friends.png";
import iconFaq from "../assets/img/FAQ.png";
import styles from "../pages/main/Chat/Chat.module.css";

class Setting extends Component {
  handleLogout = () => {
    this.props.socket.emit(
      "disconnect-server",
      sessionStorage.getItem("userid")
    );
    sessionStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
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
        <button onClick={this.handleLogout}>Logout</button>
      </>
    );
  }
}

export default withRouter(Setting);
