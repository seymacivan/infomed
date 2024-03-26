package com.example.infomed.model;

import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.Gender;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "patients")
public class Patient extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private Integer age;
    private String tc;
    private String address;
    private String complaint;
    @ManyToOne(cascade = CascadeType.ALL)
    private Hospital hospital;
    @Enumerated(EnumType.STRING)
    private Gender gender;
}
