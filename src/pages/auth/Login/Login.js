import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import styles from "./Login.module.css";
import logoGoogle from "../../../assets/img/Logo google.png";
import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";
import Swal from "sweetalert2";

function Login(props) {
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const handleLogin = (event) => {
    event.preventDefault();

    props
      .login(form)
      .then((res) => {
        sessionStorage.setItem("token", res.value.data.data.token);
        sessionStorage.setItem("username", res.value.data.data.user_name);
        sessionStorage.setItem("userid", res.value.data.data.user_id);
        Swal.fire({
          icon: "success",
          title: res.value.data.msg,
          confirmButtonText: "Ok",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
        });
      });
  };

  if (props.auth.isLoading) {
    Swal.showLoading();
  }

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    props.history.push("/register");
  };

  return (
    <>
      <Container className={styles.containerMain}>
        <Card.Body className={styles.cardBody}>
          <h1>Login</h1>
          <h5>Hi, Welcome back!</h5>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                className={styles.input}
                type="text"
                placeholder="Enter Your Email"
                name="userEmail"
                value={form.userEmail}
                onChange={(event) => changeText(event)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Password</Form.Label>
              <Form.Control
                className={styles.input}
                type="password"
                placeholder="Enter Your Password"
                name="userPassword"
                value={form.userPassword}
                onChange={(event) => changeText(event)}
                required
              />
            </Form.Group>
            <Button className={styles.button} variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <h2 className={styles.loginWith}>Login with</h2>
          <button className={styles.google}>
            <img src={logoGoogle} alt="" />
            <label>Google</label>
          </button>
          <h3>
            Don???t have an account?{" "}
            <span onClick={(event) => handleSignUp(event)}>Sign Up</span>
          </h3>
        </Card.Body>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
