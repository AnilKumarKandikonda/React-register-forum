import React from 'react';
import { MenuItem, InputLabel, Select, FormControl } from '@mui/material';

const SelectInput = ({ inputChangedHandler, field, item, arrayItems }) => {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} className='selectinputformcontrol'>
            <InputLabel id={`select-label-${item}`}>{<span>{field.placeHolder}<sup style={{ color: "red" }}>&nbsp;*</sup></span>}</InputLabel>
            <Select
                labelId={`select-label-${item}`}
                id={`select-${item}`}
                label={field.placeHolder}
                value={field.value}
                fullWidth
                onChange={(event) => inputChangedHandler(event, item)}
            >
                {arrayItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>

    )
}

export default SelectInput;