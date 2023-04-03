package com.example.shortletBackend.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class VerifyTransactionResponse {

    private String status;
    private String message;
    private VerifyTransactionData data;
}
