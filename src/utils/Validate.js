export const checkValidData = (email, password, confirmPassword) => {
    const isValidEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    const doPasswordsMatch = password === confirmPassword || !confirmPassword;

    const errors = {
        email: null,
        password: null,
        confirmPassword: null,
    };

    if (!isValidEmail) {
        errors.email = "Invalid Email";
    }
    if (!isValidPassword) {
        errors.password = "Password Not Compatible";
    }
    if (!doPasswordsMatch) {
        errors.confirmPassword = "Passwords do not match";
    }

    // Return errors object; if all are null, return null
    return Object.values(errors).some(error => error !== null) ? errors : null;
};
