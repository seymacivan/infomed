package com.example.infomed;

import com.example.infomed.model.Hospital;
import com.example.infomed.model.Patient;
import com.example.infomed.model.constants.Gender;
import com.example.infomed.model.constants.HospitalType;
import com.example.infomed.repository.HospitalRepository;
import com.example.infomed.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public void run(String... args) throws Exception {
        if (hospitalRepository.findAll().isEmpty()) {
            Hospital hospital1 = new Hospital();
            hospital1.setName("Etlik Şehir Hastanesi");
            hospital1.setAddress("Etlik Ankara");
            hospital1.setHospitalType(HospitalType.GENERAL_HOSPITAL);
            hospitalRepository.save(hospital1);

            Hospital hospital2 = new Hospital();
            hospital2.setName("Ulucanlar Göz Hastanesi");
            hospital2.setAddress("Ulus Ankara");
            hospital2.setHospitalType(HospitalType.EYE_HOSPITAL);
            hospitalRepository.save(hospital2);

            Patient patient1 = new Patient();
            patient1.setName("Seyma");
            patient1.setSurname("Civan");
            patient1.setAge(25);
            patient1.setTc("12345678901");
            patient1.setAddress("Yenimahalle Ankara");
            patient1.setComplaint("Baş ağrısı, bulantı kusma");
            patient1.setHospital(hospital1);
            patient1.setGender(Gender.FEMALE);
            patientRepository.save(patient1);

            Patient patient2 = new Patient();
            patient2.setName("Beyza");
            patient2.setSurname("Ozdemir");
            patient2.setAge(25);
            patient2.setTc("09876543210");
            patient2.setAddress("Çankaya Ankara");
            patient2.setComplaint("Vertigo Nöbeti");
            patient2.setHospital(hospital2);
            patient2.setGender(Gender.FEMALE);
            patientRepository.save(patient2);
        }
    }
}