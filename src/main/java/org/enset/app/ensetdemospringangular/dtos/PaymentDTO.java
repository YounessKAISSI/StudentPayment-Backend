package org.enset.app.ensetdemospringangular.dtos;

import lombok.*;
import org.enset.app.ensetdemospringangular.entities.PaymentStatus;
import org.enset.app.ensetdemospringangular.entities.PaymentType;
import org.enset.app.ensetdemospringangular.entities.Student;

import java.time.LocalDate;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class PaymentDTO {
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private PaymentStatus status;
}
