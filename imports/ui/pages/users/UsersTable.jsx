/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../helpers/Title';
import { withTracker } from 'meteor/react-meteor-data';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function UsersTable({users: users}) {
  const classes = useStyles();
  console.log(users)
  return users ? (
    <React.Fragment>
      <Title>Users</Title>
      <Paper className={classes.paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Lastname</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.emails[0].address}</TableCell>
                <TableCell>{user.profile.firstName}</TableCell>
                <TableCell>{user.profile.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more users
        </Link>
      </div>
    </React.Fragment>
  ) : 'Loading...';
}

export default UsersContainer = withTracker(() => {
  return {
      users: Meteor.users.find().fetch()
  }
})(UsersTable);