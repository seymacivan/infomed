package com.example.infomed.model;

import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.HospitalType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "hospitals", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "name",
        })
})
public class Hospital extends DateAudit {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private HospitalType hospitalType;
}
