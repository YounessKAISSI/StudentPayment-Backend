package org.enset.app.ensetdemospringangular.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.enset.app.ensetdemospringangular.entities.PaymentType;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class NewPaymentDTO {

    private String studentCode;
    private double amount;
    private PaymentType type;
    private LocalDate date;

}
