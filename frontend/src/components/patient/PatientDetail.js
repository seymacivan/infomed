import React from 'react';
import {
    Modal,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    CardMedia,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import patientImage from '../../static/image/Patient.png';

function PatientDetail({ open, handleCloseModal, patient }) {
    return (
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
                        {patient && `${patient.name} ${patient.surname}`}
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Age:</strong></TableCell>
                                    <TableCell>{patient && patient.age}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>TC No:</strong></TableCell>
                                    <TableCell>{patient && patient.tc}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Address:</strong></TableCell>
                                    <TableCell>{patient && patient.address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Complaint:</strong></TableCell>
                                    <TableCell>{patient && patient.complaint}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Hospital:</strong></TableCell>
                                    <TableCell>{patient && patient.hospital.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Gender:</strong></TableCell>
                                    <TableCell>{patient && patient.gender}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleCloseModal} color="primary" size="small">Close</Button>
                </CardActions>
            </Card>
        </Modal>
    );
}

export default PatientDetail;
