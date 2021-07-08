import imgDefault from "../assets/img/profileDefault.png";
import styles from "./Settings.module.css";
import iconChangePassword from "../assets/img/iconChangePassword.png";
import iconLogout from "../assets/img/iconLogout.png";
import iconPrev from "../assets/img/back.png";
import iconUpdate from "../assets/img/iconUpdate.png";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import iconEdit from "../assets/img/iconEdit.png";
import iconDelete from "../assets/img/iconDelete.png";
import axiosApiIntances from "../utils/axios";

function Settings(props) {
  const [dataUser, setDataUser] = useState(props.user);
  const [isUpdate, setIsupdate] = useState(false);
  const inputOpenFileRef = React.createRef();

  useEffect(() => {
    getDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataUser = () => {
    axiosApiIntances
      .get(`user/${dataUser.user_id}`)
      .then((res) => {
        setDataUser(res.data.data[0]);
      })
      .catch((err) => {
        return err.response.data.msg;
      });
  };

  const handleLogout = () => {
    props.socket.emit("disconnect-server", sessionStorage.getItem("userid"));
    sessionStorage.clear();
    props.history.push("/login");
  };

  const manipulationDataSetting = () => {
    props.throwData(false);
  };

  const changeIsUpdate = () => {
    setIsupdate(!isUpdate);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setIsupdate(!isUpdate);

    if (window.confirm("sure you want to change data ?") === true) {
      const setData = {
        userName: dataUser.user_name,
        username: dataUser.username,
        userPhone: dataUser.user_phone,
        userBio: dataUser.user_bio,
      };
      axiosApiIntances
        .patch(`user/${dataUser.user_id}`, setData)
        .then(() => {
          alert("Update data success");
        })
        .catch((err) => {
          return err.response.data.msg;
        });
      setIsupdate(!isUpdate);
    } else {
      getDataUser();
      setIsupdate(!isUpdate);
    }
  };

  const updateImage = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    // for (var value of formData.values()) {
    //   console.log(value);
    // }

    if (window.confirm("sure you want to change data ?") === true) {
      axiosApiIntances
        .patch(`user/image/${dataUser.user_id}`, formData)
        .then(() => {
          getDataUser();
        })
        .catch((err) => {
          return err.response;
        });
    }
  };

  const deleteImage = () => {
    if (window.confirm("sure you want to change data ?") === true) {
      axiosApiIntances
        .patch(`user/image/${dataUser.user_id}`, "")
        .then(() => {
          getDataUser();
        })
        .catch((err) => {
          return err.response;
        });
    }
  };

  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  const changeText = (event) => {
    setDataUser({ ...dataUser, [event.target.name]: event.target.value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setIsupdate(!isUpdate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <img src={iconPrev} alt="" onClick={manipulationDataSetting} />
        {dataUser.username ? <h3>@{dataUser.username}</h3> : <h3>@-</h3>}
      </div>

      <div className={styles.profile}>
        <div className={styles.photoProfile}>
          {dataUser.user_image ? (
            <img
              src={"http://localhost:3003/backend3/api/" + dataUser.user_image}
              alt=""
              className={styles.image}
            />
          ) : (
            <img src={imgDefault} alt="" className={styles.image} />
          )}
          {isUpdate ? (
            <div className={styles.updatePhoto}>
              <div
                className={styles.edit}
                onClick={showOpenFileDlg}
                onChange={(e) => updateImage(e)}
              >
                <input
                  ref={inputOpenFileRef}
                  type="file"
                  style={{ display: "none" }}
                />
                <img src={iconEdit} alt="" />
              </div>
              <img
                className={styles.delete}
                src={iconDelete}
                alt=""
                onClick={deleteImage}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <h5>{dataUser.user_name}</h5>
        {dataUser.username ? <h6>@{dataUser.username}</h6> : <h6>@-</h6>}

        <hr />
      </div>

      <h5 className={styles.account}>Account</h5>
      <form>
        <div className={styles.info}>
          <h4>Name</h4>
          {isUpdate ? (
            <input
              type="text"
              value={dataUser.user_name}
              name="user_name"
              onChange={(event) => changeText(event)}
            />
          ) : (
            <h3>{dataUser.user_name}</h3>
          )}
        </div>

        <div className={styles.info}>
          <h4>Phone Number</h4>
          {isUpdate ? (
            <input
              type="number"
              value={dataUser.user_phone}
              name="user_phone"
              onChange={(event) => changeText(event)}
            />
          ) : (
            <h3>{dataUser.user_phone}</h3>
          )}
        </div>

        <div className={styles.username}>
          <h4>Username</h4>
          {isUpdate ? (
            <input
              type="text"
              value={dataUser.username}
              name="username"
              onChange={(event) => changeText(event)}
            />
          ) : dataUser.username ? (
            <h3>@{dataUser.username}</h3>
          ) : (
            <h3>@-</h3>
          )}
        </div>

        <div className={styles.bio}>
          <h4>Bio</h4>
          {isUpdate ? (
            <input
              type="text"
              value={dataUser.user_bio}
              name="user_bio"
              onChange={(event) => changeText(event)}
            />
          ) : (
            <h3>{dataUser.user_bio}</h3>
          )}
        </div>

        <h5>Settings</h5>
        <div className={isUpdate ? styles.submitUpdate : styles.update}>
          {isUpdate ? (
            <div className={styles.buttonUpdate}>
              <button
                className={styles.submit}
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button className={styles.cancel} onClick={handleCancel}>
                cancel
              </button>
            </div>
          ) : (
            <div onClick={changeIsUpdate}>
              <img src={iconUpdate} alt="" />
              <h2>Update</h2>
            </div>
          )}
        </div>
      </form>

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
