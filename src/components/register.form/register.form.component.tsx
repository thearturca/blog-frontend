import { SyntheticEvent, useState } from "react";
import { NewUserEntity } from "../../services/auth/new-user.entity";

interface RegisterFormComponentProps {
    register(newUser: NewUserEntity): void
}

function RegisterFormComponent(props: RegisterFormComponentProps) {

    const [accountId, setAccountId] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [userSecret, setUserSecret] = useState<string>('');

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const newUser: NewUserEntity = new NewUserEntity(accountId, userSecret, fullName);
        props.register(newUser);
    }
    return (
        <>
        <form onSubmit={ onSubmit }>
            <div className="input">
                <label htmlFor="accountId">Username</label>
                <input type="text" name="accountId" id="accountId" required value={ accountId } onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setAccountId(e.target.value) }/>
            </div>
            <div className="input">
                <label htmlFor="userSecret">Password</label>
                <input type="password" name="userSecret" id="userSecret" required value={ userSecret } onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setUserSecret(e.target.value) }/>
            </div>
            <div className="input">
                <label htmlFor="fullName">Full name</label>
                <input type="text" name="fullName" id="fullName" required value={ fullName } onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value) }/>
            </div>
            <input type="submit" value="Sign up" className="btn" />
        </form>
        </>
    )
}

export default RegisterFormComponent;