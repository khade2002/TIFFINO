//package com.tiffino.review.service;
//
//import com.tiffino.review.dto.ReviewRequestDTO;
//import com.tiffino.review.dto.ReviewResponseDTO;
//import com.tiffino.review.model.Review;
//import com.tiffino.review.repository.ReviewRepository;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.web.server.ResponseStatusException;
//
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class ReviewServiceImpl implements ReviewService {
//
//    @Autowired
//    private ModelMapper mapper;
//
//    @Autowired
//    private ReviewRepository reviewRepo;
//
//
//    @Override    //from ReviewService
//    public ReviewResponseDTO createReview(ReviewRequestDTO dto) {
//        Review review=mapper.map(dto, Review.class);
//        review.setReviewDate(LocalDateTime.now());
//
//        Review saved=reviewRepo.save(review);
//        return mapper.map(saved, ReviewResponseDTO.class);
//    }
//
//    @Override
//    public List<ReviewResponseDTO> getAllReviews() {
//        return reviewRepo.findAll()
//                .stream()
//                .map(review ->{                                               //for each object
//                    ReviewResponseDTO dto= mapper.map(review, ReviewResponseDTO.class);
//                    return dto;
//                })
//                .collect(Collectors.toList());
//         /*       .map(review -> mapper.map(review, ReviewResponseDTO.class))  //convert/transform entity to dto
//                .collect(Collectors.toList());      */   //collect back to list
//    }
//
//    @Override
//    public ReviewResponseDTO getReviewById(Long id) {
//        Review review=reviewRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found with ID: "+id));
//
//        if(review != null){
//            ReviewResponseDTO reviewCom=mapper.map(review, ReviewResponseDTO.class);
//            return reviewCom;
//        }
//        return null;
//    }
//
//    @Override
//    public List<ReviewResponseDTO> getReviewByMealId(Long mealId) {
//        return reviewRepo.findByMealId(mealId)
//                .stream()
//                .map(review ->mapper.map(review, ReviewResponseDTO.class))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public ReviewResponseDTO updateReview(Long id, ReviewRequestDTO dto) {
//        Review existingRev = reviewRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot update, Review not found with ID: "+id));
//        if (existingRev != null) {
//            if (dto.getRating() != null) {
//                existingRev.setRating(dto.getRating());
//            }
//            if (dto.getComment() != null) {
//                existingRev.setComment(dto.getComment());
//            }
//
//            existingRev.setReviewDate(LocalDateTime.now());
//            Review updated=reviewRepo.save(existingRev);
//            return mapper.map(updated, ReviewResponseDTO.class);
//        }
//        return null;  //id not found
//    }
//
//    @Override
//    public void deleteReview(Long id) {
//        Review existing = reviewRepo.findById(id)
//                        .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, " can't delete. Review not found with ID: "+id));
//        reviewRepo.deleteById(id);
//
//    }
//
//    @Override
//    public Double getAvgRatingForMeal(Long mealId) {
//        Double avg=reviewRepo.findAverageRatingByMealId(mealId);
//        return avg != null ? avg : 0.0;
//    }
//
//
//}


package com.tiffino.review.service;

import com.tiffino.review.dto.ReviewRequestDTO;
import com.tiffino.review.dto.ReviewResponseDTO;
import com.tiffino.review.model.Review;
import com.tiffino.review.repository.ReviewRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ReviewRepository reviewRepo;

    @Override
    public ReviewResponseDTO createReview(ReviewRequestDTO dto) {

        Review review = mapper.map(dto, Review.class);
        review.setReviewDate(LocalDateTime.now());

        Review saved = reviewRepo.save(review);
        return mapper.map(saved, ReviewResponseDTO.class);
    }

    @Override
    public List<ReviewResponseDTO> getAllReviews() {
        return reviewRepo.findAll()
                .stream()
                .map(r -> mapper.map(r, ReviewResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReviewResponseDTO getReviewById(Long id) {
        Review review = reviewRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Review not found with ID: " + id));

        return mapper.map(review, ReviewResponseDTO.class);
    }

    @Override
    public List<ReviewResponseDTO> getReviewsByOrderId(Long orderId) {
        return reviewRepo.findByOrderId(orderId)
                .stream()
                .map(r -> mapper.map(r, ReviewResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReviewResponseDTO updateReview(Long id, ReviewRequestDTO dto) {

        Review existing = reviewRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cannot update, Review not found with ID: " + id));

        if (dto.getRating() != null) existing.setRating(dto.getRating());
        if (dto.getComment() != null) existing.setComment(dto.getComment());

        existing.setReviewDate(LocalDateTime.now());

        Review updated = reviewRepo.save(existing);
        return mapper.map(updated, ReviewResponseDTO.class);
    }

    @Override
    public void deleteReview(Long id) {
        Review existing = reviewRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cannot delete. Review not found with ID: " + id));

        reviewRepo.delete(existing);
    }
}
