import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    Grid,
    Autocomplete,
    Box,
    Typography
} from '@mui/material';
import { Add, Person } from '@mui/icons-material';
import { COUNTRIES } from '../utils/constants';
import { 
    dialogPaperProps, 
    gradientHeaderStyles,
    fieldLabelStyles
} from '../utils/styles';

const AddContactDialog = ({ 
    open, 
    onClose, 
    newContact, 
    onContactChange, 
    onAddContact, 
    formErrors 
}) => {
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
                    <Add sx={{ fontSize: 28 }} />
                    <Typography variant="h6">Add New Contact</Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 2 }}>
                <DialogContentText sx={{ pt: 2, mb: 4, color: 'text.secondary' }}>
                    Please fill in the details for the new contact. Required fields are marked with an asterisk (*).
                </DialogContentText>
                
                <form>
                    <Grid container spacing={3}>
                        {/* First Name */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="caption" sx={fieldLabelStyles}>
                                    FIRST NAME *
                                </Typography>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newContact.firstName}
                                    onChange={onContactChange}
                                    required
                                    error={!!formErrors.firstName}
                                    helperText={formErrors.firstName || ''}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="caption" sx={fieldLabelStyles}>
                                    LAST NAME
                                </Typography>
                                <TextField
                                    margin="dense"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newContact.lastName}
                                    onChange={onContactChange}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="caption" sx={fieldLabelStyles}>
                                    EMAIL ADDRESS *
                                </Typography>
                                <TextField
                                    margin="dense"
                                    name="email"
                                    placeholder="Enter email address"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    value={newContact.email}
                                    onChange={onContactChange}
                                    required
                                    error={!!formErrors.email}
                                    helperText={formErrors.email || ''}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        </Grid>

                        {/* Phone Number */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="caption" sx={fieldLabelStyles}>
                                    PHONE NUMBER
                                </Typography>
                                <TextField
                                    margin="dense"
                                    name="phoneNumber"
                                    placeholder="Enter phone number"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newContact.phoneNumber}
                                    onChange={onContactChange}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        </Grid>

                        {/* Role */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="caption" sx={fieldLabelStyles}>
                                    ROLE
                                </Typography>
                                <TextField
                                    margin="dense"
                                    name="role"
                                    placeholder="Enter job role"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newContact.role}
                                    onChange={onContactChange}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        </Grid>

                        {/* Country - Autocomplete */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="caption" sx={fieldLabelStyles}>
                                    COUNTRY
                                </Typography>
                                <Autocomplete
                                    options={COUNTRIES}
                                    value={newContact.country}
                                    onChange={(event, newValue) => {
                                        onContactChange({
                                            target: { name: 'country', value: newValue || '' }
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="dense"
                                            placeholder="Select or type country"
                                            variant="outlined"
                                            error={!!formErrors.country}
                                            helperText={formErrors.country || ''}
                                            sx={{ mt: 1 }}
                                        />
                                    )}
                                    freeSolo
                                    autoHighlight
                                    filterOptions={(options, { inputValue }) => {
                                        const filtered = options.filter((option) =>
                                            option.toLowerCase().includes(inputValue.toLowerCase())
                                        );
                                        return filtered;
                                    }}
                                    sx={{
                                        '& .MuiAutocomplete-input': {
                                            padding: '16.5px 14px',
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                    onClick={onClose} 
                    variant="outlined"
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onAddContact} 
                    variant="contained"
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Add Contact
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContactDialog; 