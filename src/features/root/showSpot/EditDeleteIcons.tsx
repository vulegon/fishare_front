import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Link } from 'react-router-dom';

function EditDeleteIcons({ id }: { id: string }) {
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDeleteConfirmationModalOpen(true);
  };
  return (
    <div style={{ position: 'absolute', top: 0, right: 20 }}>
      <Link to={`/spots/${id}`}>
        <Fab color='primary' aria-label='edit'>
          <EditIcon />
        </Fab>
      </Link>

      <Fab color='primary' aria-label='delete' onClick={handleDeleteClick}>
        <DeleteIcon />
      </Fab>

      <DeleteConfirmationModal
        open={isDeleteConfirmationModalOpen}
        setOpen={setIsDeleteConfirmationModalOpen}
        spotId={id}
      />
    </div>
  );
}

export default EditDeleteIcons;
