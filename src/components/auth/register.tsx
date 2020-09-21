import React from 'react'
import { Field, InjectedFormProps, reduxForm, ActionTypes } from 'redux-form'
import { useSelector, useDispatch, connect } from 'react-redux'
import { getIsAuthSel } from '../../selectors/profile'
import { Redirect } from 'react-router'
import { register } from '../../redux/auth-reducer'
import { AppReducersType } from '../../redux/redux-store'

type FormData = {
    email: string
    password: string
}

const RegisterForm: React.FC<InjectedFormProps<FormData>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={"input"} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={"input"} type={'password'} />
            </div>
            <button>Register</button>
        </form>
    )
}
const RegisterReduxForm = reduxForm<FormData>({
    form: 'register'
})(RegisterForm)
type propsType = mstpT & mdtpT
const Register: React.FC<propsType> = ({ isAuth, register }) => {
    let onSubmit = (formData: FormData) => {
        console.log(formData)
        register(formData.email, formData.password)
    }
    if (isAuth) { return <Redirect to='/' /> }
    return <RegisterReduxForm onSubmit={onSubmit} />
}
const mstp = (state: AppReducersType) => ({
    isAuth: state.authreducer.isAuth
})

type mstpT = {
    isAuth: boolean
}
type mdtpT = {
    register: (email: string, password: string) => void
}
export default connect<mstpT, mdtpT, unknown, AppReducersType>(mstp, { register })(Register)