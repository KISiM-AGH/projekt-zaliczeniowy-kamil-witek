import { Card, TextField, Button } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const { email, password, repeatPassword } = data;
        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, repeatPassword })
        })
            .then((r) => r.json())
            .then((res) => {
                console.log(res);
                setError("error", { message: "www" });
                //  navigate("/login")
            });
    };
    return (
        <Card sx={{ padding: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field }) => <TextField {...field} fullWidth variant="filled" label="email" />}
                />
                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField {...field} fullWidth variant="filled" label="password" type="password" />
                    )}
                />
                <Controller
                    control={control}
                    name="repeatPassword"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField {...field} fullWidth variant="filled" label="repeat-password" type="password" />
                    )}
                />
                <p>{errors.error?.message}</p>
                <Button variant="outlined" type="submit">
                    Sign in
                </Button>
            </form>
        </Card>
    );
};
