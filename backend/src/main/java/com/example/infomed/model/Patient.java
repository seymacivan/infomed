package com.example.infomed.model;

import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "patients", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "tc"
        })
})
public class Patient extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull(message = "Name may not be null.")
    private String name;
    @NotNull(message = "Surname may not be null.")
    private String surname;
    @NotNull(message = "Age may not be null.")
    private Integer age;
    @Column(length = 11)
    @NotNull(message = "TC no may not be null.")
    private String tc;
    @NotNull(message = "Address may not be null.")
    private String address;
    @NotNull(message = "Complaint may not be null.")
    private String complaint;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_id", nullable = false)
    @NotNull(message = "Hospital may not be null.")
    private Hospital hospital;
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Gender may not be null.")
    private Gender gender;
}
