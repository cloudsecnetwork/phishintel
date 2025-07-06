import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography,
    Alert
} from '@mui/material';
import { Delete, Warning } from '@mui/icons-material';
import { 
    dialogPaperProps, 
    gradientHeaderStyles
} from '../utils/styles';

const DeleteAudienceDialog = ({ 
    open, 
    onClose, 
    onConfirm, 
    audienceName, 
    contactCount,
    loading 
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={dialogPaperProps}
        >
            <DialogTitle sx={gradientHeaderStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Delete sx={{ fontSize: 28 }} />
                    <Typography variant="h6">Delete Audience</Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 2 }}>
                <DialogContentText sx={{ pt:2, mb: 4, color: 'text.secondary' }}>
                    Are you sure you want to delete this audience? This action cannot be undone.
                </DialogContentText>
                
                <Alert 
                    severity="warning" 
                    icon={<Warning />}
                    sx={{ borderRadius: 2 }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        This action will permanently delete:
                    </Typography>
                    <Typography variant="body2">
                        • The audience "{audienceName}"<br/>
                        • All {contactCount} contacts in this audience<br/>
                        • All associated metadata
                    </Typography>
                </Alert>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                    onClick={onClose} 
                    variant="outlined"
                    disabled={loading}
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onConfirm} 
                    variant="contained"
                    color="error"
                    disabled={loading}
                    startIcon={<Delete />}
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    {loading ? 'Deleting...' : 'Delete Audience'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAudienceDialog; 