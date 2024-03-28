import React, { useEffect, useState } from 'react';
import {
    Modal,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    TextField,
    Grid,
    CardMedia,
    MenuItem,
    Snackbar
} from '@mui/material';
import hospitalImage from "../../static/image/Hospital.png";

const hospitalTypes = [
    { value: 'DENTAL_HOSPITAL', label: 'Dental Hospital' },
    { value: 'EYE_HOSPITAL', label: 'Eye Hospital' },
    { value: 'GENERAL_HOSPITAL', label: 'General Hospital' },
    { value: 'OTHERS', label: 'Others' }
];

function HospitalUpdate({ open, handleCloseModal, hospital }) {
    const [updatedHospitalInfo, setUpdatedHospitalInfo] = useState({
        name: '',
        address: '',
        hospitalType: '',
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSubmitWarning, setShowSubmitWarning] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (hospital) {
            setUpdatedHospitalInfo({
                name: hospital.name,
                address: hospital.address,
                hospitalType: hospital.hospitalType,
            });
        }
    }, [hospital]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedHospitalInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        if (!updatedHospitalInfo.name || !updatedHospitalInfo.address || !updatedHospitalInfo.hospitalType) {
            setShowSubmitWarning(true);
            return;
        }

        fetch('http://localhost:8080/hospitals', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedHospitalInfo),
        })
            .then(response => {
                if (response.ok) {
                    setShowSuccessMessage(true);
                    handleCloseModal();
                } else {
                    setShowError(true);
                    console.error('An error occurred while updating the hospital.');
                }
            })
            .catch(error => {
                setShowError(true);
                console.error('An error occurred while updating the hospital.:', error);
            });
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
        setShowError(false);
    };

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
                        image={hospitalImage}
                        alt="hospital"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Update Hospital Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Hospital Name"
                                    variant="outlined"
                                    value={updatedHospitalInfo.name}
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
                                    value={updatedHospitalInfo.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    id="hospitalType"
                                    name="hospitalType"
                                    label="Hospital Type"
                                    variant="outlined"
                                    value={updatedHospitalInfo.hospitalType}
                                    onChange={handleChange}
                                >
                                    {hospitalTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal} size="small">Cancel</Button>
                        <Button onClick={handleUpdate} color="primary" size="small">Update</Button>
                    </CardActions>
                </Card>
            </Modal>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Hospital successfully updated."
            />
            <Snackbar
                open={showSubmitWarning}
                autoHideDuration={6000}
                onClose={() => setShowSubmitWarning(false)}
                message="Please fill all fields."
            />
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="An error occurred while updating the hospital."
            />
        </div>
    );
}

export default HospitalUpdate;
