package com.example.SklepCool.model;

import java.util.List;

public class Cart {
    private List<Product> products;

    public void addProduct(Product product){products.add(product);}
    public void deleteProduct(Product product){products.remove(product);}
    public List<Product> getProducts(){return products;}
    public void clearCart(){products.clear();}
    public boolean isCartEmpty(){return products.isEmpty();}
    public Integer getCartProductsCount(){ return products.size();}


}
