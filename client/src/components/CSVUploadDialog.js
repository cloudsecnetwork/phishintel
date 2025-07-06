import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    Alert,
    Typography
} from '@mui/material';

const CSVUploadDialog = ({ 
    open, 
    onClose, 
    csvFile, 
    onFileChange, 
    onUpload, 
    csvUploadResult, 
    loading 
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>Upload CSV to Audience</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    Upload a CSV file to add multiple contacts to this audience. 
                    The file should contain columns: <strong>firstName</strong> and <strong>email</strong>.
                    Duplicate emails will be automatically skipped.
                </DialogContentText>
                
                {!csvUploadResult ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="file"
                                onChange={(e) => onFileChange(e.target.files[0])}
                                inputProps={{ accept: '.csv' }}
                                helperText="Select a CSV file with contact information"
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Box>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Upload Results
                            </Typography>
                            <Typography variant="body2">
                                • Total processed: {csvUploadResult.totalProcessed} contacts<br/>
                                • Successfully added: {csvUploadResult.added} contacts<br/>
                                • Duplicates skipped: {csvUploadResult.duplicates} contacts
                            </Typography>
                            {csvUploadResult.skippedRows.length > 0 && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    • Skipped rows: {csvUploadResult.skippedRows.join(', ')}
                                </Typography>
                            )}
                        </Alert>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {csvUploadResult ? 'Close' : 'Cancel'}
                </Button>
                {!csvUploadResult && (
                    <Button 
                        onClick={onUpload} 
                        color="primary" 
                        disabled={!csvFile || loading}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default CSVUploadDialog; 