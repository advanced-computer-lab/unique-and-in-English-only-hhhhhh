import React from 'react'

 const SignUp = () => {
  return (
    <>
    <section className="showcase login">
    <div className="overlay">
      <form action="" className="form">
      <input 
        type="text"
        name="username" 
        id="usernme" 
        placeholder="ur username" 
        required     
        />
        
        <input 
        type="email"
        name="email" 
        id="email" 
        placeholder="ur email address" 
        required     
        />
        <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder="ur password" 
        required     
        />
        <input 
        type="password" 
        name="password2" 
        id="password2" 
        placeholder="confirm ur password" 
        required     
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
    
    
    
    </section>
    
    </>
      )
}


export default SignUp ;

