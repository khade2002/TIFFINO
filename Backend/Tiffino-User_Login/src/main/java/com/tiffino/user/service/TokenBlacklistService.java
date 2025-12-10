
package com.tiffino.user.service;

import com.tiffino.user.entity.BlacklistedToken;
import com.tiffino.user.repository.BlacklistedTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenBlacklistService {

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    public void blacklistToken(String token) {
        BlacklistedToken blacklisted = new BlacklistedToken();
        blacklisted.setToken(token);
        blacklistedTokenRepository.save(blacklisted);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokenRepository.findByToken(token).isPresent();
    }
}
