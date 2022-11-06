import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import cn from "classname";
import {
  validateEmail,
  validateLogin,
  validatePassword,
} from "../сommon/validator/validator";
import {
  loginThunkCreator,
  registrateThunkCreator,
  setErrorAuth,
  setStatusRegistration,
} from "../../redux/auth-reducer";
import {
  getAuthStatus,
  getErrorAuth,
  getMyUserId,
  getStatusRegistration,
} from "../../redux/auth-selector";

const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login">
      <h1 className="login__header">
        {isLogin ? "Авторизация" : "Регистрация"}
      </h1>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          if (isLogin) {
            props.onLogin(values.login, values.password);
          } else {
            props.onRegistrate(values.email, values.login, values.password);
          }
        }}
      >
        {({ errors, touched, values }) => {
          return (
            <Form>
              <div className="login__form">
                {!isLogin && (
                  <div className="login__input-wrapper">
                    <label className="login__input-label" htmlFor="email">
                      Email:
                    </label>
                    <Field
                      className={cn("input", "login__input", {
                        "invalid-input": errors.email && touched.email,
                      })}
                      placeholder="Email"
                      name="email"
                      component="input"
                      id="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="input__error-message">{errors.email}</div>
                    )}
                  </div>
                )}
                <div className="login__input-wrapper">
                  <label className="login__input-label" htmlFor="login">
                    Логин:
                  </label>
                  <Field
                    className={cn("input", "login__input", {
                      "invalid-input": errors.login && touched.login,
                    })}
                    placeholder="Login"
                    name="login"
                    component="input"
                    id="login"
                    validate={validateLogin}
                  />
                  {errors.login && touched.login && (
                    <div className="input__error-message">{errors.login}</div>
                  )}
                </div>
                <div className="login__input-wrapper">
                  <label className="login__input-label" htmlFor="password">
                    Пароль:
                  </label>
                  <Field
                    className={cn("input", "login__input", {
                      "invalid-input": errors.password && touched.password,
                    })}
                    placeholder="Password"
                    type="password"
                    name="password"
                    component="input"
                    id="password"
                    validate={validatePassword}
                  />
                  {errors.password && touched.password && (
                    <div className="input__error-message">{errors.password}</div>
                  )}
                </div>
                {props.error && <p className="input__error-message">{props.error}</p>}
                {props.statusRegistration && !isLogin && (
                  <p className="login__message-success">
                    Пользователь{" "}
                    <span>
                      <b>{values.email}</b>
                    </span>{" "}
                    зарегестрирован
                  </p>
                )}
                <div className="login__type-toggle-wrapper">
                  <span
                    className="login__type-toggle"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      props.setError(null);
                      props.setStatusRegistration(false);
                      errors.password = null;
                      errors.login = null;
                      errors.email = null;
                      touched.email = false;
                      touched.login = false;
                      touched.password = false;
                    }}
                  >
                    {isLogin ? "Зарегистрироваться" : "Авторизоваться"}
                  </span>
                  <button className="button login__button" type="submit">
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
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
      error={props.error}
      setError={props.setErrorAuth}
      statusRegistration={props.statusRegistration}
      setStatusRegistration={props.setStatusRegistration}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getMyUserId(state),
    isAuth: getAuthStatus(state),
    error: getErrorAuth(state),
    statusRegistration: getStatusRegistration(state),
  };
};

export default connect(mapStateToProps, {
  loginThunkCreator,
  registrateThunkCreator,
  setErrorAuth,
  setStatusRegistration,
})(Login);
