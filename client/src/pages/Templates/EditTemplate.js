// EditTemplate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTemplates } from '../../hooks/useTemplates';

const EditTemplate = ({ template, onEditSuccess }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [htmlContent, setHtmlContent] = useState(template.htmlContent);

    const { updateTemplate } = useTemplates();

    const handleClickOpen = () => {
        if (template.sourceFormat === 'markdown') {
            navigate(`/console/templates/${template._id}/edit`);
            return;
        }
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        const response = await updateTemplate(template._id, { htmlContent });
        if (response.success) {
            onEditSuccess();
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
