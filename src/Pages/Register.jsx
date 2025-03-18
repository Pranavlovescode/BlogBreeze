import React, { useState } from 'react';
import { auth, db } from '../Firebase/config'; // Adjust the path as needed
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  const navigate = useNavigate();
  const handleAddUser = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const userDocRef = doc(db, 'users', email);
      
      await setDoc(userDocRef, {
        fullName,
        email,
        password,
        phoneNumber,
        instagram,
        facebook,
        linkedIn,
      });
  
      alert("User added successfully");  
      navigate('/login'); 
  

      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setInstagram('');
      setFacebook('');
      setLinkedIn('');
      
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Join the BlogBreeze Community</h1>
          <h2 className="text-sm mb-6">Your first step towards sharing your experiences</h2>
          <div className="flex items-center w-full mb-4">
            <hr className="flex-1 border-gray-400" />
            <span className="mx-4 text-gray-400">Or</span>
            <hr className="flex-1 border-gray-400" />
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Full Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Confirm Password"
          />
          <div className="grid grid-cols-2 gap-4 w-full">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Phone Number"
            />
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Instagram Account"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Facebook Account"
            />
            <input
              type="text"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="LinkedIn Account"
            />
          </div>
          <button
            onClick={handleAddUser}
            className="bg-navy text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition-colors duration-300"
          >
            Register
          </button>
          <p className="mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-navy underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
