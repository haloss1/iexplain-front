import {
  Card,
  Avatar,
  CardHeader,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Fab,
  useScrollTrigger,
  makeStyles,
  createStyles,
  Theme,
  Zoom,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import getUsers from "functions/getUsers";
import { useInfiniteQuery, useQuery } from "react-query";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import getUserInfo from "functions/getUserInfo";

interface userProps {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Styled Components start

const GridContainer = styled.div`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const StatusLabel = styled.div`
  text-align: center;
  font-size: 1.7rem;
  margin: 1rem 0;
  color: grey;
`;

const StyledCard = styled(Card)`
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const AccountButton = styled(Button)`
  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    line-height: normal;
    text-transform: none;
    color: white;
    letter-spacing: normal;
  }
`;

// Styled Components end

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const Users = ({ auth }: any) => {
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const anchorRef = useRef<HTMLButtonElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("users", getUsers, {
    getNextPageParam: (lastPage) =>
      lastPage.total_pages === lastPage.page ? undefined : lastPage.page + 1,
  });

  const { data: userInfo } = useQuery("user-info", getUserInfo);

  const ScrollTop = (props: { children: any }) => {
    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector("#back-to-top-anchor");

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  };

  const handleToggle = () => {
    setOpenAccountMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenAccountMenu(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenAccountMenu(false);
    }
  }

  // return focus to the button when we transitioned from !openAccountMenu -> openAccountMenu
  const prevOpen = useRef(openAccountMenu);
  useEffect(() => {
    if (prevOpen.current === true && openAccountMenu === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openAccountMenu;
  }, [openAccountMenu]);

  const handleNotificationClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotification(false);
  };

  return (
    <div>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6">User list</Typography>

          <div>
            {userInfo ? (
              <AccountButton ref={anchorRef} onClick={handleToggle}>
                <Avatar
                  src={userInfo.data.avatar}
                  alt={`${userInfo.data.first_name} ${userInfo.data.last_name}`}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span>{`${userInfo.data.first_name} ${userInfo.data.last_name}`}</span>
                  <span style={{ fontSize: "0.8rem", color: "lightgrey" }}>
                    {userInfo.data.email}
                  </span>
                </div>
                <ArrowDropDownIcon />
              </AccountButton>
            ) : (
              ""
            )}

            <Popper
              open={openAccountMenu}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openAccountMenu}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          component={Link}
                          to="/"
                          onClick={() => {
                            setOpenAccountMenu(false);
                            setOpenNotification(true);
                            localStorage.removeItem("auth-token");
                            localStorage.removeItem("user-id");
                            auth.setAuthState(false);
                          }}
                        >
                          Log out
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </StyledToolbar>
      </AppBar>
      <div id="back-to-top-anchor" />
      {status === "loading" ? (
        <StatusLabel>Loading...</StatusLabel>
      ) : status === "error" ? (
        <StatusLabel>Error: {(error as Error)?.message}</StatusLabel>
      ) : (
        <>
          <GridContainer>
            {data
              ? data.pages.map((page) =>
                  page.data.map((user: userProps, i: number) => (
                    <StyledCard key={i}>
                      <CardHeader
                        avatar={
                          <Avatar
                            alt={`${user.first_name} ${user.last_name}`}
                            src={user.avatar}
                          />
                        }
                        title={`${user.first_name} ${user.last_name}`}
                        subheader={user.email}
                      />
                    </StyledCard>
                  ))
                )
              : ""}
          </GridContainer>
          <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
          </div>

          <ScrollTop>
            <Fab color="secondary" size="small">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
          <Snackbar
            open={openNotification}
            autoHideDuration={6000}
            onClose={handleNotificationClose}
          >
            <Alert onClose={handleNotificationClose} severity="warning">
              Session closed, see you soon!
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default Users;
