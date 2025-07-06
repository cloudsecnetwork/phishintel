import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button, Grid, Tabs, Tab } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';
import ImportTemplateDialog from './ImportTemplateDialog';
import SavedTemplates from './SavedTemplates';
import AIBuilder from './AIBuilder';
import { useTemplates } from '../../hooks/useTemplates'; // Import the useTemplates hook

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const viewToTabIndex = {
    saved: 0,
    'builder': 1,
};

const tabIndexToView = {
    0: 'saved',
    1: 'builder',
};

const Templates = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialView = queryParams.get('view') || 'saved';
    const [value, setValue] = useState(viewToTabIndex[initialView] || 0);

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);

    // Import the useTemplates hook
    const { templates, loading, error, fetchTemplates, createTemplate } = useTemplates();

    useEffect(() => {
        // Fetch templates when the component mounts
        fetchTemplates();
    }, []);

    useEffect(() => {
        const currentView = queryParams.get('view') || 'saved';
        const currentTab = viewToTabIndex[currentView];
        if (currentTab !== value) {
            setValue(currentTab || 0);
        }
    }, [location.search, value]);

    const handleChange = (event, newValue) => {
        const view = tabIndexToView[newValue];
        setValue(newValue);
        navigate(`?view=${view}`);
    };

    const importTemplate = () => {
        setDialogOpen(true); // Open the dialog
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleImport = async (templateName, emailSubject, htmlFile) => {
        console.log('Importing HTML template...');
        const formData = new FormData();
        formData.append('name', templateName);
        formData.append('subject', emailSubject);
        formData.append('type', 'custom'); // Assuming it's a custom template
        formData.append('file', htmlFile); // Change this to "file" to match backend

        // Use the createTemplate hook to send the data to the API
        const response = await createTemplate(formData);
        if (response.success) {
            console.log('Template imported successfully');
        } else {
            console.error('Error importing template:', response.message);
        }

        handleDialogClose(); // Close the dialog after submission
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                            <Typography 
                                sx={{ 
                                    mb: 1, 
                                    fontWeight: 500,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                }} 
                                variant="h4" 
                                color="primary"
                            >
                                Email Templates
                            </Typography>
                            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                                Import and manage HTML email templates. Upload your existing templates or create new ones using the AI Email builder (coming soon).
                            </Typography>
                        </Grid>
                        <Grid sx={{ p: 2 }} xs={12} md={4} lg={4}>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<UploadIcon />}
                                    onClick={importTemplate}
                                >
                                    Import HTML Template
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Tabs Section */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                        <Tabs value={value} onChange={handleChange} aria-label="template builder tabs">
                            <Tab label="Saved" />
                            <Tab label="Builder" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <SavedTemplates templates={templates} loading={loading} error={error} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AIBuilder /> {/* Use the AIBuilder component */}
                    </TabPanel>
                </Container>

                {/* Dialog for Importing Template */}
                <ImportTemplateDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    onImport={handleImport}
                />

                <Footer />
            </Box>
        </Box>
    );
};

export default Templates;
