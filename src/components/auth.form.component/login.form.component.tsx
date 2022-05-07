import React, { SyntheticEvent, useState } from "react"
import "./login.form.component.css"

interface LoginFormComponentProps {
  login(login: string, password: string): void
}

function LoginFormComponent(props: LoginFormComponentProps) {

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    props.login(login, password)
  }
  
 
  return (
    <>
    <form onSubmit={ onSubmit }>
      <div className="input">
        <label htmlFor="login">Username</label>
        <input type="text" name="login" id="login" value={ login } onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value) }/>
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={ password } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) } />
      </div>
      <input type="submit" value="Sign in" className="btn" />
    </form>
    </>
    )
}

export default LoginFormComponent