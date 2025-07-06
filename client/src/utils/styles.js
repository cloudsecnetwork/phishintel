// Common styling objects to reduce duplication across components

// Card styling used in ContactDetailsDialog
export const cardStyles = {
    p: 2,
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid',
    borderColor: 'grey.200'
};

// Section header styling
export const sectionHeaderStyles = {
    color: 'primary.main',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: 1
};

// Field label styling
export const fieldLabelStyles = {
    color: 'text.secondary',
    fontWeight: 'bold'
};

// Field value styling
export const fieldValueStyles = {
    mt: 0.5
};

// Dialog paper props for modern styling
export const dialogPaperProps = {
    sx: {
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
    }
};

// Gradient header styling
export const gradientHeaderStyles = {
    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
    color: 'white',
    borderRadius: '12px 12px 0 0'
};

// Contact avatar styling
export const contactAvatarStyles = {
    width: 60,
    height: 60,
    borderRadius: '50%',
    bgcolor: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold'
};

// DataGrid styling
export const dataGridStyles = {
    bgcolor: '#fff',
    borderRadius: 2,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    p: 1,
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
};

// Action buttons container styling
export const actionButtonsStyles = {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
};

// Loading container styling
export const loadingContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px'
}; 