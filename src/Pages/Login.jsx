import { getDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'; // Ensure you have the necessary imports
import { useNavigate } from 'react-router-dom'; // Adjust import if needed
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(); // Initialize Firestore

    try {
      // Reference to the user document in Firestore
      const userDocRef = doc(db, 'users', email);
      const userDoc = await getDoc(userDocRef); // Get user document

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if the password matches
        if (userData.password === password) {
          // Set username in local storage
          localStorage.setItem('username', userData.fullName);
          localStorage.setItem('email', userData.email);
          
          alert('Login successful'); // Alert on successful login
          navigate('/user/profile'); // Navigate to the dashboard or desired route
        } else {
          alert('Incorrect password'); // Alert for incorrect password
        }
      } else {
        alert('User not found'); // Alert if user does not exist
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in: ' + error.message); // Alert on error
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      {/* Left Half */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-1/2 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Enroot Your Account</h1>
          <h2 className="text-lg mb-4">Begin your Blog Writing Journey.</h2>

          <div className="flex items-center w-full mb-4">
            <hr className="flex-1 border-gray-400" />
            <span className="mx-4 text-gray-400">Or</span>
            <hr className="flex-1 border-gray-400" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="bg-navy text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition-colors duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-navy hover:text-blue-700 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
