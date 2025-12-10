package com.example.admin_log.dto;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
