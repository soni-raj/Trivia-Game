import { CircularProgress, Backdrop } from "@mui/material";

const Loader = ({ open, message }) => {
    return (
        <Backdrop open={open} style={{ zIndex: 9999, color: "#fff" }}>
            <CircularProgress color="inherit" />
            <div style={{ marginLeft: "10px" }}>{message}</div>
        </Backdrop>
    )
};

export default Loader;

