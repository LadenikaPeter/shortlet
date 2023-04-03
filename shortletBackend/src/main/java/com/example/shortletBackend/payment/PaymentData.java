package com.example.shortletBackend.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor
@NoArgsConstructor
public class PaymentData {
    private String authorization_url;
    private String access_code;
    private String reference;
}
