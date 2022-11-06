const validate = (error, value, cbValidate) => {
    if (error) {
        return error
    }
    return cbValidate(value);
}

export const validateRequired = (value) => {
    let error;
    if (!value) {
        return error = 'Поле обязательно';
    }
    return error
}

export const validateEmail = (value) => {
    let error;
    error = validate(error, value, validateRequired)
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Неправильный формат email';
    }
    return error;
}

export const validateMinLength = (minLength) => (value) => {
    let error;
    if (value.length < minLength) {
        error = `Минимальное количество символов ${minLength}`
    }
    return error;
}

export const validateMaxLength = (maxLength) => (value) => {
    let error;
    if (value.length > maxLength) {
        error = `Максимальное количество символов ${maxLength}`
    }
    return error;
}

export const validatePassword = (value) => {
    let error;
    error = validate(error, value, validateRequired)
    error = validate(error, value, validateMinLength(6))
    error = validate(error, value, validateMaxLength(20))
    return error
}

export const validateLogin = (value) => {
    let error;
    error = validate(error, value, validateRequired)
    error = validate(error, value, validateMinLength(2))
    error = validate(error, value, validateMaxLength(20))
    return error
}

export const validateTaskDescription = (value) => {
    let error;
    error = validate(error, value, validateRequired)
    error = validate(error, value, validateMaxLength(200))
    return error
}