package com.example.infomed.dto;

import com.example.infomed.model.Hospital;
import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PatientDto extends DateAudit {
    private Long id;
    private String name;
    private String surname;
    private Integer age;
    private String tc;
    private String address;
    private String complaint;
    private Hospital hospital;
    private Gender gender;
}