package com.tiffino.user.service;

import com.tiffino.user.dto.*;
import com.tiffino.user.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    String sendOtp(UserOTPRequest request);

    String verifyOtp(OTPVerificationRequest request);

    String registerUser(UserDTO userDto);

    User getUserById(Long userId);

    String loginUser(UserDTO userDto);

    void forgotPassword(ForgotPasswordRequest request);
    boolean resetPassword(ResetPasswordRequest request);


    List<User> getAllUsers();

    User getUserByEmail(String email);

    User getUserByPhone(String phone);

    User updateUser(Long id, UserDTO userDto);

    List<User> getUsersByName(String name);

    void deleteUserById(Long id);

    Map<String, Long> getUserStatistics();

}
