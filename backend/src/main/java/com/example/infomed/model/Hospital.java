package com.example.infomed.model;

import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.HospitalType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Name may not be null.")
    private String name;
    @NotNull(message = "Address may not be null.")
    private String address;
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Hospital type may not be null.")
    private HospitalType hospitalType;
}
