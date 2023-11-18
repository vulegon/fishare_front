import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Margin from './components/HeightMargin';
import { deleteSpot } from '../../../api/spot';
import { fetchSpots } from '../utils/fetchSpots';
import { SpotsDataContext } from '../../../contexts/spots/SpotsDataContext';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

function DeleteConfirmationModal({
  open,
  setOpen,
  spotId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  spotId: string;
}) {
  const { setSpotsData } = useContext(SpotsDataContext);

  const handleDeleteClick = async () => {
    try {
      const response = await deleteSpot(spotId);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        fetchSpots(setSpotsData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') {
            handleModalClose(event as React.MouseEvent<HTMLDivElement, MouseEvent>);
          }
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            本当に削除しますか？
          </Typography>
          <Margin />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='outlined' onClick={handleCancelClick}>
              キャンセル
            </Button>
            <Box sx={{ width: '30px' }}></Box>
            <Button variant='contained' color='error' onClick={handleDeleteClick}>
              削除
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteConfirmationModal;
