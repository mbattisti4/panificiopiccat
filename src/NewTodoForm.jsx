import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, placeOrder } from "./thunks";
import Button from "@mui/material/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TodoListItem from "./TodoListItem";

import Grid from "@mui/material/Grid2";
import { getCompletedTodos, getTotalAmount } from "./selectors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function NewTodoForm() {
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const orderedProducts = useSelector(getCompletedTodos);
  const totalAmount = useSelector(getTotalAmount);

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Riepilogo
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="Article table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell>Articolo</TableCell>
                  <TableCell align="right">Prezzo</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderedProducts.map((todo, index) => (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    rowNumber={index}
                  ></TodoListItem>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            onClick={() => {
              dispatch(placeOrder());
              setOpen(false);
            }}
          >
            Procedi - Totale: {totalAmount}€
          </Button>
        </Sheet>
      </Modal>

      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          //dispatch(placeOrder());
          setOpen(true);
        }}
      >
        Genera ordine - Totale: {totalAmount}€
      </Button>
    </div>
  );
}
