package com.example.orderservice.dto;

import lombok.Data;

@Data
public class DeliveryDto {
    private Long deliveryId;
    private String deliveryPartnerName;
    private String deliveryPartnerPhone;
}
