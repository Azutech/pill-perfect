"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
function validatePassword(password) {
    // Password should be at least 8 characters long
    if (password.length < 8) {
        return false;
    }
    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }
    // At least one symbol (you can customize this regular expression)
    if (!/[\W_]/.test(password)) {
        return false;
    }
    return true;
}
exports.validatePassword = validatePassword;
