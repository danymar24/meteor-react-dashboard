import React from 'react';
import UsersTable from './UsersTable';
import { Grid } from '@material-ui/core';

export default function Users({ users: users, ...rest }) {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <UsersTable />
                </Grid>
            </Grid> 
        </div>
    );
}