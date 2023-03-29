import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { setAlertErtor, setAlertErtorlogin } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertError() {
  const errorData = useSelector((state) => state?.auth?.errorData);
  const [open, setOpen] = React.useState(errorData);
  const dispatch = useDispatch();
  const handleClickOpen = () => {};

  React.useEffect(() => {
    setOpen(true);
  }, [errorData]);
  const handleClose = () => {
    setOpen(false);
    dispatch(setAlertErtor());
    dispatch(setAlertErtorlogin());
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Gillu Chat service ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please make sure all fields are filled in correctly & password
            minimum 6 characters <br></br>
            कृपया सुनिश्चित करें कि सभी फ़ील्ड सही ढंग से भरे गए हैं और पासवर्ड
            न्यूनतम 6 वर्ण हैं
            {errorData}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ margin: "auto" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
