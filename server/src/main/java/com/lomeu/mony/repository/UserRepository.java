package com.lomeu.mony.repository;

import com.lomeu.mony.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
