//package com.tiffino.user.repository;
//
//import com.tiffino.user.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findByEmail(String email);
//}
package com.tiffino.user.repository;

import com.tiffino.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    List<User> findByName(String name);
    long countByStatus(String status);
    long count();


}



