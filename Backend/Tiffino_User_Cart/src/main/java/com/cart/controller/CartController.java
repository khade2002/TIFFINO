package com.cart.controller;

import com.cart.entity.CartItem;
import com.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add item
    @PostMapping("/items")
    public ResponseEntity<CartItem> addItem(@RequestBody CartItem item) {
        CartItem savedItem = cartService.addItem(item);
        return ResponseEntity.ok(savedItem);
    }

    // Get all items
    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getCart() {
        return ResponseEntity.ok(cartService.getCart());
    }

    // Get item by id
    @GetMapping("/items/{id}")
    public ResponseEntity<CartItem> getItemById(@PathVariable Long id) {
        CartItem item = cartService.getItemById(id);
        if (item != null) return ResponseEntity.ok(item);
        return ResponseEntity.notFound().build();
    }

    // Update item
    @PutMapping("/items")
    public ResponseEntity<CartItem> updateItem(@RequestBody CartItem request) {
        if (request.getFoodId() == null || request.getQuantity() <= 0) {
            return ResponseEntity.badRequest().build();
        }
        CartItem updatedItem = cartService.updateItem(request.getFoodId(), request.getQuantity());
        if (updatedItem != null) return ResponseEntity.ok(updatedItem);
        return ResponseEntity.notFound().build();
    }

    // Remove single item
    @DeleteMapping("/items")
    public ResponseEntity<Void> removeItem(@RequestBody CartItem request) {
        if (request.getFoodId() == null) return ResponseEntity.badRequest().build();
        boolean removed = cartService.removeItem(request.getFoodId());
        if (removed) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    // Total price
    @GetMapping("/total")
    public ResponseEntity<Double> getCartTotal() {
        return ResponseEntity.ok(cartService.getCartTotal());
    }

    /* ========================================================
       NEW: CLEAR FULL CART (fixes your issue)
    ======================================================== */
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok("Cart cleared successfully");
    }
}
