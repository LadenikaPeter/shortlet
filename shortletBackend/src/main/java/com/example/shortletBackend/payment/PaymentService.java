package com.example.shortletBackend.payment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class PaymentService {
    @Value("${paystack.secret_key}")
    private String secretKey;
    private static final String initializePaymentUrl= "https://api.paystack.co/transaction/initialize";
    private static final String verifyPaymentUrl="https://api.paystack.co/transaction/verify/:reference";

    ObjectMapper mapper = new ObjectMapper();
    @Autowired
    private RestTemplate restTemplate;

    public PaymentResponse initializeTransactions(PaymentRequest paymentRequest)  {

        PaymentResponse paymentResponse = null;
        try {


            Gson gson = new Gson();
            StringEntity request = new StringEntity(gson.toJson(paymentRequest));


            HttpHeaders headers=new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization",secretKey);

            CloseableHttpClient client = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(initializePaymentUrl);
            post.setEntity(request);
            post.addHeader("Content-type", "application/json");
            post.addHeader("Authorization","Bearer "+ secretKey);
            HttpResponse response = client.execute(post);
            StringBuilder result = new StringBuilder();
            if (response.getStatusLine().getStatusCode() == HttpStatus.OK.value()) {
                BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

                String line;
                while ((line = rd.readLine()) != null) {
                    result.append(line);
                }

            } else {
                throw new Exception("Error Occurred while initializing transaction");
            }


            System.out.println(result.toString());
            paymentResponse = mapper.readValue(result.toString(), PaymentResponse.class);

        }catch (Exception exception){
            exception.printStackTrace();

        }
        return paymentResponse;

    }

    public VerifyTransactionResponse verifyTransaction(String reference) throws Exception {
        VerifyTransactionResponse paystackresponse = null;
        try {
            HttpClient client = HttpClientBuilder.create().build();
            HttpGet request = new HttpGet("https://api.paystack.co/transaction/verify/" + reference);
            request.addHeader("Content-type", "application/json");
            request.addHeader("Authorization", "Bearer " + secretKey);
            StringBuilder result = new StringBuilder();
            HttpResponse response = client.execute(request);
            if (response.getStatusLine().getStatusCode() == HttpStatus.CREATED.value()) {
                BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

                String line;
                while ((line = rd.readLine()) != null) {
                    result.append(line);
                }

            } else {
                throw new Exception("Error Occured while connecting to paystack url");
            }
            ObjectMapper mapper = new ObjectMapper();

            paystackresponse = mapper.readValue(result.toString(), VerifyTransactionResponse.class);

            if (paystackresponse == null || paystackresponse.getStatus().equals("false")) {
                throw new Exception("An error occurred while  verifying payment");
            } else if (paystackresponse.getData().getStatus().equals("success")) {
                //PAYMENT IS SUCCESSFUL, APPLY VALUE TO THE TRANSACTION
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new Exception("Internal server error");
        }
        return paystackresponse;
    }

}
