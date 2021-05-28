import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import styles from "./Register.module.css";
import logoGoogle from "../../../assets/img/Logo google.png";
import imgBack from "../../../assets/img/back.png";
import { connect } from "react-redux";
import { register } from "../../../redux/action/auth";

function Register(props) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleRegister = (event) => {
    event.preventDefault();
    props.register(form).then(() => {
      props.history.push("/login");
    });
  };

  const handleBack = (event) => {
    event.preventDefault();
    props.history.push("/login");
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Container className={styles.containerMain}>
        <Card.Body className={styles.cardBody}>
          <div className={styles.register}>
            <img src={imgBack} alt="" onClick={(event) => handleBack(event)} />
            <h1>Register</h1>
          </div>
          <h5>Let’s create your account!</h5>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Name</Form.Label>
              <Form.Control
                className={styles.input}
                type="text"
                name="username"
                placeholder="Enter Your Name"
                value={form.username}
                onChange={(event) => changeText(event)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                className={styles.input}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={(event) => changeText(event)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Password</Form.Label>
              <Form.Control
                className={styles.input}
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={(event) => changeText(event)}
                required
              />
            </Form.Group>
            <Button className={styles.button} variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <h2>Register with</h2>
          <button className={styles.google}>
            <img src={logoGoogle} alt="" />
            <label>Google</label>
          </button>
        </Card.Body>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  register: state.register,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
