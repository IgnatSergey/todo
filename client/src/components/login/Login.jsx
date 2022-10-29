import { Formik, Field, Form } from "formik";
import { validRequired } from "../../common/validators/validator";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthStatus, getMyUserId } from "../../redux/auth-selector";
import {
  loginThunkCreator,
  registrateThunkCreator,
} from "../../redux/auth-reducer";
import { useState } from "react";

const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? <h1>Авторизация</h1> : <h1>Регистрация</h1>}
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          if (isLogin) {
            props.onLogin(values.login, values.password);
          } else {
            props.onRegistrate(values.login, values.password);
            setIsLogin(true);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="login-form">
              <div className="login-input-wrapper">
                <label htmlFor="login">Login:</label>
                <Field
                  className="login-input"
                  placeholder="Login"
                  name="login"
                  component="input"
                  validate={validRequired}
                />
                {errors.login && touched.login && (
                  <div className="error">{errors.login}</div>
                )}
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="password">Password:</label>
                <Field
                  className="login-input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  component="input"
                  validate={validRequired}
                />
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              {isLogin ? (
                <button
                  type="button"
                  href="#"
                  onClick={() => setIsLogin(false)}
                >
                  Регистрация
                </button>
              ) : (
                <button type="button" href="#" onClick={() => setIsLogin(true)}>
                  Авторизация
                </button>
              )}
              <button type="submit">
                {/* {isLogin ? "Войти" : "Зарегистрироывться"} */}
                войти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const Login = (props) => {
  if (props.isAuth) {
    return <Navigate to={`/task/${props.userId}`} />;
  }
  return (
    <LoginForm
      onLogin={props.loginThunkCreator}
      onRegistrate={props.registrateThunkCreator}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getMyUserId(state),
    isAuth: getAuthStatus(state),
  };
};

export default connect(mapStateToProps, {
  loginThunkCreator,
  registrateThunkCreator,
})(Login);
