package com.lomeu.mony.repository;

import com.lomeu.mony.model.MonyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonyUserRepository extends JpaRepository<MonyUser, Long> {
}
