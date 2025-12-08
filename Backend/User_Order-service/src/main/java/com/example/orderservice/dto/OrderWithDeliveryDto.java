package com.example.orderservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderWithDeliveryDto {

    private Long orderId;
    private String deliveryPartnerName;
    private String deliveryPartnerPhone;

    private List<OrderItemDto> items;
}
