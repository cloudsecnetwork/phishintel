import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Typography,
    Container,
    Box,
    Button,
    Grid,
    Tabs,
    Tab,
    Menu,
    MenuItem,
    Link,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Alert,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';
import ImportTemplateDialog from './ImportTemplateDialog';
import SavedTemplates from './SavedTemplates';
import AIBuilder from './AIBuilder';
import { useTemplates } from '../../hooks/useTemplates';

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
                <Box sx={{ pt: 1.5, px: 0, pb: 0 }}>
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

    const [dialogOpen, setDialogOpen] = useState(false);
    const [createMenuAnchor, setCreateMenuAnchor] = useState(null);
    const [importLoading, setImportLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const createMenuOpen = Boolean(createMenuAnchor);

    const handleCreateMenuOpen = (event) => setCreateMenuAnchor(event.currentTarget);
    const handleCreateMenuClose = () => setCreateMenuAnchor(null);
    const handleWriteWithEditor = () => {
        handleCreateMenuClose();
        navigate('/console/templates/new');
    };
    const handleImportHtml = () => {
        handleCreateMenuClose();
        setDialogOpen(true);
    };

    const {
        templates,
        error,
        listLoading,
        fetchTemplateList,
        createTemplate,
    } = useTemplates();

    useEffect(() => {
        const view = tabIndexToView[value];
        if (view === 'saved') {
            fetchTemplateList();
        }
    }, [value]);

    useEffect(() => {
        const currentView = queryParams.get('view') || 'saved';
        const currentTab = viewToTabIndex[currentView];
        if (currentTab !== value) {
            setValue(currentTab || 0);
        }
    }, [location.search]);

    const handleChange = (event, newValue) => {
        const view = tabIndexToView[newValue];
        setValue(newValue);
        navigate(`?view=${view}`);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleImport = async (templateName, emailSubject, htmlFile) => {
        setImportLoading(true);
        const formData = new FormData();
        formData.append('name', templateName);
        formData.append('subject', emailSubject);
        formData.append('type', 'custom');
        formData.append('file', htmlFile);

        const response = await createTemplate(formData);
        setImportLoading(false);
        handleDialogClose();

        if (response.success) {
            setNotification({ open: true, message: 'Template imported successfully!', severity: 'success' });
            fetchTemplateList();
        } else {
            setNotification({ open: true, message: response.message || 'Import failed', severity: 'error' });
        }
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
                                Create and manage your phishing email templates. Use the built-in editor with Markdown and dynamic placeholders, or import your own HTML. Grab a 
                                {' '}<Link href="/sample-email-template.html" download sx={{ color: '#00bfff', fontSize: '0.8rem' }}>sample HTML template</Link> to get started quickly.
                            </Typography>
                        </Grid>
                        <Grid sx={{ p: 2 }} xs={12} md={4} lg={4}>
                            <Grid container justifyContent="flex-end" alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={handleCreateMenuOpen}
                                    endIcon={<KeyboardArrowDownIcon sx={{ ml: -0.5 }} />}
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                >
                                    Create template
                                </Button>
                                <Menu
                                    anchorEl={createMenuAnchor}
                                    open={createMenuOpen}
                                    onClose={handleCreateMenuClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem onClick={handleWriteWithEditor}>
                                        <ListItemIcon>
                                            <EditNoteOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Write with editor" />
                                    </MenuItem>
                                    <MenuItem onClick={handleImportHtml}>
                                        <ListItemIcon>
                                            <UploadFileOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Import HTML" />
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Tabs Section */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                        <Tabs value={value} onChange={handleChange} aria-label="template builder tabs">
                            <Tab label="Saved" />
                            <Tab label="AI Builder" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <SavedTemplates
                            templates={templates}
                            loading={listLoading}
                            error={error}
                        />
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
                    loading={importLoading}
                />

                <Snackbar
                    open={notification.open}
                    autoHideDuration={4000}
                    onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity={notification.severity}
                        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>

                <Footer />
            </Box>
        </Box>
    );
};

export default Templates;
