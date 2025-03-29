package com.lomeu.mony.controller;

import com.lomeu.mony.dto.AddressDTO;
import com.lomeu.mony.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressDTO> save(@RequestBody AddressDTO addressDTO) {
        AddressDTO savedAddress = addressService.save(addressDTO);
        return ResponseEntity.ok(savedAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDTO> update(@PathVariable Long id, @RequestBody AddressDTO addressDTO) {
        addressService.update(id, addressDTO);
        return ResponseEntity.ok(addressDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<AddressDTO> getAddressByUserId(@PathVariable Long userId) {
        AddressDTO address = addressService.findByUserId(userId);
        return ResponseEntity.ok(address);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        addressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
