import React from 'react'
import { Redirect } from 'react-router'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { AppReducersType } from '../../redux/redux-store'
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"
import "./login.scss"


type FormData = {
    email: string, password: string
}

const LoginForm: React.FC<InjectedFormProps<FormData>> = ({ handleSubmit }) => {

    return (
        <form className="mainForm" onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={"email"} component={'input'} />
            </div>
            <div>
                <Field placeholder={'password'} name={"password"} component={'input'} type={'password'} />
            </div>
            <button>Login</button>
        </form>
    )
}
const LoginReduxForm = reduxForm<FormData>({ form: 'login' })(LoginForm)
const Login: React.FC<MapStateToPropsType & MapDispatchToProps> = ({ login, isAuth }) => {
    let onSubmit = (formData: FormData) => {    
        console.log(formData)
        login(formData.email, formData.password)
    }
    if (isAuth) {
        return <Redirect to='/' />
    }
    return (
        <LoginReduxForm onSubmit={onSubmit} />
    )
}


let mstp = (state: AppReducersType): MapStateToPropsType => ({
    isAuth: state.authreducer.isAuth,
})
type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToProps = {
    login: (email: string, password: string) => void
}

export default connect<MapStateToPropsType, MapDispatchToProps, unknown, AppReducersType>(mstp, { login })(Login)