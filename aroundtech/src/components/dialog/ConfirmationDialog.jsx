import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const ConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Confirmation",
    message = "Êtes-vous sûr de vouloir procéder à cette action ?",
    confirmButtonText = "Valider",
    cancelButtonText = "Annuler"
}) => {
    return (
        <Dialog className="dialog-container" open={open} onClose={onClose}>
            <DialogTitle className="dialog-title">{title}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText className="dialog-message">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="dialog-buttons">
                <Button className="confirm-button" onClick={onConfirm} color="primary">
                    {confirmButtonText}
                </Button>
                <Button className="cancel-button" onClick={onClose} color="primary">
                    {cancelButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ConfirmationDialog;
