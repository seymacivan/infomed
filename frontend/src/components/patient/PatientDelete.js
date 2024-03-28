import React, { useState } from 'react';
import {
    Modal,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    CardMedia,
    Snackbar,
} from '@mui/material';
import patientImage from '../../static/image/Patient.png';

function PatientDelete({ open, handleCloseModal, patientName, patientID, handleDelete }) {
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const handleDeletePatient = () => {
        handleDelete(patientID);
        setDeleteSuccess(true);
        handleCloseModal();
    };

    const handleSnackbarClose = () => {
        setDeleteSuccess(false);
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
                        image={patientImage}
                        alt="patient"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Delete Patient
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Are you sure you want to delete <strong>{patientName}</strong> patient?
                        </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal} size="small">Cancel</Button>
                        <Button onClick={handleDeletePatient} color="error" size="small">Delete</Button>
                    </CardActions>
                </Card>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={deleteSuccess}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Patient successfully deleted"
                action={
                    <Button color="inherit" size="small" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
            />
        </div>
    );
}

export default PatientDelete;
