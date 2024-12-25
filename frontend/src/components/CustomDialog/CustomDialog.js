import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Image from "../../assets/images/ivana-square.jpg";

const CustomDialog = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  customImage = null,
}) => {
  const renderImage = () =>
    confirmText === "Delete" && (
      <Box sx={{ margin: "auto", mt: 4, mb: 4 }}>
        <Image
          width={150}
          height={150}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
          src={customImage || "/images/modal/deleteModal.png"}
          alt="Dialog Icon"
        />
      </Box>
    );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { p: 1, maxWidth: "450px", width: "100%" } }}
    >
      {renderImage()}
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button onClick={onClose} variant="outlined" fullWidth>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          fullWidth
          sx={{ background: confirmText === "Delete" ? "#F00000" : undefined }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Define PropTypes for the component
CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  customImage: PropTypes.string,
};

export default CustomDialog;
