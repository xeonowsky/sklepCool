package com.example.SklepCool.mapper;

import com.example.SklepCool.dto.ProductDto;
import com.example.SklepCool.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto mapToDto(Product product);
}
