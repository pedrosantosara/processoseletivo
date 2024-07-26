package com.pedrosantosara.app_cadastro.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ItemDTO(
        UUID id,
        @NotBlank(message = "O título é obrigatório") String title,
        @NotBlank(message = "A descrição é obrigatória") String description,
        @NotBlank(message = "A categoria é obrigatória") String category,
        @NotNull(message = "O preço é obrigatório") @PositiveOrZero(message = "O preço deve ser positivo ou zero") Float price,
        @NotNull(message = "A imagem é obrigatória") byte[] displayPicture // Armazenar como byte[]
) {}
