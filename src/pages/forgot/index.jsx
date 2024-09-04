import {
  Box,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
  Grid,
  InputAdornment,
} from "@mui/material";
// import { GuestGuard } from '../../components/authentication/guest-guard';
import { ZodError } from "zod";
import Logo from "../../assets/logo.jpeg";
import forgot from "../../assets/forgot.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/redux/slices/auth";
import { forgotPassword } from "@/validation/auth";
import { useSelector, useDispatch } from "react-redux";
import { GuestGuard } from "@/guards/guest-guard";
import { LoadingButton } from "@mui/lab";

import { ToastContainer, toast } from "react-toastify";

import { setAuthUserState } from "../../redux/slices/features-slice/user";

// import { useLoaderData } from "react-router-dom";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component() {
  // const data = useLoaderData() as string;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    doForgotPassword,
    { isLoading, isSuccess, isError, data: loginData, error },
  ] = useForgotPasswordMutation();

  const [state, setState] = useState({
    userId: import.meta.env.VITE_PREFIX,
    userIdErr: false,
    userIdErrMsg: "",
    phone: "",
    phoneErr: false,
    phoneErrMsg: "",
    // phoneErrMsg:
    //     'All communications will be done on this number such as registration OTP,login OTP etc. Make sure this mobile number is authenticated and working.',
  });

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  const validate = (_e) => {
    _e.preventDefault();
    try {
      forgotPassword.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== "") {
              const field = error.path[0] + "Err";

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: error.message,
              }));
            }
          });
      }
      return;
    }

    doForgotPassword({
      userId: state.userId,
      phone: state.phone,
    });
    /* api call */
  };

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && loginData) {
      if (loginData?.data?.token) {
        localStorage.setItem("token", loginData.data.token);
        toast.success(loginData.message);
        navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/forgot-otp-verify`);
      }

      // navigate("/dashboard/carrier");
    }
  }, [isSuccess, loginData]);

  return (
    <GuestGuard>
      <Box
        component="main"
        height={"80vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // sx={{
        // 	backgroundImage:
        // 		'radial-gradient( circle 1224px at 10.6% 8.8%,  rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2% );',
        // }}
      >
        <Container maxWidth="md">
          <Card
            elevation={15}
            sx={{
              p: 1.5,
              mt: 1,
              borderRadius: "10px",
              border: "1px solid #dbd9d9",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4">Forgot Password</Typography>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <form
                    noValidate
                    onSubmit={validate}
                    //   {...props}
                  >
                    <TextField
                      helperText={state.userIdErrMsg}
                      error={state.userIdErr}
                      autoFocus
                      fullWidth
                      margin="normal"
                      name="userId"
                      onChange={(e) => {
                        if (e.target.value?.length <= 11) {
                          handelChange(e);
                        }
                      }}
                      type="text"
                      value={state.userId}
                      size="small"
                      label="Application ID"
                    />
                    {/* <TextField
											helperText={state.userIdErrMsg}
											error={state.userIdErr}
											// error={Boolean(formik.touched.password && formik.errors.password)}
											fullWidth
											// helperText={formik.touched.password && formik.errors.password}
											label='Application ID'
											margin='normal'
											name='userId'
											// onBlur={formik.handleBlur}
											onChange={handelChange}
											type='userId'
											size='small'
											value={state.userId}
											InputProps={{
												startAdornment: (
													<InputAdornment
														position='start'
														style={{
															marginRight: 0,
															color: '#000 !important',
														}}
													>
														<Typography style={{ color: '#000' }}>
															MAR24
														</Typography>
													</InputAdornment>
												),
											}}
										/> */}
                    <TextField
                      helperText={state.phoneErrMsg}
                      error={state.phoneErr}
                      // error={Boolean(formik.touched.password && formik.errors.password)}
                      fullWidth
                      // helperText={formik.touched.password && formik.errors.password}
                      label="Mobile No"
                      margin="normal"
                      name="phone"
                      // onBlur={formik.handleBlur}
                      onChange={handelChange}
                      // onBlur={checkPhoneNumber}
                      type="number"
                      value={state.phone}
                      size="small"
                    />

                    <Box
                      sx={{ mt: 2 }}
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"flex-start"}
                      flexDirection={"column"}
                    >
                      <LoadingButton
                        //   disabled={formik.isSubmitting}
                        fullWidth
                        sx={{ width: "50%", alignSelf: "center" }}
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        size="small"
                      >
                        Submit
                      </LoadingButton>
                      <Box sx={{ mt: 2 }} display={"flex"}>
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          component={"p"}
                        >
                          <Link
                            to={`/${import.meta.env.VITE_SUBFOLDER_NAME}/login`}
                          >
                            Back To Login?
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={forgot}
                    alt="forgot"
                    style={{
                      width: "80%",
                      objectFit: "contain", // or any other style you prefer
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </GuestGuard>
  );
}

Component.displayName = "LoginPage";
