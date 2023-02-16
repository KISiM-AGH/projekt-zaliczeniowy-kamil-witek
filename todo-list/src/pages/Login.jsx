import { Card, Button, TextField } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailAtom, tokenAtom } from "../globalState";

export const Login = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm();
    const [email, setEmail] = useAtom(emailAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const onSubmit = (data) => {
        const { email, password } = data;
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((r) => r.json())
            .then((res) => {
                setToken(res.token);
                setEmail(res.email);
                navigate("/todos");
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
                <Button variant="outlined" type="submit">
                    Sign in
                </Button>
            </form>
        </Card>
    );
};
