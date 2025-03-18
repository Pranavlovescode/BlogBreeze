import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"; // Firebase Auth
import { doc, getDoc } from "firebase/firestore"; // Firebase Firestore
import { db } from "../Firebase/config"; // Import Firestore instance from your firebase setup file
import { Typography, Paper, Grid } from "@mui/material"; // MUI components
import { makeStyles } from "@mui/styles"; // MUI styles

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    margin: "auto",
    maxWidth: 600,
    backgroundColor: "#001f3f", // Navy background color
    color: "#ffffff", // White text color
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem("email"); // Fetch email from local storage

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        const docRef = doc(db, "users", email); // Assuming the user collection uses email as the document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };
    console.log(userData)

    fetchUserData();
  }, [email]);

  return (
    <div className="flex justify-center items-center h-screen">
      {userData && email ? (
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Full Name:</strong> {userData.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Email:</strong> {userData.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {userData.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Instagram:</strong> {userData.instagram}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Facebook:</strong> {userData.facebook}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>LinkedIn:</strong> {userData.linkedIn}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Please login to view your profile
        </Typography>
      )}
    </div>
  );
}
