import { Box, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Save } from "@mui/icons-material";
import { Todo } from "../components/Todo.jsx";
import { Input } from "../components/StyledComponents.jsx";
import { useAtom } from "jotai";
import { todosAtom, tokenAtom } from "../globalState";
import { useNavigate } from "react-router-dom";
export const Todos = () => {
    const [newItem, setNewItem] = useState("");
    const [todos, setTodos] = useAtom(todosAtom);
    const [token] = useAtom(tokenAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return navigate("/login");
        }
        fetch("http://localhost:3000/todos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
            .then((r) => r.json())
            .then((res) => {
                setTodos(res);
            });
    }, []);

    const setValueNew = (e) => {
        setNewItem(e.target.value);
    };
    const addTodo = () => {
        fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({ text: newItem })
        })
            .then((r) => r.json())
            .then((res) => {
                setTodos([...todos, res[0]]);
                setNewItem("");
            });
    };

    const deleteTodo = (index) => {
        fetch(`http://localhost:3000/todo/${index}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
            .then((r) => r.json())
            .then((res) => {
                console.log(res);
                setTodos(todos.filter((todo) => todo.id !== index));
            });
    };

    const updateTodo = (index, newValue) => {
        fetch(`http://localhost:3000/todo/${index}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({ text: newValue })
        })
            .then((r) => r.json())
            .then((res) => {
                setTodos(todos.map((todo) => (res.id === todo.id ? res : todo)));
            });
    };

    return (
        <Box
            style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red"
            }}
        >
            <Box sx={{ width: "500px" }}>
                <Card
                    sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Input value={newItem} onChange={setValueNew} />
                    <Box sx={{ display: "flex", width: "80px", justifyContent: "center" }}>
                        <IconButton onClick={addTodo} sx={{ padding: "15px" }}>
                            <Save />
                        </IconButton>
                    </Box>
                </Card>
                {todos.map((item) => (
                    <Todo key={item.id} item={item} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                ))}
            </Box>
        </Box>
    );
};
