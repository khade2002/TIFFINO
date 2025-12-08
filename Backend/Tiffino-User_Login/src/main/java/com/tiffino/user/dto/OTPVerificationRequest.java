package com.tiffino.user.dto;

public class OTPVerificationRequest {
    private String email;
    private String otp;
    private String password;

    // Getters
    public String getEmail() {
        return email;
    }

    public String getOtp() {
        return otp;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
