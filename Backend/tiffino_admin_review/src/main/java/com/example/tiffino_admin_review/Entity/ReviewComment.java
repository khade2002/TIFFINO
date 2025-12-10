package com.example.tiffino_admin_review.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="review_comment")
public class ReviewComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reply;
    private LocalDateTime createdAt= LocalDateTime.now();

    private Long reviewId;  // id from user module
    private long adminId;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }


    public void setReply(String reply) {
        this.reply=reply;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getReply() {
        return reply;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public void setAdminId(long adminId) {
        this.adminId = adminId;
    }
}
