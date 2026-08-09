"use client";

import React, { useState } from "react";

import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

import { useRouter } from "next/navigation";

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthLogin = ({ title, subtext }: loginType) => {

  const router = useRouter();

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [recordarme, setRecordarme] = useState(true);

  const [error, setError] = useState("");

  const iniciarSesion = (e: React.FormEvent) => {

    e.preventDefault();

    setError("");

    if (usuario.trim() === "" || password.trim() === "") {

      setError("Ingrese usuario y contraseña.");

      return;

    }

    if (
      usuario === "admin" &&
      password === "123456"
    ) {

      if (recordarme) {

        localStorage.setItem(
          "sesionGym",
          "true"
        );

      } else {

        sessionStorage.setItem(
          "sesionGym",
          "true"
        );

      }

      router.push("/");

      return;

    }

    setError("Usuario o contraseña incorrectos.");

  };

  return (

    <>

      {title ? (
        <Typography
          fontWeight="700"
          variant="h3"
          mb={1}
        >
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box
        component="form"
        onSubmit={iniciarSesion}
      >

        <Stack>

          {/* Usuario */}

          <Box>

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Usuario
            </Typography>

            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={usuario}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsuario(e.target.value)
              }
            />

          </Box>

          {/* Contraseña */}

          <Box mt="25px">

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Contraseña
            </Typography>

            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

          </Box>

          {/* Recordarme */}

          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >

            <FormGroup>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordarme}
                    onChange={(e) =>
                      setRecordarme(e.target.checked)
                    }
                  />
                }
                label="Recordarme"
              />

            </FormGroup>

          </Stack>

          {/* Mensaje de error */}

          {error && (

            <Typography
              color="error"
              variant="body2"
              mb={2}
            >
              {error}
            </Typography>

          )}

        </Stack>

        {/* Botón */}

        <Box>

          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Iniciar sesión
          </Button>

        </Box>

      </Box>

    </>

  );

};

export default AuthLogin;