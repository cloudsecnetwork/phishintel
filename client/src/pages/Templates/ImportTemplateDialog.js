import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Tooltip,
    Grid,
    FormControlLabel,
    Checkbox,
    DialogContentText,
} from '@mui/material';
import PropTypes from 'prop-types';

const ImportTemplateDialog = ({ open, onClose, onImport }) => {
    const [templateName, setTemplateName] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [htmlFile, setHtmlFile] = useState(null);
    const [error, setError] = useState(false);
    const [sameAsTemplate, setSameAsTemplate] = useState(true); // State for checkbox

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Validate file type and size
        if (file && file.type === 'text/html' && file.size < 2 * 1024 * 1024) { // Example size limit of 2MB
            setHtmlFile(file);
            setError(false); // Clear any previous error
        } else {
            setError(true); // Set error for invalid file
            setHtmlFile(null);
        }
    };

    const handleSubmit = () => {
        const finalEmailSubject = sameAsTemplate ? templateName : emailSubject;
        if (!templateName || !htmlFile || (!sameAsTemplate && !emailSubject)) {
            setError(true);
            return;
        }
        onImport(templateName, finalEmailSubject, htmlFile); // Pass both templateName and emailSubject
        handleClose(); // Close the dialog after submission
    };

    const handleClose = () => {
        onClose();
        setTemplateName('');
        setEmailSubject('');
        setHtmlFile(null);
        setError(false);
        setSameAsTemplate(true); // Reset checkbox
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>Import HTML Template</DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {/* Template Name Input */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Template Name"
                            variant="filled"
                            value={templateName}
                            onChange={(e) => {
                                setTemplateName(e.target.value);
                                if (e.target.value) setError(false);
                            }}
                            helperText={error && !templateName ? "Template name is required." : "Enter a name for your template."}
                            error={error && !templateName}
                            required
                        />
                    </Grid>
                    {/* Checkbox for Same as Template Name */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={sameAsTemplate}
                                    onChange={(e) => setSameAsTemplate(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Use Template Name as Email Subject"
                        />
                    </Grid>

                    {/* Conditionally Render Email Subject Input */}
                    {!sameAsTemplate && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Subject"
                                variant="filled"
                                value={emailSubject}
                                onChange={(e) => {
                                    setEmailSubject(e.target.value);
                                    if (e.target.value) setError(false);
                                }}
                                helperText={error && !emailSubject ? "Email subject is required." : "Enter a subject for your email."}
                                error={error && !emailSubject}
                                required
                            />
                        </Grid>
                    )}

                    {/* File Upload Input */}
                    <Grid item xs={12}>
                        {/* Instruction Section */}
                        <Grid item xs={12}>

                            <DialogContentText sx={{ mb: 2 }}>
                                Use double curly brackets <code>{"{{fieldName}}"}</code> to dynamically replace content in your custom email template.
                                <Tooltip
                                    title={
                                        <span style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                                            Supported fields include: link, firstName, lastName, email, phoneNumber, role, department, company, and country.
                                            Ensure these fields exist in your uploaded contacts to avoid errors.
                                        </span>
                                    }
                                >
                                    <Button sx={{ textTransform: 'none', padding: 0, marginLeft: 1 }}>View Supported Fields</Button>
                                </Tooltip>
                            </DialogContentText>

                        </Grid>
                        {/* File Upload Input */}
                        <TextField
                            fullWidth
                            type="file"
                            onChange={handleFileChange}
                            inputProps={{ accept: '.html' }}
                            helperText={error ? "Upload a valid HTML file (max 2MB)." : "Upload an HTML file for your template."}
                            error={error && !htmlFile}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={!templateName || !htmlFile || (!sameAsTemplate && !emailSubject)}>
                    Import
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ImportTemplateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
};

export default ImportTemplateDialog;
