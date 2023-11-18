import React, { useContext } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSpot } from '../../../api/spot';
import { fetchSpots } from '../utils/fetchSpots';
import { SpotsDataContext } from '../../../contexts/spots/SpotsDataContext';

function EditDeleteIcons({ id }: { id: string }) {
  const { setSpotsData } = useContext(SpotsDataContext);
  const handleDeleteClick = async () => {
    try {
      const response = await deleteSpot(id);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        fetchSpots(setSpotsData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ position: 'absolute', top: 0, right: 20 }}>
      <Fab color='primary' aria-label='edit'>
        <EditIcon />
      </Fab>
      <Fab color='primary' aria-label='delete' onClick={handleDeleteClick}>
        <DeleteIcon />
      </Fab>
    </div>
  );
}

export default EditDeleteIcons;
