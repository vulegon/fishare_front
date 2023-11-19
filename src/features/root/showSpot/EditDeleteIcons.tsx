import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function EditDeleteIcons({ id }: { id: string }) {
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDeleteConfirmationModalOpen(true);
  };
  return (
    <div style={{ position: 'absolute', top: 0, right: 20 }}>
      <Fab color='primary' aria-label='edit'>
        <EditIcon />
      </Fab>
      <Fab color='primary' aria-label='delete' onClick={handleDeleteClick}>
        <DeleteIcon />
      </Fab>

      <DeleteConfirmationModal open={isDeleteConfirmationModalOpen} setOpen={setIsDeleteConfirmationModalOpen} spotId={id } />
    </div>
  );
}

export default EditDeleteIcons;
