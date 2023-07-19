// styles/CustomNavbarStyles.js
const customNavbarStyles = {
    header:{
      position: 'sticky',
      top: '0',
      zIndex: '10000',
    },
    brand: {
      fontSize: '50px',
      fontStyle:'Italic',
      fontWeight:'bold'
    },
    btn:{
      backgroundColor:'orange',
      fontSize: '24px',
      margin:'6px',
      border:'none',
      transition: 'background-color 0.3s ease',
        '&:hover': {
        backgroundColor: 'red',
        cursor: 'pointer',
      },
    },
    searchInput: {
      fontSize: '18px',
    },
    searchButton: {
      fontSize: '18px',
      color:'white',
      backgroundColor:'orange',
      border:'none',
    },
  };
  
  export default customNavbarStyles;
  