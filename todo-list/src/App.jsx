import * as React from "react";
import { Login } from "./pages/Login";

import { Home } from "./pages/Home";
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Todos } from "./pages/Todos";
import { useAtom } from "jotai";
import { emailAtom, tokenAtom } from "./globalState";

export default function App() {
    const navItems = ["login", "register"];
    const navigate = useNavigate();
    const [token, setToken] = useAtom(tokenAtom);
    const [_, setEmail] = useAtom(emailAtom);
    const logout = () => {
        setEmail("");
        setToken("");
        navigate("/login");
    };
    return (
        <Box
            sx={{
                display: "flex",
                minWidth: "320px",
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="a"
                        sx={{ flexGrow: 1, display: "block", color: "white" }}
                        href="/"
                    >
                        Todo List App
                    </Typography>

                    {!token && (
                        <Box sx={{ display: "block" }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: "#fff" }} href={item}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    )}
                    {!!token && (
                        <Box sx={{ display: "block" }}>
                            <Button key={"logout"} sx={{ color: "#fff" }} onClick={logout}>
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Box>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/todos" element={<Todos />} />
                </Routes>
            </Box>
        </Box>
    );
}
