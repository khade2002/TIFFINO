package com.example.orderservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {

    private String userId;
    private String address;
    private String orderType;
    private Long subscriptionId;
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


}
