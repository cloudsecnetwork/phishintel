import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography,
    Alert,
    LinearProgress,
    Chip
} from '@mui/material';
import { CloudUpload, Description, CheckCircle, Error } from '@mui/icons-material';
import {
    dialogPaperProps,
    gradientHeaderStyles
} from '../utils/styles';

const CSVUploadDialog = ({
    open,
    onClose,
    onFileUpload,
    uploadProgress,
    uploadStatus,
    uploadMessage
}) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if it's a CSV file by extension or MIME type
            const isCSV = file.type === 'text/csv' || 
                         file.name.toLowerCase().endsWith('.csv') ||
                         file.type === 'application/csv';
            
            if (isCSV) {
                setSelectedFile(file);
            } else {
                // You could add an error message here if needed
                console.log('Please select a valid CSV file');
            }
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={dialogPaperProps}
        >
            <DialogTitle sx={gradientHeaderStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CloudUpload sx={{ fontSize: 28 }} />
                    <Typography variant="h6">Upload CSV File</Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 2 }}>
                <DialogContentText sx={{ pt: 2, mb: 4, color: 'text.secondary' }}>
                    The file must include columns for first name and email, along with any additional optional fields.
                </DialogContentText>

                <Box sx={{ mb: 3 }}>
                    <input
                        accept=".csv"
                        style={{ display: 'none' }}
                        id="csv-file-upload"
                        type="file"
                        onChange={handleFileSelect}
                    />
                    <label htmlFor="csv-file-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            sx={{
                                border: '2px dashed',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                p: 4,
                                width: '100%',
                                minHeight: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: 'primary.dark',
                                    backgroundColor: 'primary.light',
                                    opacity: 0.1
                                }
                            }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                                    Choose CSV File
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click to browse and select a CSV file.
                                </Typography>
                            </Box>
                        </Button>
                    </label>
                </Box>

                {selectedFile && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Selected File:
                        </Typography>
                        <Chip
                            icon={<Description />}
                            label={selectedFile.name}
                            variant="outlined"
                            color="primary"
                            sx={{ fontSize: '0.875rem' }}
                        />
                    </Box>
                )}

                {uploadStatus && (
                    <Box sx={{ mb: 3 }}>
                        {uploadStatus === 'success' ? (
                            <Alert
                                icon={<CheckCircle />}
                                severity="success"
                                sx={{ borderRadius: 2 }}
                            >
                                {uploadMessage}
                            </Alert>
                        ) : uploadStatus === 'error' ? (
                            <Alert
                                icon={<Error />}
                                severity="error"
                                sx={{ borderRadius: 2 }}
                            >
                                {uploadMessage}
                            </Alert>
                        ) : null}
                    </Box>
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Uploading... {uploadProgress}%
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={uploadProgress}
                            sx={{ borderRadius: 1, height: 8 }}
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    disabled={!selectedFile || uploadProgress > 0}
                    startIcon={<CloudUpload />}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Upload CSV
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CSVUploadDialog; 