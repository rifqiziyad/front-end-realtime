import { useState } from "react";
import iconPrev from "../assets/img/back.png";
import imgDefault from "../assets/img/profileDefault.png";
import styles from "./ContactInfo.module.css";

function ContactInfo(props) {
  const [dataReceiver, setDataReceiver] = useState([]);
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <h3>@rifqiZiyad</h3>
      </div>
      {dataReceiver.user_image ? (
        <img
          src={"http://localhost:3003/backend3/api/" + dataReceiver.user_image}
          alt=""
          className={styles.image}
        />
      ) : (
        <img src={imgDefault} alt="" className={styles.image} />
      )}
      <div className={styles.info}>
        <h5>Rifqi Ziyad Imtinan</h5>
        <h6>Online</h6>
      </div>

      <div className={styles.info}>
        <h5>Phone Number</h5>
        <h6>023948245</h6>
      </div>

      <div className={styles.rowNav}>
        <span className={styles.colNav}>Location</span>
        <span className={styles.colNav}>Image</span>
        <span className={styles.colNav}>Documents</span>
      </div>
    </div>
  );
}

export default ContactInfo;
