import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NoteAddIcon from '@mui/icons-material/NoteAdd';




const TravellerSensitiveData = () => {
    return (
        <div className="inline-grid justify-items-center justify-center" >
        <Box  className="inline-grid justify-items-center"
        component="form" noValidate onSubmit={() => { console.log("Hi"); } } sx={{ mt: 3 }}>
        <Grid container spacing={2}>


        <Grid item xs={12} >
                <TextField
                type="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="E-Mail"
                  placeholder="E-Mail"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                type="password"
                  name="old password"
                  fullWidth
                  id="old password"
                  label="Old Password"
                  placeholder="Old Password"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                type="password"
                  name="new password"
                  fullWidth
                  id="new password"
                  label="New Password"
                  placeholder="New Password"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                type="password"
                  name="confirm new password"
                  fullWidth
                  id="confirm new password"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  autoFocus
                />
              </Grid>

              <Button
              type="submit"
              fullWidth
              endIcon= {<NoteAddIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>


            </Grid>
            </Box>
            </div>

    )
}

export default TravellerSensitiveData
