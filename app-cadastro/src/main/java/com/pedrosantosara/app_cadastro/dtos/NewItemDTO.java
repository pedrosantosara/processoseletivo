package com.pedrosantosara.app_cadastro.dtos;

import org.springframework.web.multipart.MultipartFile;



public record NewItemDTO(
       String title,
        String description,
         String category,
        Float price,
         MultipartFile file
) {}
