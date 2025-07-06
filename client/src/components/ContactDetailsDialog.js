import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid,
    Card
} from '@mui/material';
import { Person, Group, Add } from '@mui/icons-material';
import { 
    dialogPaperProps, 
    gradientHeaderStyles, 
    contactAvatarStyles,
    cardStyles,
    sectionHeaderStyles,
    fieldLabelStyles,
    fieldValueStyles
} from '../utils/styles';

const ContactDetailsDialog = ({ open, onClose, contact }) => {
    if (!contact) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={dialogPaperProps}
        >
            <DialogTitle sx={gradientHeaderStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Person sx={{ fontSize: 28 }} />
                    <Typography variant="h6">Contact Details</Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                <Box>
                    {/* Contact Avatar and Name */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        mb: 3,
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 2
                    }}>
                        <Box sx={contactAvatarStyles}>
                            {`${contact.firstName?.charAt(0) || ''}${contact.lastName?.charAt(0) || ''}`.toUpperCase()}
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {`${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unnamed Contact'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {contact.email || 'No email provided'}
                            </Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        {/* Basic Information Card */}
                        <Grid item xs={12} md={6}>
                            <Card sx={cardStyles}>
                                <Typography variant="h6" gutterBottom sx={sectionHeaderStyles}>
                                    <Person fontSize="small" />
                                    Basic Information
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={fieldLabelStyles}>
                                            EMAIL ADDRESS
                                        </Typography>
                                        <Typography variant="body1" sx={fieldValueStyles}>
                                            {contact.email || 'Not provided'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={fieldLabelStyles}>
                                            PHONE NUMBER
                                        </Typography>
                                        <Typography variant="body1" sx={fieldValueStyles}>
                                            {contact.phoneNumber || 'Not provided'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={fieldLabelStyles}>
                                            ROLE
                                        </Typography>
                                        <Typography variant="body1" sx={fieldValueStyles}>
                                            {contact.role || 'Not specified'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={fieldLabelStyles}>
                                            COUNTRY
                                        </Typography>
                                        <Typography variant="body1" sx={fieldValueStyles}>
                                            {contact.country || 'Not specified'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        {/* Metadata Card */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ ...cardStyles, height: 'fit-content' }}>
                                <Typography variant="h6" gutterBottom sx={sectionHeaderStyles}>
                                    <Group fontSize="small" />
                                    Additional Information
                                </Typography>
                                {contact.metadata && Object.keys(contact.metadata).length > 0 ? (
                                    <Box sx={{ mt: 2 }}>
                                        {Object.entries(contact.metadata).map(([key, value]) => (
                                            <Box key={key} sx={{ mb: 2 }}>
                                                <Typography variant="caption" sx={fieldLabelStyles}>
                                                    {key.toUpperCase().replace(/_/g, ' ')}
                                                </Typography>
                                                <Typography variant="body1" sx={fieldValueStyles}>
                                                    {value || 'Not provided'}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                                        No additional information available
                                    </Typography>
                                )}
                            </Card>
                        </Grid>

                        {/* Timestamps Card */}
                        <Grid item xs={12}>
                            <Card sx={cardStyles}>
                                <Typography variant="h6" gutterBottom sx={sectionHeaderStyles}>
                                    <Add fontSize="small" />
                                    Record Information
                                </Typography>
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" sx={fieldLabelStyles}>
                                                CREATED
                                            </Typography>
                                            <Typography variant="body1" sx={fieldValueStyles}>
                                                {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : 'Unknown'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" sx={fieldLabelStyles}>
                                                LAST UPDATED
                                            </Typography>
                                            <Typography variant="body1" sx={fieldValueStyles}>
                                                {contact.updatedAt ? new Date(contact.updatedAt).toLocaleString() : 'Unknown'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                    onClick={onClose} 
                    variant="contained"
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContactDetailsDialog; 