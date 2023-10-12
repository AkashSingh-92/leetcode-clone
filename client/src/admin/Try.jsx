import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import '.././App.css'; // Import your custom CSS for styling


function ResizableTextField() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <TextField
        fullWidth
        multiline
        minRows={5}
        variant='outlined'
        required="true"
        placeholder="Clearly describe your question, So that it's easy for the user to understand"
        style={{
            margin : "10px",
            backgroundColor :"#F9F9F9"
        }}
        onChange={handleChange}

      />
    </div>
  );
}

export default ResizableTextField;
