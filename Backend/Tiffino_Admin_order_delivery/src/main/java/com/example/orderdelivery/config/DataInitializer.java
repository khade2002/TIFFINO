//package com.example.orderdelivery.config;
//
//import com.example.orderdelivery.entity.DeliveryPartner;
//import com.example.orderdelivery.entity.Order;
//import com.example.orderdelivery.entity.OrderItem;
//import com.example.orderdelivery.repository.DeliveryPartnerRepository;
//import com.example.orderdelivery.repository.OrderRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DataInitializer {
//
//    @Bean
//    CommandLineRunner runner(OrderRepository orderRepository, DeliveryPartnerRepository partnerRepository) {
//        return args -> {
//            if (orderRepository.count() == 0) {
//                Order o = new Order();
//                o.setCustomerName("John Doe");
//                o.setCustomerPhone("+911234567890");
//                o.setAddress("123 Main St, Mumbai");
//                OrderItem i1 = new OrderItem(); i1.setName("Paneer Butter Masala"); i1.setQuantity(1); i1.setPrice(220.0);
//                o.addItem(i1);
//                orderRepository.save(o);
//            }
//            if (partnerRepository.count() == 0) {
//                DeliveryPartner p = new DeliveryPartner(); p.setName("Ramesh"); p.setPhone("+919876543210"); p.setAvailable(true);
//                partnerRepository.save(p);
//            }
//        };
//    }
//}
