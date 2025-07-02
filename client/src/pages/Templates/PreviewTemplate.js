// PreviewTemplate.js
import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, Typography, Divider } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Visibility';

const PreviewTemplate = ({ template }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton color="primary" onClick={handleClickOpen}>
                <PreviewIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{`Subject: ${template.subject}`}</DialogTitle>
                <Divider sx={{ mx: 3 }} />  {/* Divider after subject */}
                <DialogContent>
                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: template.htmlContent }} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PreviewTemplate;
