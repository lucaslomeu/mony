package com.lomeu.mony.repository;

import com.lomeu.mony.model.MonyUser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MonyUserRepository extends JpaRepository<MonyUser, Long> {
    Optional<MonyUser> findByEmail(String email);
}
