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
    DialogContentText
} from '@mui/material';
import { Group, Person, Add } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon, Delete as DeleteIcon, Memory as AIContextIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAudience } from '../../hooks/useAudience';

const AudienceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { audienceDetail, fetchAudienceDetail, deleteAudience, addContact, deleteContact, loading, error } = useAudience();
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

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    // State for the AI Context dialog and file
    const [openAIDialog, setOpenAIDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler for file selection
    const handleFileUpload = (file) => {
        setSelectedFile(file);
    };

    // Placeholder handler for enabling AI context
    const handleEnableAIContext = () => {
        // Placeholder logic for uploading the file and enabling AI context
        console.log('File uploaded:', selectedFile);
        setOpenAIDialog(false); // Close the dialog after upload
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

    const handleAddContactChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleAddContact = async () => {
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
        } else {
            console.error('Failed to add contact:', response.message);
            alert(`Error: ${response.message}`);
        }
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
                            <Typography variant="h5" color="primary">
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
                                <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                                    Delete Audience
                                </MenuItem>
                                <MenuItem onClick={() => setOpenAIDialog(true)}
                                    disabled={audienceDetail?.AIContextEnabled}>
                                    <AIContextIcon fontSize="small" sx={{ mr: 1 }} />
                                    Enable AI Context
                                </MenuItem>
                                {/* Add more menu items here if needed */}
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
                                <Grid item xs={12} md={4}>
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

                                <Grid item xs={12} md={4}>
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

                                <Grid item xs={12} md={4}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <AIContextIcon color="primary" />
                                        </Grid>
                                        <Grid sx={{ maxWidth: '85%' }} item>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                AI Context
                                            </Typography>
                                            <Chip
                                                size="small"
                                                label={loading ? 'Loading...' : audienceDetail?.AIContextEnabled ? 'Enabled' : 'Disabled'}
                                                color={
                                                    loading
                                                        ? 'default'
                                                        : audienceDetail?.AIContextEnabled
                                                            ? 'success'
                                                            : 'default'
                                                }
                                            />
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
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={newContact[field.name]}
                                        onChange={handleAddContactChange}
                                        required={field.required}
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

            <Dialog
                open={openAIDialog}
                onClose={() => setOpenAIDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Enable AI Context</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>

                        {/* Instructions */}
                        <Grid item xs={12}>
                            <DialogContentText>
                                Activate AI Context by uploading unique audience insights to enable intelligent, personalized email content.
                            </DialogContentText>
                        </Grid>

                        {/* Info Box for Enterprise Users */}
                        <Grid item xs={12}>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                <Typography variant="body2">
                                    <strong>Pro Feature:</strong> With an Enterprise License, this functionality is automated and seamlessly integrates with your existing systems.
                                </Typography>
                            </Alert>
                        </Grid>

                        {/* File Upload Input */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="file"
                                onChange={(e) => handleFileUpload(e.target.files[0])}
                                inputProps={{ accept: '.json,.csv' }}
                                helperText={selectedFile ? selectedFile.name : "Upload a JSON or CSV file."}
                                error={error && !selectedFile}
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAIDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEnableAIContext} color="primary" disabled={!selectedFile}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default AudienceDetail;
