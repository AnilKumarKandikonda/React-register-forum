export const registerData = {
    full_name: {
        elementType: 'input',
        type: 'text',
        label: 'Full Name',
        placeHolder: 'Full Name',
        value: '',
        validation: {
            required: true,
            specialCharacters: false
        },
        isValid: false,
        touched: false
    },
    contact_number: {
        elementType: 'input',
        type: 'text',
        label: 'Contact Number',
        placeHolder: 'Contact Number',
        value: '',
        validation: {
            required: true,
            numberFormat: 'canadian',
        },
        isValid: false,
        touched: false
    },
    day: {
        elementType: 'select',
        type: 'select',
        placeHolder: 'Day',
        value: '',
        label: 'Birthdate',
        validation: {
            selectRequired: true,
        },
        isValid: false,
        touched: false
    },
    month: {
        elementType: 'select',
        type: 'select',
        placeHolder: 'Month',
        value: '',
        label: '',
        validation: {
            selectRequired: true,
        },
        isValid: false,
        touched: false
    },
    year: {
        elementType: 'select',
        type: 'select',
        placeHolder: 'Year',
        label: '',
        value: '',
        validation: {
            selectRequired: true,
        },
        isValid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        type: 'email',
        label: 'Email Address',
        placeHolder: 'Email Address',
        value: '',
        validation: {
            required: true,
            isEmail: true,
        },
        isValid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        type: 'password',
        placeHolder: 'Password',
        value: '',
        label: 'Password',
        validation: {
            required: true,
            minLength: 8,
            pattern: true
        },
        isValid: false,
        touched: false
    },
    confirm_password: {
        elementType: 'input',
        type: 'password',
        placeHolder: 'Confirm Password',
        label: 'Confirm Password',
        value: '',
        validation: {
            required: true,
            matched: true,
        },
        isValid: false,
        touched: false
    },
}