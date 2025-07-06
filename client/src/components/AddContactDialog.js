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
    Autocomplete
} from '@mui/material';

// Comprehensive list of countries for the dropdown
const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
].sort();

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
        >
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill in the details for the new contact.
                </DialogContentText>
                <form>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {/* First Name */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="firstName"
                                label="First Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newContact.firstName}
                                onChange={onContactChange}
                                required
                                error={!!formErrors.firstName}
                                helperText={formErrors.firstName || ''}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        '& .MuiInputLabel-asterisk': {
                                            color: 'error.main',
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="lastName"
                                label="Last Name (optional)"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newContact.lastName}
                                onChange={onContactChange}
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={newContact.email}
                                onChange={onContactChange}
                                required
                                error={!!formErrors.email}
                                helperText={formErrors.email || ''}
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        '& .MuiInputLabel-asterisk': {
                                            color: 'error.main',
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        {/* Phone Number */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="phoneNumber"
                                label="Phone Number (optional)"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newContact.phoneNumber}
                                onChange={onContactChange}
                            />
                        </Grid>

                        {/* Role */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="role"
                                label="Role (optional)"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newContact.role}
                                onChange={onContactChange}
                            />
                        </Grid>

                        {/* Country - Autocomplete */}
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={countries}
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
                                        label="Country (optional)"
                                        variant="outlined"
                                        error={!!formErrors.country}
                                        helperText={formErrors.country || ''}
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
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="warning">
                    Cancel
                </Button>
                <Button onClick={onAddContact} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContactDialog; 