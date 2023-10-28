export const mapContainerStyle = (height = '64') => {
  const calcMapStyle = {
    width: `100%`,
    height: `calc(100vh - ${height}px)`,
  };

  return calcMapStyle;
};
