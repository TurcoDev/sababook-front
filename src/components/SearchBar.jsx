
import React, { useState } from 'react';
import { TextField, InputAdornment, styled, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.grey[100], 
    borderRadius: '8px',
    padding: '4px 0',
    
    '& fieldset': {
      border: 'none', 
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

/**
 * @param {function} props.onSearchChange -
 */
const SearchBar = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <StyledTextField
      variant="outlined"
      placeholder="Buscar..."
      size="small"
      value={searchValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginLeft: '8px' }}>
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
      sx={{ width: '300px' }} 
    />
  );
};

export default SearchBar;