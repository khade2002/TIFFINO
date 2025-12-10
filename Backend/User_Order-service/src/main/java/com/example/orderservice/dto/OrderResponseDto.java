package com.example.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {

    //private Long id;
    private Long orderId;
    private String userId;
    private String address;
    private String orderType;
    private Long subscriptionId;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private Long paymentId;
    private String notes;
    private BigDecimal appliedDiscount;
    private DeliveryDto delivery;
    private List<OrderItemDto> items;
    private String customerName;
    private String customerPhoneNumber;
    private String rejectionReason;




    public OrderResponseDto(Long id, String status, BigDecimal totalAmount) {
       // this.id = id;
        this.status = status;
        this.totalAmount = totalAmount;
    }

}
