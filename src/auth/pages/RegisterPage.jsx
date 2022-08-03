import React, { useContext, useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { Card, Text, Input, useInput, Button } from "@nextui-org/react";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) , 'Ingresa un email válido'],
  password: [  (value) => value.length >= 6, 'La contraseña debe tener 6 caracteres o más' ],
  displayName: [ (value) => value.length >= 5, 'El Nombre no debe quedar vacio']
}

export const RegisterPage = () => {

    const {  signInWithGoogle, Usuario, Alert, setAlert, startRegisterWithEmailAndPassword } = useContext(AuthContext);

    const { 
      displayName, email, rol = 'Usuario', password, onInputChange, isFormValid
    } = useForm(formData, formValidations);

    const formValid = useMemo( () => isFormValid === false, [isFormValid] );

    const isCheckAuth = useMemo( () => Usuario.status === 'checking', [Usuario] );

    const validateEmail = (email) => {
      return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const validateDisplayName = (displayName) => {
      return displayName.length >= 5;
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

    const helperName = React.useMemo(() => {
      if(!displayName)
        return {
          text: '',
          color: '',
        };
        const isValidName = validateDisplayName(displayName);
        return {
          text: isValidName ? 'Nombre correcto' : 'El nombre debe contener más de 5 carácteres',
          color: isValidName ? 'success' : 'error',
        };
    }, [displayName]);

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




    const registerWithGoogle = () => {
      signInWithGoogle();
    }

    const onRegister = (e) => {
      e.preventDefault();;
      if (!isFormValid) return;
      startRegisterWithEmailAndPassword(email, password, displayName, rol);
    }

  return (
    <AuthLayout>
      <form onSubmit={onRegister}>
      <div className="contaier-xl animate__animated animate__fadeIn">
        <Card className='mx-auto mt-5' isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Text h3 className='fw-bold text-center'>REGISTRARSE</Text>
            <Card.Body>
            <Input
          bordered
          clearable
          shadow={false}
          type="email"
          label="Email"
          placeholder="Ingresa correo electronico"
          name='email'
          value={email}
          onChange={onInputChange}
          status={helper.color}
          color={helper.color}
          helperColor={helper.color}
          helperText={helper.text}
        /><br/>

        <Input
            bordered
            clearable
            shadow={false}
            type='text'
            label='Nombre'
            placeholder='Ingresa tú nombre'
            name='displayName'
            value={displayName}
            onChange={onInputChange}
            status={helperName.color}
            color={helperName.color}
            helperColor={helperName.color}
            helperText={helperName.text}
        /><br/>

            <input type="hidden" name='rol' value={rol} />

            <Input.Password
          clearable
          bordered
          type="password"
          label="Contraseña"
          placeholder="Ingresa la contraseña"
          name='password'
          value={password}
          onChange={onInputChange}
          status={helperPassword.color}
          color={helperPassword.color}
          helperColor={helperPassword.color}
          helperText={helperPassword.text}
        /><br/>
        {
          Alert 
          ? <div className="alert alert-danger text-center" role="alert">
          { Alert }
        </div>
        : <br/>
        }
            <div className="mx-auto">
                <Button disabled={ formValid } type='submit' className='bg-light text-dark fw-bold d-inline-block me-2' auto><i className="bi bi-box-arrow-in-right"></i>&nbsp;Registrarse</Button>
                <Button disabled={ isCheckAuth } onClick={ registerWithGoogle } className='bg-danger text-white fw-bold d-inline-block me-2' auto><i className="bi bi-google"></i>&nbsp;Registrarse con Google</Button>
            </div><br />
            <Text className='text-center' h6>¿Ya tienes cuenta?&nbsp;<Link to="/auth/login">Inicia Sesión Aquí</Link> </Text>
            </Card.Body>
        </Card>
    </div><br/><br/>
    </form>
    </AuthLayout>
  )
}

