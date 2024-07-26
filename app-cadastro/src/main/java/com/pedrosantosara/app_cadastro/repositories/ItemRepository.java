package com.pedrosantosara.app_cadastro.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantosara.app_cadastro.entity.Item;

public interface ItemRepository extends JpaRepository<Item, UUID> {

}
