package com.lomeu.mony.controller;

import com.lomeu.mony.dto.MonyUserDTO;
import com.lomeu.mony.service.MonyUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class MonyUserController {

    private final MonyUserService monyUserService;

    @PostMapping("/register")
    public ResponseEntity<MonyUserDTO> save(@RequestBody MonyUserDTO userDTO) {
        MonyUserDTO savedUser = monyUserService.save(userDTO);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MonyUserDTO> update(@PathVariable Long id, @RequestBody MonyUserDTO userDTO) {
        monyUserService.update(id, userDTO);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonyUserDTO> getUserById(@PathVariable Long id) {
        MonyUserDTO user = monyUserService.findById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        monyUserService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
