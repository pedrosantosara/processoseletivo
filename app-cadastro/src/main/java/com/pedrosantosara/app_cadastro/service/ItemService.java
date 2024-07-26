package com.pedrosantosara.app_cadastro.service;

import com.pedrosantosara.app_cadastro.dtos.ItemDTO;
import com.pedrosantosara.app_cadastro.dtos.NewItemDTO;
import com.pedrosantosara.app_cadastro.entity.Item;
import com.pedrosantosara.app_cadastro.exceptions.ImageUploadException;
import com.pedrosantosara.app_cadastro.exceptions.ItemNotFoundException;
import com.pedrosantosara.app_cadastro.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public ItemDTO createItem(NewItemDTO newItemDTO) {
        validateImage(newItemDTO.file());

        Item item = new Item();
        item.setTitle(newItemDTO.title());
        item.setDescription(newItemDTO.description());
        item.setCategory(newItemDTO.category());
        item.setPrice(newItemDTO.price());
        item.setDisplayPicture(getImageBytes(newItemDTO.file()));

        return toItemDTO(itemRepository.save(item));
    }

    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(this::toItemDTO)
                .collect(Collectors.toList());
    }

    public ItemDTO getItemById(UUID id) {
        return itemRepository.findById(id)
                .map(this::toItemDTO)
                .orElseThrow(() -> new ItemNotFoundException());
    }

    public void deleteItem(UUID id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException());
        itemRepository.delete(item);
    }

    public ItemDTO updateItem(UUID id, NewItemDTO newItemDTO) throws IOException {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException());

        if (newItemDTO.title() != null) {
            item.setTitle(newItemDTO.title());
        }
        if (newItemDTO.description() != null) {
            item.setDescription(newItemDTO.description());
        }
        if (newItemDTO.category() != null) {
            item.setCategory(newItemDTO.category());
        }
        if (newItemDTO.price() != null) {
            item.setPrice(newItemDTO.price());
        }
        if (newItemDTO.file() != null && !newItemDTO.file().isEmpty()) {
            item.setDisplayPicture(getImageBytes(newItemDTO.file()));
        }
        
        return toItemDTO(itemRepository.save(item)); 
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ImageUploadException();
        }
    }
    
    private byte[] getImageBytes(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new ImageUploadException();
        }
    }

    private ItemDTO toItemDTO(Item item) {
        return new ItemDTO(item.getId(), item.getTitle(), item.getDescription(), item.getCategory(),item.getPrice() , item.getDisplayPicture());
    }
}
