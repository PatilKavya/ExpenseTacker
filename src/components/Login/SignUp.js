import React, { useContext, useRef, useState } from "react";
import { Button, Card, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TokenContext from "../Context/TokenContext";
import styles from './Authorise.module.css'

const SignUp = () => {
const [isLogin,setLogin]=useState(true);
const [request,setRequest]=useState(false);
const emailRef=useRef();
const passwordRef=useRef();
const confirmPasswordRef=useRef();
const context=useContext(TokenContext)
const history=useHistory();

const swithAuthModeHandler=()=>{
    setLogin(prev=>!prev)
}

async function submitHandler(e){
e.preventDefault();
setRequest(true)

const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5ztozBgL5yMdBOs-HY-xl5ofy5xIlOm8',{
    method:'POST',
    body:JSON.stringify({
        email:emailRef.current.value,
        password:passwordRef.current.value,
        cpnfrmpassword:confirmPasswordRef.current.value,
        returnSecureToken:true,
    }),
    headers:{
      'Content-Type':'application/json'}
    })
    setRequest(false)
    if(res.ok){
      const data= await res.json();
      // console.log(data.email);
      // context.addToken(data.idToken)
      // context.addmail(data.email)
      // history.replace('/product')
    }
    else{
        const data=await res.json();
        alert(data.error.message)
    }
    
}
    
   


  return (
    <>
    <Container>
      <Card  className={styles.container}>
        <h2>SignUp</h2>
        <section>
      <Form onSubmit={submitHandler}>
        <FormGroup className={styles.input}>
            <FormLabel>Email</FormLabel>
        <FormControl type="mail" id='mail' required ref={emailRef}/>
        </FormGroup>
        <FormGroup className={styles.input}>
            <FormLabel>Password</FormLabel>
        <FormControl type="password" id='password' required ref={passwordRef}/>
        </FormGroup>
        <FormGroup className={styles.input}>
            <FormLabel>Confirm Password</FormLabel>
        <FormControl type="password" id='confirm' required ref={confirmPasswordRef}/>
        </FormGroup>
        {/* {request&&<h5>sending request....</h5>} */}
        <Button className={styles.button} type='submit' >SignUp</Button><br/>
        <Button  className={styles.button} type="button" onClick={swithAuthModeHandler} variant='info'>Have a account?, LogIn.</Button>
      </Form>
      </section>
      </Card>
      </Container>
    </>
  );
};

export default SignUp;
