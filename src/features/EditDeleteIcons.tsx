import React from 'react'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EditDeleteIcons() {
  return (
    <div style={{ position: 'absolute', top: 0, right: 20 }}>
      <Fab color='primary' aria-label='edit'>
        <EditIcon />
      </Fab>
      <Fab color='primary' aria-label='delete'>
        <DeleteIcon />
      </Fab>
    </div>
  );
}

export default EditDeleteIcons
