package com.lomeu.mony.mapper;

import com.lomeu.mony.dto.CategoryDTO;
import com.lomeu.mony.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public static CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    public static Category toEntity(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        return category;
    }
}
