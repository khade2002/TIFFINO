package com.example.admin_log.service;

public interface AdminService {

    boolean login(String email, String rawPassword);

    void resetPassword(String email, String oldPassword, String newPassword, String confirmPassword);

    void sendTemporaryPassword(String email);

    String forgotPassword(String email);
}
