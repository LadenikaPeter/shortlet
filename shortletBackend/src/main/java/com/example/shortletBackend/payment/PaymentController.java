package com.example.shortletBackend.payment;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@AllArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/pay")
    public ResponseEntity payReservation(PaymentRequest paymentRequest){
        return ResponseEntity.ok(paymentService.initializeTransactions(paymentRequest));
    }


}
