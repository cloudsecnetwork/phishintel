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
    Button,
    Alert,
    Snackbar,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { Group, Person, Add, UploadFile as UploadFileIcon, MoreVert as MoreVertIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAudience } from '../../hooks/useAudience';

// Import new components
import ContactDetailsDialog from '../../components/ContactDetailsDialog';
import AddContactDialog from '../../components/AddContactDialog';
import CSVUploadDialog from '../../components/CSVUploadDialog';
import DeleteAudienceDialog from '../../components/DeleteAudienceDialog';
import ContactsDataGrid from '../../components/ContactsDataGrid';

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
        country: '',
        metadata: {}
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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    // State for view contact dialog
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    // Handler for CSV file upload
    const handleCSVFileUpload = async (file) => {
        setUploadProgress(10);
        setUploadStatus(null);
        setUploadMessage('');

        try {
            setUploadProgress(50);
            const response = await uploadCSVToAudience(id, file);
            
            if (response.success) {
                setUploadProgress(100);
                setUploadStatus('success');
                setUploadMessage(`Successfully uploaded CSV file. ${response.data.added} contacts added, ${response.data.duplicates} duplicates skipped.`);
                
                // Refresh the audience details to get updated contact list
                const updatedResponse = await fetchAudienceDetail(id);
                if (updatedResponse?.data?.contacts) {
                    setContacts(updatedResponse.data.contacts);
                }
            } else {
                setUploadStatus('error');
                setUploadMessage(response.message || 'Failed to upload CSV file');
            }
        } catch (error) {
            setUploadStatus('error');
            setUploadMessage('An error occurred while uploading the file');
        }
    };

    // Handler for closing CSV dialog
    const handleCloseCSVDialog = () => {
        setOpenCSVDialog(false);
        setUploadProgress(0);
        setUploadStatus(null);
        setUploadMessage('');
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
                country: '',
                metadata: {}
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

    const handleViewContact = (contact) => {
        setSelectedContact(contact);
        setOpenViewDialog(true);
    };

    const handleCloseViewDialog = () => {
        setOpenViewDialog(false);
        setSelectedContact(null);
    };

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
                        <Alert 
                            severity="error" 
                            variant="outlined"
                            sx={{ 
                                mb: 3,
                                borderRadius: '8px',
                                borderWidth: '1px',
                                '& .MuiAlert-icon': {
                                    fontSize: '1.25rem'
                                }
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Card sx={{ 
                        backgroundColor: "#ffffff", 
                        borderRadius: '16px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '12px',
                                                backgroundColor: 'primary.main',
                                                color: 'white'
                                            }}>
                                                <Group sx={{ fontSize: '1.5rem' }} />
                                            </Box>
                                        </Grid>
                                        <Grid sx={{ maxWidth: '85%' }} item>
                                            <Typography 
                                                variant="subtitle2" 
                                                color="text.secondary"
                                                sx={{ 
                                                    fontWeight: 500,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    fontSize: '0.75rem',
                                                    mb: 0.5
                                                }}
                                            >
                                                Audience Name
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '100%',
                                                    display: 'block',
                                                    color: '#1a1a1a',
                                                    fontSize: '1.25rem'
                                                }}
                                            >
                                                {loading ? (
                                                    <Box component="span" sx={{ 
                                                        color: 'text.secondary',
                                                        fontWeight: 400,
                                                        fontSize: '0.875rem'
                                                    }}>
                                                        Loading audience...
                                                    </Box>
                                                ) : audienceDetail?.name || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '12px',
                                                backgroundColor: 'primary.main',
                                                color: 'white'
                                            }}>
                                                <Person sx={{ fontSize: '1.5rem' }} />
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Typography 
                                                variant="subtitle2" 
                                                color="text.secondary"
                                                sx={{ 
                                                    fontWeight: 500,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    fontSize: '0.75rem',
                                                    mb: 0.5
                                                }}
                                            >
                                                Unique Contacts
                                            </Typography>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 700,
                                                    color: 'primary.main',
                                                    fontSize: '1.5rem'
                                                }}
                                            >
                                                {loading ? (
                                                    <Box component="span" sx={{ 
                                                        color: 'text.secondary',
                                                        fontWeight: 400,
                                                        fontSize: '0.875rem'
                                                    }}>
                                                        Loading...
                                                    </Box>
                                                ) : audienceDetail?.contactCount || 0}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>

                    <Divider sx={{ my: 3 }} />

                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Grid item>
                            <Typography 
                                color='primary' 
                                variant="h6"
                                sx={{ 
                                    fontWeight: 600,
                                    fontSize: '1.25rem',
                                    mb: 0.5
                                }}
                            >
                                Contact List
                            </Typography>
                            <Typography 
                                sx={{ 
                                    fontSize: '0.875rem',
                                    color: 'text.secondary',
                                    lineHeight: 1.4
                                }} 
                                color="text.secondary"
                            >
                                View and manage contacts associated with this audience.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => setOpenAddDialog(true)}
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    px: 2.5,
                                    py: 1,
                                    borderWidth: '1.5px',
                                    '&:hover': {
                                        borderWidth: '2px',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                Add Contact
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Contacts Data Grid */}
                    <ContactsDataGrid
                        contacts={contacts}
                        loading={loading}
                        onViewContact={handleViewContact}
                        onDeleteContact={handleDeleteContact}
                    />
                </Container>
                <Footer />
            </Box>

            {/* Delete Audience Dialog */}
            <DeleteAudienceDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteAudience}
                audienceName={audienceDetail?.name || 'N/A'}
                contactCount={audienceDetail?.contactCount || 0}
                loading={loading}
            />

            {/* Add Contact Dialog */}
            <AddContactDialog
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
                newContact={newContact}
                onContactChange={handleAddContactChange}
                onAddContact={handleAddContact}
                formErrors={formErrors}
            />

            {/* CSV Upload Dialog */}
            <CSVUploadDialog
                open={openCSVDialog}
                onClose={handleCloseCSVDialog}
                onFileUpload={handleCSVFileUpload}
                uploadProgress={uploadProgress}
                uploadStatus={uploadStatus}
                uploadMessage={uploadMessage}
            />

            {/* View Contact Dialog */}
            <ContactDetailsDialog
                open={openViewDialog}
                onClose={handleCloseViewDialog}
                contact={selectedContact}
            />

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
