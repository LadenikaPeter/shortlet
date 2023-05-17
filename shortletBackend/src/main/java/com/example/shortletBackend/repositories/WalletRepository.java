package com.example.shortletBackend.repositories;

import com.example.shortletBackend.entities.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet,Long> {
}
