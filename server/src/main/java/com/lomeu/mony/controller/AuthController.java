package com.lomeu.mony.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lomeu.mony.dto.AuthRequestDTO;
import com.lomeu.mony.dto.AuthResponseDTO;
import com.lomeu.mony.model.MonyUser;
import com.lomeu.mony.repository.MonyUserRepository;
import com.lomeu.mony.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final MonyUserRepository monyUserRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        MonyUser user = monyUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(request.getEmail());

        return ResponseEntity.ok(new AuthResponseDTO(user.getId(), user.getName(), user.getEmail(), token));
    }
}
