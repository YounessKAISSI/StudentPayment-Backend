package org.enset.app.ensetdemospringangular;

import org.enset.app.ensetdemospringangular.entities.Payment;
import org.enset.app.ensetdemospringangular.entities.PaymentStatus;
import org.enset.app.ensetdemospringangular.entities.PaymentType;
import org.enset.app.ensetdemospringangular.entities.Student;
import org.enset.app.ensetdemospringangular.repository.PaymentRepository;
import org.enset.app.ensetdemospringangular.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class EnsetDemoSpringAngularApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnsetDemoSpringAngularApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository,
                                        PaymentRepository paymentRepository){
      return args -> {
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Youness").code("112233").programId("II-BDCC")
                    .build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                  .firstName("YASSINE").code("223344").programId("SDIA")
                  .build());
          studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                  .firstName("MOHAMMED").code("334455").programId("GLSID")
                  .build());
          studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                  .firstName("IMANE").code("445566").programId("BDCC")
                  .build());

          PaymentType[] paymentTypes =PaymentType.values();
          Random random = new Random();

          studentRepository.findAll().forEach(st->{
              for (int i = 0; i < 10; i++) {
                  int index = random.nextInt(paymentTypes.length);
                  Payment payment = Payment.builder()
                          .amount(1000+(int)(Math.random()+20000))
                          .type(paymentTypes[index])
                          .status(PaymentStatus.CREATED)
                          .date(LocalDate.now())
                          .student(st)
                          .build();
                  paymentRepository.save(payment);
              }
          });
      };
    }
}
