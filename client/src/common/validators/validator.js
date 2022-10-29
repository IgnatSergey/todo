export const validRequired = (value) => {
    let error;
    if (!value) {
        error = 'Field is required';
    }
    return error;
}