// EditTemplate.js
import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTemplates } from '../../hooks/useTemplates'; // Import the hook

const EditTemplate = ({ template, onEditSuccess }) => {
    const [open, setOpen] = useState(false);
    const [htmlContent, setHtmlContent] = useState(template.htmlContent);

    const { updateTemplate } = useTemplates(); // Destructure updateTemplate from the hook

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('htmlContent', htmlContent); // Assuming you're passing the content as formData

        // Call the API to update the template
        const response = await updateTemplate(template._id, formData); // Pass the template ID and updated content
        if (response.success) {
            onEditSuccess();  // Trigger the notification callback
        }
        handleClose();
    };

    return (
        <>
            <IconButton color="secondary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{`Subject: ${template.subject}`}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={15}
                        value={htmlContent}
                        onChange={(e) => setHtmlContent(e.target.value)}
                        label="HTML Content"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditTemplate;
