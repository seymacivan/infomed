package com.example.infomed.repository;

import com.example.infomed.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByNameAndSurnameAndTc(String name, String surname, String tc);
}
