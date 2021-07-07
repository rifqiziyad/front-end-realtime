import imgDefault from "../assets/img/profileDefault.png";
import styles from "./ContactInfo.module.css";

function ContactInfo(props) {
  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <h3>@{props.receiverData.user_name}</h3>
      </div>
      {props.receiverData.user_image ? (
        <img
          src={
            "http://localhost:3003/backend3/api/" +
            props.receiverData.user_image
          }
          alt=""
          className={styles.image}
        />
      ) : (
        <img src={imgDefault} alt="" className={styles.image} />
      )}
      <div className={styles.info}>
        <h5>{props.receiverData.user_name}</h5>
        <h6>
          {props.userOnline.includes(props.receiverData.user_id)
            ? "Online"
            : "Offline"}
        </h6>
      </div>

      <div className={styles.info}>
        <h5>Phone Number</h5>
        <h6>
          {props.receiverData.user_phone ? props.receiverData.user_phone : "-"}
        </h6>
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
