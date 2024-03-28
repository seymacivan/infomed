import React, { useState, useEffect } from 'react';
import {
    Modal,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    TextField,
    Grid,
    MenuItem,
    Snackbar,
    CardMedia
} from '@mui/material';
import axios from 'axios';
import patientImage from "../../static/image/Patient.png";

function PatientUpdate({ open, handleCloseModal, patient }) {
    const [updatedPatientInfo, setUpdatedPatientInfo] = useState({
        name: '',
        surname: '',
        age: '',
        tc: '',
        address: '',
        complaint: '',
        hospital: '',
        gender: '',
    });

    const [hospitals, setHospitals] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (patient) {
            setUpdatedPatientInfo({
                name: patient.name,
                surname: patient.surname,
                age: patient.age,
                tc: patient.tc,
                address: patient.address,
                complaint: patient.complaint,
                hospital: patient.hospital.id,
                gender: patient.gender,
            });
        }
        fetchHospitals();
    }, [patient]);

    const fetchHospitals = () => {
        axios.get('http://localhost:8080/hospitals/list')
            .then(response => {
                setHospitals(response.data);
            })
            .catch(error => {
                console.error('An error occurred while fetching hospitals:', error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedPatientInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdatePatient = () => {
        if (!validateForm()) {
            console.log("-------------")
            setShowError(true);
            return;
        }
        const hospitalInfo = {
            id: updatedPatientInfo.hospital
        };

        const updatedPatient = {
            ...updatedPatientInfo,
            hospital: hospitalInfo
        };

        axios.put(`http://localhost:8080/patients`, updatedPatient)
            .then(response => {
                setShowSuccessMessage(true);
                handleCloseModal();
            })
            .catch(error => {
                setShowError(true);
                console.error('An error occurred while updating the patient:', error);
            });
    };

    const validateForm = () => {
        return (
            updatedPatientInfo.name &&
            updatedPatientInfo.surname &&
            updatedPatientInfo.age &&
            updatedPatientInfo.tc &&
            updatedPatientInfo.tc.length === 11 &&
            updatedPatientInfo.address &&
            updatedPatientInfo.complaint &&
            updatedPatientInfo.hospital &&
            updatedPatientInfo.gender
        );
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
        setShowError(false);
    };

    if (!patient) {
        return null;
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <CardMedia
                        component="img"
                        height="160"
                        image={patientImage}
                        alt="hospital"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Update Patient
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    value={updatedPatientInfo.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="surname"
                                    name="surname"
                                    label="Surname"
                                    variant="outlined"
                                    value={updatedPatientInfo.surname}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="age"
                                    name="age"
                                    label="Age"
                                    type="number"
                                    variant="outlined"
                                    value={updatedPatientInfo.age}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="tc"
                                    name="tc"
                                    label="TC No"
                                    variant="outlined"
                                    value={updatedPatientInfo.tc}
                                    onChange={handleChange}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    value={updatedPatientInfo.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="complaint"
                                    name="complaint"
                                    label="Complaint"
                                    variant="outlined"
                                    value={updatedPatientInfo.complaint}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    id="hospital"
                                    name="hospital"
                                    label="Hospital"
                                    variant="outlined"
                                    value={updatedPatientInfo.hospital}
                                    onChange={handleChange}
                                >
                                    {hospitals.map((hospital) => (
                                        <MenuItem key={hospital.id} value={hospital.id}>
                                            {hospital.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    id="gender"
                                    name="gender"
                                    label="Gender"
                                    variant="outlined"
                                    value={updatedPatientInfo.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="MALE">Male</MenuItem>
                                    <MenuItem value="FEMALE">Female</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal} size="small">Cancel</Button>
                        <Button onClick={handleUpdatePatient} color="primary" size="small">Update</Button>
                    </CardActions>
                </Card>
            </Modal>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Patient successfully updated."
            />
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Please fill all fields correctly."
            />
        </div>
    );
}

export default PatientUpdate;
