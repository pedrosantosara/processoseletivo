package com.pedrosantosara.app_cadastro.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantosara.app_cadastro.entity.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
}
