import React from 'react';
import { Route, withRouter } from 'react-router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { Hidden } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Meteor } from 'meteor/meteor';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function DefaultLayout({component: Component, title: title, history: history, ...rest}) {
  
  const classes = useStyles();
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [desktopOpen, setDesktopOpen] = React.useState(true);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
  
  const authenticate = () => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      return history.push('/signin');
    }
  }
  authenticate();
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  }

  const openAccountMenu = (event) => {
    setAccountAnchorEl(event.currentTarget);
  }

  const closeAccountMenu = () => {
    setAccountAnchorEl(null);
  }

  const handleLogout = (event) => {
    event.preventDefault();
    Meteor.logout((err) => {
      if (err) {
        console.log(err);
      } else {
        history.push('/signin');
      }
    })
  }

  return (
    <Route {...rest} render={matchProps => (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar, mobileOpen && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerToggle}
                className={clsx(classes.menuButton, mobileOpen && classes.menuButtonHidden)}
                >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDesktopDrawerToggle}
                className={clsx(classes.menuButton)}
                >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {title}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit"
                        onClick={openAccountMenu}>
                <Icon>account_circle</Icon>
            </IconButton>
            <Menu id='account_menu'
                  anchorEl={accountAnchorEl}
                  keepMounted
                  open={Boolean(accountAnchorEl)}
                  onClose={closeAccountMenu}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            classes={{
              paper: clsx(classes.drawerPaper, !mobileOpen && classes.drawerPaperClose),
            }}
            open={mobileOpen}
            onClose={handleDrawerToggle}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !desktopOpen && classes.drawerPaperClose),
            }}
            open={true}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Component {...matchProps}/>
          </Container>
        </main>
      </div>
  
    )} />
  );
}

export default withRouter(DefaultLayout);