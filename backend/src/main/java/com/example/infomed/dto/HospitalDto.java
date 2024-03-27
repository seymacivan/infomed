package com.example.infomed.dto;


import com.example.infomed.model.audit.DateAudit;
import com.example.infomed.model.constants.HospitalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HospitalDto extends DateAudit {
    private Long id;
    private String name;
    private String address;
    private HospitalType hospitalType;
}