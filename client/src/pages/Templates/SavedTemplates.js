import React, { useState, useEffect } from 'react';
import { Box, Grid, List, ListItem, ListItemText, Divider, CircularProgress, Typography, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PreviewTemplate from './PreviewTemplate';
import EditTemplate from './EditTemplate';
import DeleteTemplate from './DeleteTemplate';

const SavedTemplates = ({ templates, loading, error }) => {
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [templateList, setTemplateList] = useState([]); // Initialize with empty array

    // Sync templateList state with the templates prop
    useEffect(() => {
        if (templates && templates.length > 0) {
            setTemplateList(templates); // Set the initial templates from the prop
        }
    }, [templates]); // This will run whenever the templates prop changes

    // Handle notification open
    const triggerNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    // Handle close notification
    const handleCloseNotification = () => {
        setNotification({ open: false, message: '', severity: 'success' });
    };

    // Handle template delete
    const handleDeleteTemplate = (id) => {
        setTemplateList((prevTemplates) => prevTemplates.filter((template) => template._id !== id));
    };

    return (
        <Box>
            {/* Notification Alert */}
            <Collapse sx={{ mr: 4 }} in={notification.open}>
                <Alert
                    severity={notification.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseNotification}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Collapse>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert sx={{ mb: 2 }} severity="error">{error}</Alert>
            ) : templateList && templateList.length > 0 ? ( // Ensure the templateList exists and has items
                <Box sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                    backgroundColor: '#fff',
                    position: 'relative',
                    mb: 3,
                }}>
                    <List>
                        {templateList.map((template, index) => (
                            <React.Fragment key={template._id}>
                                <ListItem
                                    secondaryAction={
                                        <>
                                            <PreviewTemplate template={template} />
                                            <EditTemplate
                                                template={template}
                                                onEditSuccess={() => triggerNotification('Template updated successfully!')}
                                            />
                                            <DeleteTemplate
                                                template={template}
                                                onDeleteSuccess={() => {
                                                    triggerNotification('Template deleted successfully!');
                                                    handleDeleteTemplate(template._id);
                                                }}
                                            />
                                        </>
                                    }
                                >
                                    <ListItemText
                                        primary={template.name}
                                        secondary={template.type}
                                    />
                                </ListItem>
                                {index < templateList.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            ) : (
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 4,
                    backgroundColor: '#fafafa',
                    borderRadius: 2,
                    border: '1px dashed #ccc'
                }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No templates found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You haven't created any email templates yet. Import your first template to get started.
                    </Typography>
                </Box>
            )}

        </Box>
    );
};

export default SavedTemplates;
