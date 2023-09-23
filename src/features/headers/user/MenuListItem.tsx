import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';

function LogInMenu({ path, value }: { path: string; value: string }) {
  const centeredText = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block',
  };

  const listItemStyle = {
    ...centeredText,
    '&:hover': {
      // マウスオーバー時のスタイル
      backgroundColor: '#f2f2f2', // 例：背景色を変更する
    },
  };

  return (
    <ListItem sx={listItemStyle}>
      <Link to={path} style={linkStyle}>
        {value}
      </Link>
    </ListItem>
  );
}

export default LogInMenu;
