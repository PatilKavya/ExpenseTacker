import React, { useContext, useRef, useState } from "react";
import { Button, Card, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TokenContext from "../Context/TokenContext";
import styles from './Authorise.module.css'

const Authorise = () => {
const [isLogin,setLogin]=useState(true);
const [request,setRequest]=useState(false);
const emailRef=useRef();
const passwordRef=useRef();
const context=useContext(TokenContext)
const history=useHistory();

const swithAuthModeHandler=()=>{
    setLogin(prev=>!prev)
}

async function submitHandler(e){
e.preventDefault();
setRequest(true)
let url;
if(isLogin){
url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5ztozBgL5yMdBOs-HY-xl5ofy5xIlOm8'
}else{
url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5ztozBgL5yMdBOs-HY-xl5ofy5xIlOm8'
}
const res=await fetch(url,{
    method:'POST',
    body:JSON.stringify({
        email:emailRef.current.value,
        password:passwordRef.current.value,
        returnSecureToken:true,
    }),
    headers:{
      'Content-Type':'application/json'}
    })
    setRequest(false)
    if(res.ok){
      const data= await res.json();
      // console.log(data.email);
      context.addToken(data.idToken)
      context.addmail(data.email)
      history.replace('/product')
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
        <h2>{isLogin ? 'LogIn':'SignUp'}</h2>
        <section>
      <Form onSubmit={submitHandler}>
        <FormGroup className={styles.input}>
            <FormLabel>Email</FormLabel>
        <FormControl type="mail" name='mail' required ref={emailRef}/>
        </FormGroup>
        <FormGroup className={styles.input}>
            <FormLabel>Password</FormLabel>
        <FormControl type="password" name='password' required ref={passwordRef}/>
        </FormGroup>
        {request&&<h5>sending request....</h5>}
        {!request&&(<Button className={styles.button} type='submit' >{isLogin?'LogIn':'Create Account'}</Button>)}<br/>
        <Button  className={styles.button} type="button" onClick={swithAuthModeHandler} variant='info'>{isLogin?'Create a new account':'LogIn with Existing Account'}</Button>
      </Form>
      </section>
      </Card>
      </Container>
    </>
  );
};

export default Authorise;
