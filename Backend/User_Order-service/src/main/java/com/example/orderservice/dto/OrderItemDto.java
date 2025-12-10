package com.example.orderservice.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDto {

    private Long id;
    private String mealName;
    private Integer quantity;
    private BigDecimal pricePerItem;
    private String customizations;
}
