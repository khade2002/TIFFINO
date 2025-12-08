package com.cart.service;

import com.cart.entity.CartItem;
import com.cart.repository.CartRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    private CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // Add item
    public CartItem addItem(CartItem item) {
        CartItem existingItem = cartRepository.findByFoodId(item.getFoodId());
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + item.getQuantity());
            existingItem.setSubtotal(existingItem.getPrice() * existingItem.getQuantity());
            return cartRepository.save(existingItem);
        } else {
            item.setSubtotal(item.getPrice() * item.getQuantity());
            return cartRepository.save(item);
        }
    }

    // Get all items
    public List<CartItem> getCart() {
        return cartRepository.findAll();
    }

    // Get item by id
    public CartItem getItemById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    // Update item
    public CartItem updateItem(String foodId, int quantity) {
        CartItem item = cartRepository.findByFoodId(foodId);
        if (item != null) {
            item.setQuantity(quantity);
            item.setSubtotal(item.getPrice() * quantity);
            return cartRepository.save(item);
        }
        return null;
    }

    // Remove one item
    public boolean removeItem(String foodId) {
        CartItem item = cartRepository.findByFoodId(foodId);
        if (item != null) {
            cartRepository.delete(item);
            return true;
        }
        return false;
    }

    // Total
    public double getCartTotal() {
        return cartRepository.findAll().stream()
                .mapToDouble(CartItem::getSubtotal)
                .sum();
    }

    /* ========================================================
       NEW: CLEAR FULL CART
    ======================================================== */
    public void clearCart() {
        cartRepository.deleteAll();
    }
}
