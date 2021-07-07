import imgDefault from "../assets/img/profileDefault.png";
import styles from "./Settings.module.css";
import iconChangePassword from "../assets/img/iconChangePassword.png";
import iconLogout from "../assets/img/iconLogout.png";
import iconPrev from "../assets/img/back.png";
import { connect } from "react-redux";

function Settings(props) {
  const handleLogout = () => {
    props.socket.emit("disconnect-server", sessionStorage.getItem("userid"));
    sessionStorage.clear();
    props.history.push("/login");
  };

  const manipulationDataSetting = () => {
    props.throwData(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <img src={iconPrev} alt="" onClick={manipulationDataSetting} />
        <h3>
          @{props.user.username ? props.user.username : props.user.user_name}
        </h3>
      </div>

      <div className={styles.profile}>
        {props.user.user_image ? (
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
        <h5>{props.user.user_name}</h5>
        <h6>
          @{props.user.username ? props.user.username : props.user.user_name}
        </h6>
        <hr />
      </div>

      <h5 className={styles.account}>Account</h5>

      <div className={styles.info}>
        <h3>{props.user.user_phone}</h3>
        <h4>Phone Number</h4>
      </div>

      <div className={styles.username}>
        <h3>
          @{props.user.username ? props.user.username : props.user.user_name}
        </h3>
        <h4>Username</h4>
      </div>

      <div className={styles.bio}>
        <h3>{props.user.user_bio}</h3>
        <h4>Bio</h4>
      </div>

      <h5>Settings</h5>
      <div className={styles.changePassword}>
        <img src={iconChangePassword} alt="" />
        <h2>Change Password</h2>
      </div>

      <div className={styles.logout} onClick={handleLogout}>
        <img src={iconLogout} alt="" />
        <h2>Logout</h2>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.data,
});

export default connect(mapStateToProps)(Settings);
