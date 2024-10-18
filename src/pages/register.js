import React, { useEffect, useState } from "react";
import { Card, CardContent, FormHelperText, Button, Alert } from '@mui/material';
import axios from "axios";
import { registerData } from "./registerData";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import headerLogo from '../assets/images/headerlogo.png';

const Login = () => {
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const monthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [registerPage, setRegisterPage] = useState(registerData);
    const [message, setMessage] = useState({ status: '', message: '' });

    useEffect(() => {
        let days = [];
        let months = [];
        let years = [];
        for (let i = 1; i <= 31; i++) {
            days.push({ value: i, label: i });
            if (i <= 12) {
                months.push({ value: i, label: monthsLabels[i - 1] });
            }
        }
        for (let i = new Date().getFullYear() - 1; i > new Date().getFullYear() - 80; i--) {
            years.push({ value: i, label: i });
        }
        setDays(days);
        setMonth(months);
        setYear(years);

    }, []);

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.numberFormat === 'canadian') {
            const pattern = /^1[2-9]\d{2}[2-9]\d{6}$/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.pattern) {
            const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            isValid = passwordRegex.test(value) && isValid;
        }
        if (rules.matched) {
            isValid = value === registerPage['password'].value && isValid;
        }
        return isValid;
    }

    const inputChangedHandler = (event, item) => {
        const updatedFields = {
            ...registerPage,
            [item]: {
                ...registerPage[item],
                value: event.target.value,
                isValid: checkValidity(event.target.value, registerPage[item].validation),
                touched: true,
            }
        }
        setRegisterPage(updatedFields);
    }
    const clearFormData = () => {
        console.log(registerData);
        setRegisterPage({
            ...registerData
        });
    }

    const submitFormData = (e) => {
        e.preventDefault();
        const formData = {};
        let registerData = {
            ...registerPage
        }
        let isValidToSubmitForm = false;
        Object.keys(registerPage).forEach(field => {
            formData[field] = registerPage[field].value;
            isValidToSubmitForm = registerPage[field].isValid;
            registerData[field] = {
                ...registerData[field],
                touched: true
            }
        });
        setRegisterPage(registerData);
        formData.date_of_birth = formData.day + "/" + formData.month + "/" + formData.year;
        setMessage({ status: '', message: '' });
        if(formData.day === "" || formData.month === '' || formData.year === ""){
            return;
        }
        if (isValidToSubmitForm) {
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            axios.post("https://fullstack-test-navy.vercel.app/api/users/create", formData, config).then(res => {
                console.log(res.data);
                setMessage({ status: res.status, message: 'User account successfully created.' });
            }).catch(err => {
                console.log(err);
                setMessage({ status: 400, message: 'User account successfully created.' });
            });
        }

    }

    return (
        <div>
            <div className="page-header">
                    <img alt="header-logo" className="page-header-logo" src={headerLogo} />
            </div>
            <div className="login-page">
                <div className="login-page-container">
                    <p className="login-page-title">Create User Account</p>
                    <Card sx={{ maxWidth: 502 }} style={{ marginBottom: '16px' }} className="cardcontainer">
                        {message.status !== "" && message.status === 400 && <Alert severity="error" className="alertMessage">{message.message}</Alert>}
                        {message.status !== "" && message.status === 200 && <Alert severity="success" className="alertMessage">{message.message}</Alert>}
                        <CardContent className="login-page-formContainer">
                            <div className="login-page-labels">
                                <TextInput field={registerPage.full_name} inputChangedHandler={inputChangedHandler} item="full_name" />
                                <TextInput field={registerPage.contact_number} inputChangedHandler={inputChangedHandler} item="contact_number" />
                                <div>
                                    <div>
                                        <label>Birthdate</label>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <SelectInput field={registerPage.day} inputChangedHandler={inputChangedHandler} item="day" arrayItems={days} />
                                            <SelectInput field={registerPage.month} inputChangedHandler={inputChangedHandler} item="month" arrayItems={month} />
                                            <SelectInput field={registerPage.year} inputChangedHandler={inputChangedHandler} item="year" arrayItems={year} />

                                        </div>
                                        <FormHelperText style={{ marginBottom: '10px' }}>
                                            {((!registerPage.day.isValid && registerPage.day.touched) ||
                                                (!registerPage.month.isValid && registerPage.month.touched) ||
                                                (!registerPage.year.isValid && registerPage.year.touched)) && <span style={{ color: 'red' }}>
                                                    Sorry, this Birthdate is not valid. Please try again.</span>}
                                        </FormHelperText>
                                    </div>
                                </div>
                                <TextInput field={registerPage.email} inputChangedHandler={inputChangedHandler} item="email" />
                                <TextInput field={registerPage.password} inputChangedHandler={inputChangedHandler} item="password" />
                                <TextInput field={registerPage.confirm_password} inputChangedHandler={inputChangedHandler} item="confirm_password" />
                                {message.status !== "" && message.status === 400 && <Alert severity="error" className="alertMessageMobile">{message.message}</Alert>}
                                {message.status !== "" && message.status === 200 && <Alert severity="success" className="alertMessageMobile">{message.message}</Alert>}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="button-group">
                        <Button variant="outlined" className="button-cancel" onClick={clearFormData}>Cancel</Button>
                        <Button variant="contained" className="button-submit" onClick={submitFormData}>Submit</Button>
                    </div>



                </div>
            </div>


        </div>
    );
}

export default Login;