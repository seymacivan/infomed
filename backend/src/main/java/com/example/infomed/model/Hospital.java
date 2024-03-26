package com.example.infomed.model;

import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.HospitalType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "hospitals")
public class Hospital extends DateAudit {

    @Id
    private Long id;
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private HospitalType hospitalType;
}
