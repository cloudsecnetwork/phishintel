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

const ContactDetailsDialog = ({ open, onClose, contact }) => {
    if (!contact) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
            }}
        >
            <DialogTitle sx={{ 
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                color: 'white',
                borderRadius: '12px 12px 0 0'
            }}>
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
                        <Box sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}>
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
                            <Card sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'grey.200'
                            }}>
                                <Typography variant="h6" gutterBottom sx={{ 
                                    color: 'primary.main',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <Person fontSize="small" />
                                    Basic Information
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            EMAIL ADDRESS
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                                            {contact.email || 'Not provided'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            PHONE NUMBER
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                                            {contact.phoneNumber || 'Not provided'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            ROLE
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                                            {contact.role || 'Not specified'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                            COUNTRY
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                                            {contact.country || 'Not specified'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        {/* Metadata Card */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'grey.200',
                                height: 'fit-content'
                            }}>
                                <Typography variant="h6" gutterBottom sx={{ 
                                    color: 'primary.main',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <Group fontSize="small" />
                                    Additional Information
                                </Typography>
                                {contact.metadata && Object.keys(contact.metadata).length > 0 ? (
                                    <Box sx={{ mt: 2 }}>
                                        {Object.entries(contact.metadata).map(([key, value]) => (
                                            <Box key={key} sx={{ mb: 2 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                    {key.toUpperCase().replace(/_/g, ' ')}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 0.5 }}>
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
                            <Card sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'grey.200'
                            }}>
                                <Typography variant="h6" gutterBottom sx={{ 
                                    color: 'primary.main',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <Add fontSize="small" />
                                    Record Information
                                </Typography>
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                CREATED
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 0.5 }}>
                                                {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : 'Unknown'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                                LAST UPDATED
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 0.5 }}>
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