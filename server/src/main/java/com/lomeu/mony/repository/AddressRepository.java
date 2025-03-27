package com.lomeu.mony.repository;

import com.lomeu.mony.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
