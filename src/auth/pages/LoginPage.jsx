import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../context/AuthContext';
import { AuthLayout } from '../layout/AuthLayout'
import { Card, Text, Input, useInput, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

const formData = {
  email: '',
  password: '',
}

const formValidations = {
  email: [ (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) , 'Ingresa un email válido'],
  password: [  (value) => value.length >= 6, 'La contraseña debe tener 6 caracteres o más' ],
}

export const LoginPage = () => {

  const {  signInWithGoogle, Alert, setAlert, startLoginWithEmailAndPassword } = useContext(AuthContext);

  const { email, password, onInputChange, isFormValid } = useForm(formData, formValidations);

  const formValid = useMemo( () => isFormValid === false, [isFormValid] );

      
  const validateEmail = (email) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  }

  const helper = React.useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "",
      };
      const isValid = validateEmail(email);
    return {
      text: isValid ? "Email correcto" : "Ingresa un email válido",
      color: isValid ? "success" : "error",
    };
  }, [email]);

  const helperPassword = React.useMemo(() =>{
    if(!password)
    return {
      text: '',
      color: ''
    };
    const isValidPassword = validatePassword(password);
    return {
      text: isValidPassword ? 'Contraseña correcta' : 'La contraseña debe contener 6 carácteres o más',
      color: isValidPassword ? 'success' : 'error',
    }
  }, [password]);


  const loginWithGoogle = () => {
    signInWithGoogle();
  }
  
  const startLogin = (e) => {
    e.preventDefault();
    startLoginWithEmailAndPassword(email, password);
  }

  return (
    <AuthLayout>
      <form onSubmit={ startLogin }>
    <div className="contaier-xl animate__animated animate__fadeIn">
        <Card className='mx-auto mt-5' isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Text h3 className='fw-bold text-center'>INICIAR SESION</Text>
            <Card.Body>
            <Input
          bordered
          clearable
          shadow={false}
          type="email"
          label="Email"
          placeholder="Ingresa correo electronico"
          name='email'
          value={ email }
          onChange={ onInputChange }
        /><br/>

            <Input.Password
          clearable
          bordered
          type="password"
          label="Contraseña"
          placeholder="Ingresa la contraseña"
          name='password'
          value={ password }
          onChange={ onInputChange }
        /><br/>
        {
          Alert 
          ? <div className="alert alert-danger text-center" role="alert">
          { Alert }
        </div>
        : <br/>
        }
            <div className="mx-auto">
                {/* <Button className='bg-light text-dark fw-bold' auto><i className="bi bi-box-arrow-in-right"></i>&nbsp;Entrar</Button> */}
                <Button disabled={ formValid } type='submit' className='bg-light text-dark fw-bold d-inline-block me-3' auto><i className="bi bi-box-arrow-in-right"></i>&nbsp;Entrar</Button>
                <Button onClick={ loginWithGoogle } className='bg-danger text-white fw-bold d-inline-block me-2' auto><i className="bi bi-google"></i>&nbsp;Entrar con Google</Button>
            </div><br />

            <Text className='text-center' h6>¿No tienes cuenta?&nbsp;<Link to="/auth/register">Registrate Aquí</Link> </Text>
            </Card.Body>
        </Card>
    </div><br/><br/>
    </form>
    </AuthLayout>
  )
}
