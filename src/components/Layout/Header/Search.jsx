import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (target, searchValue) => {
    navigate({ pathname: pages.search.path, search: `${queryKeys.search}=${searchValue}` });
    setValue('');
    if (target) {
      target.blur();
    }
  };

  return (
    <>
      <TextField
        placeholder={t`SearchForPetitions`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => (e.code === 'Enter' || e.code === 'NumpadEnter') && value && handleSubmit(e.target, value)}
        sx={(theme) => ({
          '& input.MuiInputBase-input': {
            fontSize: theme.typography.h1.fontSize + '!important'
          }
        })}
        InputProps={{
          sx: (theme) => ({
            color: 'common.white',
            borderBottom: `1px solid ${theme.palette.common.white} !important`
          }),
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title={t`Search`}>
                <IconButton onClick={(e) => (value ? handleSubmit(null, value) : null)} sx={{ px: 0 }}>
                  <SearchIcon
                    sx={{
                      color: 'common.white'
                    }}
                  />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
        fullWidth
        variant="standard"
      />
    </>
  );
};

export default Search;
