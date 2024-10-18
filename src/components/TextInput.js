import React from 'react';
import { TextField, FormHelperText } from '@mui/material';

const TextInput = ({ inputChangedHandler, field, item }) => {
    return (
        <>
            <label>{field.label}</label>
            <TextField
                id={item}
                type={field.type}
                label={<span>{field.placeHolder}<sup style={{ color: "red" }}>&nbsp;*</sup></span>}
                variant="outlined"
                value={field.value}
                style={{ marginTop: '10px' }}
                onChange={(event) => inputChangedHandler(event, item)}
                fullWidth />
            <FormHelperText style={{ marginBottom: '10px' }}>
                {(!field.isValid && field.touched && field.label !== "") && <span style={{ color: 'red' }}>
                    Sorry, this {field.label} is not valid. Please try again.</span>}
            </FormHelperText>
        </>

    )
}

export default TextInput;