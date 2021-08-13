import React, {useReducer} from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {authApi, LoginRequestType} from "../api/social-network-api";
import {setIsLoggedInAC, stateForAuthReducer, storiesAuthReducer} from "./stories-reducers/stories-auth-reducer";

export default {
    title: 'Social_Network/Login_Component'
}


const validate = (values: LoginRequestType) => {
    const errors: LoginRequestType = {};
    if (!values.password) {
        errors.password = 'Enter password';
    } else if (values.password.length <= 2) {
        errors.password = 'Password must be more then 2 characters';
    }

    if (!values.email) {
        errors.email = 'Please, enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please, enter a correct email';
    }
    return errors;
};

export const LoginComponent = () => {

    const[state, dispatch] = useReducer(storiesAuthReducer, stateForAuthReducer)

    const formik = useFormik<LoginRequestType>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            authApi.login(values)
                .then(res => {
                    if(res.data.resultCode === 0){
                        dispatch(setIsLoggedInAC(true))
                    }else{
                        alert(res.data.messages[0])
                    }
                })

        },
    });

    return <Grid container justifyContent="center">
        <Grid item xs={ 4 }>
            <form onSubmit={ formik.handleSubmit }>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={ "https://social-network.samuraijs.com/" }
                               target={ '_blank' }> here</a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={ {color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={ {color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={ 'Remember me' }
                            control={ <Checkbox/> }
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={ 'submit' } variant={ 'contained' } color={ 'primary' }>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
