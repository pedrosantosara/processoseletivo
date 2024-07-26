package com.pedrosantosara.app_cadastro.controllers;

import java.io.IOException;
import java.util.List;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.pedrosantosara.app_cadastro.dtos.ItemDTO;
import com.pedrosantosara.app_cadastro.dtos.NewItemDTO;
import com.pedrosantosara.app_cadastro.service.ItemService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/items")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemDTO> createNewItem(@Valid @ModelAttribute NewItemDTO newItemDTO) {
        ItemDTO itemDTO = itemService.createItem(newItemDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemDTO);
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> itemDTOs = itemService.getAllItems();
        return ResponseEntity.ok(itemDTOs);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable UUID id) {
        ItemDTO itemDTO = itemService.getItemById(id);
        if (itemDTO != null) {
            return ResponseEntity.ok(itemDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/{id}/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getItemImage(@PathVariable UUID id) {
        ItemDTO itemDTO = itemService.getItemById(id);
        if (itemDTO != null) {
            byte[] imageBytes = itemDTO.displayPicture();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping(value = "/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable UUID id, @Valid @ModelAttribute NewItemDTO newItemDTO)
            throws IOException {
        ItemDTO updatedItemDTO = itemService.updateItem(id, newItemDTO);
        return ResponseEntity.ok(updatedItemDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable UUID id) {
        itemService.deleteItem(id);
        return ResponseEntity.ok().build();
    }
}