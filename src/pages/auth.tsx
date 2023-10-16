import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@mui/material";
import { TextField } from "@/components";
import { useContext } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "@/context/auth.context";
const Auth = () => {
  const [auth, setAuth] = useState<"signIn" | "signUp">("signIn");
  const { error, isLoading, signIn, signUp, logOut } = useContext(AuthContext);

  const onSubmit = async (dataForm: { email: string; password: string }) => {
    if (auth == "signUp") {
      signUp(dataForm.email, dataForm.password);
    } else {
      signIn(dataForm.email, dataForm.password);
    }
  };

  const validation = Yup.object({
    email: Yup.string()
      .email("Enter valid string")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Min 5 character")
      .required("Password is required"),
  });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="You should register for  using this app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/site-logo.svg" type="image/x-icon" />
      </Head>

      <div className="bg-black absolute h-full w-full md:bg-transparent">
        <Image
          src={"https://rb.gy/zcbie"}
          className="opacity-50 -z-10"
          fill
          alt="main-image"
        />
      </div>

      <div className="authBox rounded-lg  py-[10px] w-[350px] bg-black/70 md:w-[450px] lg:w-[600px] px-[15px] md:py-[15px] md:px-[20px]">
        <div className="flex flex-col ">
          <div className="flex justify-center mb-4 md:mb-6 lg:mb-9">
            <Image
              src="/site-logo.svg"
              alt="site-logo-imgage"
              width={70}
              height={70}
            />
          </div>
          <h2 className="text-[18px] md:text-[25px] lg:text-[30px] font-bold mb-[5px] md:mb-[8px]">
            {auth == "signIn" ? "Sign In" : "Sign Up"}
          </h2>
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={validation}
          >
            <Form>
              <div className="flex flex-col gap-[5px] md:gap-[7px] lg:gap-[15px]">
                <TextField placeholder="Email" type="email" name="email" />
                <TextField
                  placeholder="Password"
                  type="password"
                  name="password"
                />
              </div>
              <div className="mt-[5px] w-full md:w-[120px] md:mt-[8px]">
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  className="bg-green-400 w-full text-white font-semibold"
                  sx={{ fontWeight: "600" }}
                >
                  {auth == "signIn" ? "Sign In" : "Sign Up"}
                </Button>
              </div>
              <div className="mt-[5px] md:mt-[10px]">
                {auth == "signIn" ? (
                  <>
                    Not yet account?
                    <Button
                      sx={{ color: "white" }}
                      className="hover:underline font-semibold"
                      onClick={() => setAuth("signUp")}
                    >
                      Sign Up Now
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-[3px] md:gap-[5px] ">
                    <p className="text-gray-200"> Already have account ?</p>
                    <Button
                      sx={{ color: "white" }}
                      className="hover:underline font-semibold"
                      onClick={() => setAuth("signIn")}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Auth;
