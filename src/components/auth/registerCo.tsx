import React from 'react'
/*import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { getIsAuthSel } from '../../selectors/profile'
import { Redirect } from 'react-router'
import { register } from '../../redux/auth-reducer'

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
                <Field placeholder={'password'} name={'password'} component={"input"} />
            </div>
            <button>Register</button>
        </form>
    )
}
const RegisterReduxForm = reduxForm<FormData>({
    form: 'register', onSubmit: (formData: FormData) => void
})(RegisterForm)

const Register = () => {
    const dispatch = useDispatch()
    let registerD = (formData: FormData) => dispatch(register(formData.email, formData.password))
    const isAuth = useSelector(getIsAuthSel)
    if (isAuth) { return <Redirect to='/' /> }
    return <RegisterReduxForm onSubmit={registerD} />
}
export default Register */