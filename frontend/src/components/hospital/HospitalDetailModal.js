import React from 'react';
import {
  Modal,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  CardMedia, TableContainer, Table, TableBody, TableRow, TableCell
} from '@mui/material';
import hospitalImage from '../../static/image/Hospital.png';

function HospitalDetailModal({ open, handleCloseModal, hospital }) {
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
              image={hospitalImage}
              alt="hospital"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {hospital && hospital.name}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Address:</strong></TableCell>
                    <TableCell>{hospital && hospital.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Hospital Type:</strong></TableCell>
                    <TableCell>{hospital && hospital.hospitalType}</TableCell>
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

export default HospitalDetailModal;