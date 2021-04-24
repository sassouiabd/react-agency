import Copyright from "../../components/copyright/copyright.component";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

//Redux
import {
  setEmail_act,
  setIsSignIn_act,
  setPassword_act,
} from "../../redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";

// Styles
import signIn_S from "./sign-in.styles";
import { selectEmail, selectPassword } from "../../redux/user/user.selectors";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const S = signIn_S();
  const dispatch = useDispatch();
  let history = useHistory();

  const signInEmail = useSelector(selectEmail);
  const signInPassword = useSelector(selectPassword);

  const onEmailChange = e => {
    dispatch(setEmail_act(e.target.value));
  };

  const onPasswordChange = e => {
    dispatch(setPassword_act(e.target.value));
  };

  const onSubmitSiginIn = e => {
    e.preventDefault();
    dispatch(setIsSignIn_act(true));
    history.push("/agency-collection");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={S.paper}>
        <Avatar className={S.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={S.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={onEmailChange}
            defaultValue={signInEmail}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={onPasswordChange}
            defaultValue={signInPassword}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={S.submit}
            onClick={onSubmitSiginIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
