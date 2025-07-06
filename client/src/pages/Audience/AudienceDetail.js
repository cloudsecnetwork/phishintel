// client\src\pages\Audience\AudienceDetail.js
import React, { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    Divider,
    TextField,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Chip,
    Alert,
    DialogContentText,
    Snackbar
} from '@mui/material';
import { Group, Person, Add, UploadFile as UploadFileIcon } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAudience } from '../../hooks/useAudience';

const AudienceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { audienceDetail, fetchAudienceDetail, deleteAudience, addContact, deleteContact, uploadCSVToAudience, loading, error } = useAudience();
    const [contacts, setContacts] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newContact, setNewContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        department: '',
        company: '',
        country: ''
    });

    // Error handling state
    const [errorSnackbar, setErrorSnackbar] = useState({ open: false, message: '' });
    const [formErrors, setFormErrors] = useState({});

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    // State for CSV upload dialog
    const [openCSVDialog, setOpenCSVDialog] = useState(false);
    const [csvFile, setCsvFile] = useState(null);
    const [csvUploadResult, setCsvUploadResult] = useState(null);

    // Handler for CSV file selection
    const handleCSVFileChange = (file) => {
        setCsvFile(file);
        setCsvUploadResult(null); // Clear previous results
    };

    // Handler for CSV upload
    const handleCSVUpload = async () => {
        if (!csvFile) {
            setErrorSnackbar({ 
                open: true, 
                message: 'Please select a CSV file to upload' 
            });
            return;
        }

        const response = await uploadCSVToAudience(id, csvFile);
        if (response.success) {
            setCsvUploadResult(response.data);
            setCsvFile(null);
            
            // Refresh the audience details to get updated contact list
            const updatedResponse = await fetchAudienceDetail(id);
            if (updatedResponse?.data?.contacts) {
                setContacts(updatedResponse.data.contacts);
            }
            // Don't close dialog yet, show results
        } else {
            setErrorSnackbar({ 
                open: true, 
                message: response.message || 'Failed to upload CSV file' 
            });
        }
    };

    // Handler for closing CSV dialog
    const handleCloseCSVDialog = () => {
        setOpenCSVDialog(false);
        setCsvFile(null);
        setCsvUploadResult(null);
    };

    useEffect(() => {
        if (id && !hasFetched) {
            fetchAudienceDetail(id).then(response => {
                if (response?.data?.contacts) {
                    setContacts(response.data.contacts); // Set contacts from API response
                }
            });
            setHasFetched(true);
        }
    }, [id, hasFetched, fetchAudienceDetail]);

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Form validation function
    const validateForm = () => {
        const errors = {};
        
        if (!newContact.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        
        if (!newContact.email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(newContact.email)) {
            errors.email = 'Please enter a valid email address';
        } else {
            // Check if email already exists in current audience
            const emailExists = contacts.some(contact => 
                contact.email.toLowerCase() === newContact.email.toLowerCase()
            );
            
            if (emailExists) {
                errors.email = 'A contact with this email already exists in this audience';
            }
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddContactChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    const handleAddContact = async () => {
        // Frontend validation
        if (!validateForm()) {
            return;
        }

        const response = await addContact(id, newContact);
        if (response.success) {
            setContacts((prevContacts) => [...prevContacts, response.data]); // Update local contacts
            setOpenAddDialog(false); // Close dialog
            setNewContact({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                role: '',
                department: '',
                company: '',
                country: ''
            });
            setFormErrors({}); // Clear form errors
        } else {
            // Show error in snackbar
            setErrorSnackbar({ 
                open: true, 
                message: response.message || 'Failed to add contact' 
            });
        }
    };

    const handleCloseErrorSnackbar = () => {
        setErrorSnackbar({ open: false, message: '' });
    };

    const handleDeleteAudience = async () => {
        const response = await deleteAudience(id);
        if (response.success) {
            setOpenDeleteDialog(false); // Close dialog after successful deletion
            navigate('/console/audience'); // Redirect to audience list
        }
    };

    const handleDeleteContact = async (contactId) => {
        const response = await deleteContact(id, contactId); // Call deleteContact with audienceId and contactId
        if (response.success) {
            setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId)); // Update local contacts state
        } else {
            console.error('Failed to delete contact:', response.message);
            alert(`Error: ${response.message}`); // Show error message to user
        }
    };

    const columns = [
        { field: 'firstName', headerName: 'First Name', flex: 0.25 },
        { field: 'lastName', headerName: 'Last Name', flex: 0.25 },
        { field: 'email', headerName: 'Email Address', flex: 0.3 },
        { field: 'role', headerName: 'Role', flex: 0.2 },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 0.1,
            sortable: false,
            renderCell: (params) => (
                <IconButton color="error" onClick={() => handleDeleteContact(params.row._id)}>
                    <HighlightOffIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#f0f4f7" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '96px', mb: 2 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={8} sx={{ pl: 2, pb: 2 }}>
                            <Typography 
                                sx={{ 
                                    mb: 1, 
                                    fontWeight: 500,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '1.2rem', md: '1.8rem' }
                                }} 
                                variant="h4" 
                                color="primary"
                            >
                                Audience Details
                            </Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                View details of your selected audience and associated contacts.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                            <IconButton
                                aria-label="more options"
                                aria-controls="audience-options-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="audience-options-menu"
                                anchorEl={menuAnchorEl}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={() => setOpenCSVDialog(true)}>
                                    <UploadFileIcon fontSize="small" sx={{ mr: 1 }} />
                                    Upload CSV
                                </MenuItem>
                                <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                                    Delete Audience
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>

                    {/* Error Handling */}
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Card sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Group color="primary" />
                                        </Grid>
                                        <Grid sx={{ maxWidth: '85%' }} item>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                Audience Name
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 500,
                                                    whiteSpace: 'nowrap',       // Prevent wrapping
                                                    overflow: 'hidden',         // Clip overflowing text
                                                    textOverflow: 'ellipsis',   // Add ellipsis for truncated text
                                                    maxWidth: '100%',           // Ensure it fits within the container
                                                    display: 'block',           // Enforce block-level behavior
                                                }}
                                            >
                                                {loading ? 'Loading...' : audienceDetail?.name || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Person color="primary" />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                Unique Contacts
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                {loading ? 'Loading...' : audienceDetail?.contactCount || 0}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>

                    <Divider sx={{ my: 3 }} />

                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Typography color='primary' variant="h6">Contact List</Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                View and manage contacts associated with this audience.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => setOpenAddDialog(true)}
                            >
                                Add Contact
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Handling Loading and Empty State */}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <CircularProgress />
                            <Typography sx={{ ml: 2 }}>Loading Contacts...</Typography>
                        </Box>
                    ) : contacts.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 3 }}>
                            No contacts found for this audience.
                        </Typography>
                    ) : (
                        <DataGrid
                            rows={contacts}
                            columns={columns}
                            getRowId={(row) => row._id}
                            autoHeight
                            sx={{
                                bgcolor: '#fff',
                                borderRadius: 2,
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                p: 1,
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    )}
                </Container>
                <Footer />
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Delete Audience</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this audience? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAudience} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
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
                            {[
                                { name: 'firstName', label: 'First Name', required: true },
                                { name: 'lastName', label: 'Last Name (optional)', required: false },
                                { name: 'email', label: 'Email', required: true },
                                { name: 'phoneNumber', label: 'Phone Number (optional)', required: false },
                                { name: 'role', label: 'Role (optional)', required: false },
                                { name: 'department', label: 'Department (optional)', required: false },
                                { name: 'company', label: 'Company (optional)', required: false },
                                { name: 'country', label: 'Country (optional)', required: false }
                            ].map((field, index) => (
                                <Grid item xs={12} md={6} key={field.name}>
                                    <TextField
                                        autoFocus={index === 0}
                                        margin="dense"
                                        name={field.name}
                                        label={field.label}
                                        type={field.name === 'email' ? 'email' : 'text'}
                                        fullWidth
                                        variant="outlined"
                                        value={newContact[field.name]}
                                        onChange={handleAddContactChange}
                                        required={field.required}
                                        error={!!formErrors[field.name]}
                                        helperText={formErrors[field.name] || ''}
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                '& .MuiInputLabel-asterisk': {
                                                    color: 'error.main',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="warning">
                        Cancel
                    </Button>
                    <Button onClick={handleAddContact} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* CSV Upload Dialog */}
            <Dialog
                open={openCSVDialog}
                onClose={handleCloseCSVDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Upload CSV to Audience</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Upload a CSV file to add multiple contacts to this audience. 
                        The file should contain columns: <strong>firstName</strong> and <strong>email</strong>.
                        Duplicate emails will be automatically skipped.
                    </DialogContentText>
                    
                    {!csvUploadResult ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="file"
                                    onChange={(e) => handleCSVFileChange(e.target.files[0])}
                                    inputProps={{ accept: '.csv' }}
                                    helperText="Select a CSV file with contact information"
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Box>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Upload Results
                                </Typography>
                                <Typography variant="body2">
                                    • Total processed: {csvUploadResult.totalProcessed} contacts<br/>
                                    • Successfully added: {csvUploadResult.added} contacts<br/>
                                    • Duplicates skipped: {csvUploadResult.duplicates} contacts
                                </Typography>
                                {csvUploadResult.skippedRows.length > 0 && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        • Skipped rows: {csvUploadResult.skippedRows.join(', ')}
                                    </Typography>
                                )}
                            </Alert>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCSVDialog} color="primary">
                        {csvUploadResult ? 'Close' : 'Cancel'}
                    </Button>
                    {!csvUploadResult && (
                        <Button 
                            onClick={handleCSVUpload} 
                            color="primary" 
                            disabled={!csvFile || loading}
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* Error Snackbar */}
            <Snackbar
                open={errorSnackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseErrorSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseErrorSnackbar} 
                    severity="error" 
                    sx={{ width: '100%' }}
                >
                    {errorSnackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default AudienceDetail;
