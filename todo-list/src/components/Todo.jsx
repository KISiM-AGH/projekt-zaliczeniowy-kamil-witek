import {Box, Card, IconButton, styled} from "@mui/material";
import {Delete, Edit, Save} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {Input, Text} from "./StyledComponents.jsx";

export const Todo = ({item, updateTodo, deleteTodo}) => {
    const [isEdit, setIsEdit] = useState(true);
    const [newText, setNewText] = useState("");

    useEffect(() => {
        setNewText(item.text)
    }, [item])
    const changeEdit = () => {
        setIsEdit(!isEdit);
    }

    const onDelete = () => {
        deleteTodo(item.id)
    }

    const onUpdate = () => {
        updateTodo(item.id, newText)
        setIsEdit(!isEdit);
    }

    const setValueNew = (e) => {
        setNewText(e.target.value)
    }

    return (
        <Container>
            {isEdit ? <Text noWrap={true}>{item.text}</Text> : <Input value={newText} onChange={setValueNew}/>}
            <Box>
                {!isEdit ? (
                    <IconButton onClick={onUpdate}>
                        <Save/>
                    </IconButton>
                ) : null}
                <IconButton onClick={changeEdit}>
                    <Edit/>
                </IconButton>
                <IconButton onClick={onDelete}>
                    <Delete/>
                </IconButton>
            </Box>
        </Container>
    )
}

const Container = styled(Card)({
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
})
