package com.example.tiffino_admin_review.Repository;


import com.example.tiffino_admin_review.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
