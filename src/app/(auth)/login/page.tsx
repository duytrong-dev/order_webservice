import LoginForm from "./login-form"

const LoginPage = () => {
    return(
        <div>
            <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
            <div className="flex justify-center items-center">
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage