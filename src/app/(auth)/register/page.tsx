import RegisterForm from "./register-form"

const RegisterPage = () => {
    return(
        <div>
            <h1 className="text-xl font-semibold text-center">Đăng ký</h1>
            <div className="flex justify-center place-items-center">
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage