package com.example.SklepCool.mapper;

import com.example.SklepCool.dto.CartItemDto;
import com.example.SklepCool.model.CartItem;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface CartItemMapper {

    CartItemDto mapToDto(CartItem cartItem);

    List<CartItemDto> mapToDtoList(List<CartItem> items);
}
