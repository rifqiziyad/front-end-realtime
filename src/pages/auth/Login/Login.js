import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import styles from "./Login.module.css";
import logoGoogle from "../../../assets/img/Logo google.png";

function Login(props) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", form.username);
    props.history.push("/");
  };

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
                name="username"
                value={form.username}
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
                name="password"
                value={form.password}
                onChange={(event) => changeText(event)}
                required
              />
            </Form.Group>
            <h6>Forgot password?</h6>
            <Button className={styles.button} variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <h2>Login with</h2>
          <button className={styles.google}>
            <img src={logoGoogle} alt="" />
            <label>Google</label>
          </button>
          <h3>
            Don’t have an account?{" "}
            <span onClick={(event) => handleSignUp(event)}>Sign Up</span>
          </h3>
        </Card.Body>
      </Container>
    </>
  );
}

export default Login;
