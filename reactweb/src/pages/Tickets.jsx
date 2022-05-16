import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Pagination, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import usePagination from "../Pagination";
import { http } from "../config/http";

// Generate Order Data
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Ticket({ getLists }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [editId, seteditId] = useState(null);
  const rows = [];

  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(ticketList.length / PER_PAGE);
  const _DATA = usePagination(ticketList, PER_PAGE);
  let [pageCount, setPageCount] = useState(0);
  const [userData, setUserData] = useState([]);

  const handleChange = (e, p) => {
    console.log("p", p);
    setPageCount((p - 1) * 10);
    console.log("pagecount", pageCount);
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    try {
      setUserData(JSON.parse(localStorage.getItem("user")));
      getLists().then((res) => {
        setTicketList(res);
      });
    } catch (error) {}
  }, []);

  const [ticketData, setTicketData] = useState([]);
  const editTicket = async (id) => {
    const response = await http.put(`/ticket/${id}`);
    console.log("res", response);
    setTicketData(response.data.tickets);
    seteditId(id);
    setModalOpen(true);
  };
  const deleteTicket = async (id) => {
    const response = await http.delete(`/ticket/${id}`);
    getLists().then((res) => {
      setTicketList(res);
    });
  };
  const formik = useFormik({
    initialValues: {
      title: ticketData?.Title,
      description: ticketData?.Description,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (!editId) {
        const response = await http.post("ticket/add", values);
      } else {
        const response = await http.put(`ticket/${editId}`, values);
        seteditId(null);
      }
      setTicketData([]);
      setModalOpen(false);
      getLists().then((res) => {
        setTicketList(res);
      });
      // const response =await http.post("/user/Signup",values)
      // console.log(response.data);
    },
  });
  return (
    <React.Fragment>
      {console.log(ticketList)}
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Tickets
        <Button
          onClick={() => {
            setModalOpen(true);
            setTicketData([]);
            seteditId(null);
          }}
        >
          Raise a Ticket
        </Button>
      </Typography>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setTicketData([]);
          seteditId(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            hypertext={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            hypertext={formik.touched.description && formik.errors.description}
          />

          <Button type="submit">{editId ? "Edit Ticket" : "Add Ticket"}</Button>
        </Box>
      </Modal>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_DATA.currentData().map((row) => (
            <TableRow key={row._id}>
              <TableCell>{(pageCount = pageCount + 1)}</TableCell>
              <TableCell>{row.Title}</TableCell>
              <TableCell>{row.Description}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.User_Name}</TableCell>
              <TableCell>
                {userData.firstName === row.User_Name ? (
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      editTicket(row._id);
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="edit" disabled color="primary">
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
              {userData.firstName === row.User_Name ? (
              <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deleteTicket(row._id);
                  }}
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>)
                :
                <IconButton
                  aria-label="delete"
                  disabled
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
              }
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
      <br></br>
      <Box>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </React.Fragment>
  );
}
