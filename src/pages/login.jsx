import React from 'react'

function login() {
  return (
    <div class="flex flex-col justify-center items-center bg-slate-200">
        <h1>Login Page</h1>
        <div>
        <label htmlFor="">Name</label>
        <input type="text" />
        </div>
        <div>
        <label htmlFor="">Password</label>
        <input type="password" />
        </div>
        <button>Submit</button>
    </div>
  )
}

export default login