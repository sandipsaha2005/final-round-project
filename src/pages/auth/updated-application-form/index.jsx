import {
  Box,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EastIcon from "@mui/icons-material/East";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Title from "@/components/common/title";
import { useFreshCandiPickUnpickMutation } from "@/redux/slices/eVerification";

import { useGetUpdateFormMutation } from "@/redux/slices/trackForm";

import { AuthGuard } from "@/guards/auth-guard";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component() {
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [getData, { data, isSuccess, isLoading }] = useGetUpdateFormMutation();
  const [
    doPickUnpick,
    {
      data: pickUnPickData,
      isSuccess: isPickUnpickSuccess,
      isError: isPickUnpickError,
      error: pickunpickError,
    },
  ] = useFreshCandiPickUnpickMutation();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (pickUnPickData && isPickUnpickSuccess) {
      toast.success(pickUnPickData?.message);
      getData({ flagString: "pconf" });
      console.log(pickUnPickData);
      if (pickUnPickData?.data?.isFormLock == 1) {
        navigate(
          `/${import.meta.env.VITE_SUBFOLDER_NAME}/e-verification/fresh/home/${
            pickUnPickData?.data?.candidateId
          }`
        );
      }
    }
  }, [pickUnPickData, isPickUnpickSuccess]);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "user_id",
      headerName: "Candidate ID",
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => <>{row.user_id}</>,
      valueGetter: ({ row }) => import.meta.env.VITE_PREFIX + row.user_id,
    },
    {
      field: "full_name",
      headerName: "Full Name",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => <>{row.full_name}</>,
    },
    {
      field: "dis_name",
      headerName: "District",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => <>{row.dis_name}</>,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      align: "left",
      headerAlign: "left",
      minWidth: 110,
      flex: 1,
      renderCell: ({ row }) => <>{row.mobile}</>,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 110,
      flex: 1,
      renderCell: ({ row }) => <>{row.email}</>,
    },

    {
      field: "candidate_fill_status",
      headerName: "Application Step",
      minWidth: 110,
      flex: 1,
      renderCell: ({ row }) => <>{row.candidate_fill_status}</>,
    },

    {
      field: "payment_status",
      headerName: "Payment Status",
      minWidth: 110,
      flex: 1,
      renderCell: ({ row }) => (
        <div style={{ textAlign: "center" }}>
          {row.payment_status === "Y" ? "YES" : "NO"}
        </div>
      ),
    },
    {
      field: "track_region",
      headerName: "Status Of candidate",
      minWidth: 110,
      flex: 1,
      renderCell: ({ row }) => {
        let selectValue = "select status of candidate";
        if (row.track_region === 1) {
          selectValue = "Interested - Waiting for required documents";
        } else if (row.track_region === 2) {
          selectValue = "Interested - Waiting for the SSC Result";
        } else if (row.track_region === 3) {
          selectValue = "Not Interested - Aspiring for XI Admission";
        } else if (row.track_region === 4) {
          selectValue = "Not Interested - Aspiring for ITI Admission";
        } else if (row.track_region === 5) {
          selectValue =
            "Not Interested - Aspiring for other than XI/ITI Admission";
        } else if (row.track_region === 6) {
          selectValue = "Duplicate Registration";
        } else if (row.track_region === 7) {
          selectValue = "Dummy / Test Application";
        } else if (row.track_region === 8) {
          selectValue = "Call Not Received";
        } else if (row.track_region === 9) {
          selectValue = "Not Eligible for Admission";
        }
        return (
          <select
            value={selectValue}
            onChange={(e) => handleSelectChange(e, row)}
          >
            <option value="Interested - Waiting for required documents">
              Interested - Waiting for required documents
            </option>
            <option value="Interested - Waiting for the SSC Result">
              Interested - Waiting for the SSC Result
            </option>
            <option value="Not Interested - Aspiring for XI Admission">
              Not Interested - Aspiring for XI Admission
            </option>
            <option value="Not Interested - Aspiring for ITI Admission">
              Not Interested - Aspiring for ITI Admission
            </option>
            <option value="Not Interested - Aspiring for other than XI/ITI Admission">
              Not Interested - Aspiring for other than XI/ITI Admission
            </option>
            <option value="Duplicate Registration">
              Duplicate Registration
            </option>
            <option value="Dummy / Test Application">
              Dummy / Test Application
            </option>
            <option value="Call Not Received">Call Not Received</option>
            <option value="Not Eligible for Admission">
              Not Eligible for Admission
            </option>
          </select>
        );
      },
    },

    // {
    //     field: 'action ',
    //     headerName: 'Action',
    //     minWidth: 150,

    //     flex: 1,

    //     renderCell: ({ row }) => (
    //         <>
    //             {row.lock_form == 1 ? (
    //                 <Button
    //                     fullWidth
    //                     variant='contained'
    //                     color='error'
    //                     disableElevation
    //                     onClick={() => {
    //                         doPickUnpick({ candidateId: row.user_id });
    //                     }}
    //                 >
    //                     <Typography sx={{ fontSize: 12 }}>Unpick</Typography>
    //                 </Button>
    //             ) : (
    //                 <Button
    //                     fullWidth
    //                     variant='contained'
    //                     disableElevation
    //                     onClick={() => {
    //                         doPickUnpick({ candidateId: row.user_id });
    //                     }}
    //                 >
    //                     <Typography sx={{ fontSize: 12 }}>Verify</Typography>
    //                 </Button>
    //             )}
    //         </>
    //     ),
    //     // valueGetter: ({ row }) => import.meta.env.VITE_PREFIX + row.user_id,
    // },
  ];

  useEffect(() => {
    if (isSuccess && data?.data?.length > 0) {
      setrows(data?.data);
    }
  }, [data, isSuccess]);

  return (
    <AuthGuard>
      <Title
        title={`TRACKING OF THE STATUS OF INCOMPLETE APPLICATION FORMS FOR Post Graduate Professional Technical Course in Architecture [ M.Arch] Admission - ${
          import.meta.env.VITE_CURRENT_YEAR
        }`}
      />
      <Box
        sx={{
          p: 1.5,
          borderRadius: "10px",
          border: "1px solid #dbd9d9",
          mt: 2,
          height: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.user_id}
          loading={isLoading}
          disableRowSelectionOnClick
          // filterMode='server'
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          // paginationMode='server'
        />
      </Box>
    </AuthGuard>
  );
}
Component.displayName = "CreateFc";
