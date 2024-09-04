/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useEffect, useMemo } from "react";

import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
// import { TFunction } from 'i18next';
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";

import { Home as HomeIcon } from "../../icons/home";
// import { Selector as SelectorIcon } from "../../icons/selector";
import Logo from "../../assets/logo.jpg";
import { DashboardSidebarSection } from "../dashboard/dashboard-sidebar-section";
import LoginIcon from "@mui/icons-material/Login";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import DownloadIcon from "@mui/icons-material/Download";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import SecurityIcon from "@mui/icons-material/Security";

const getSections = (_t) => [
  {
    title: "", //t("General"),
    items: [
      {
        title: "Dashboard",
        path: `${import.meta.env.VITE_SUBFOLDER_NAME}/home`,
        icon: <HomeIcon fontSize="small" />,
        external: false,

        type: "outer",
        windowopen: true,
      },
    ],
  },

  {
    title: "Application Links",
    items: [
      {
        title: _t("New Candidate Application"),
        path: `${import.meta.env.VITE_SUBFOLDER_NAME}/registration`,
        icon: <HowToRegIcon fontSize="small" />,
        external: false,
        type: "outer",
        windowopen: true,
      },
    ],
  },
  {
    title: "Login Links",
    items: [
      {
        title: "Admin Login",
        path: `${import.meta.env.VITE_ADMIN_BASE_URL}/rologin`,
        icon: <AddToHomeScreenIcon fontSize="small" />,
        external: false,
        status: -1,
        type: "outer",
      },
      {
        title: "Member Login",
        path: `${import.meta.env.VITE_ADMIN_BASE_URL}/rologin`,
        icon: <AddToHomeScreenIcon fontSize="small" />,
        external: false,
        status: -1,
        type: "outer",
      },
    ],
  },
];

export const MainSidebar = (props) => {
  const { onClose, open } = props;
  const router = useLocation();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  // const organizationsRef = useRef<HTMLButtonElement | null>(null);
  // const [openOrganizationsPopover, setOpenOrganizationsPopover] =
  //   useState<boolean>(false);

  const handlePathChange = () => {
    if (router.state == "loading") {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  // const handleOpenOrganizationsPopover = (): void => {
  //   setOpenOrganizationsPopover(true);
  // };

  // const handleCloseOrganizationsPopover = (): void => {
  //   setOpenOrganizationsPopover(false);
  // };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ m: 2 }} justifyContent={"center"} alignItems={"center"}>
            <Link to={`/${import.meta.env.VITE_SUBFOLDER_NAME}/home`}>
              <img
                src={Logo}
                // src={''}
                alt="logo"
                style={{
                  marginLeft: "21%",
                  height: "100",
                  width: "53%",
                  maxWidth: "50%",
                  alignSelf: "center",
                }}
              />
            </Link>
          </Box>
          {/* <Box sx={{ px: 2 }}>
            <Box
              // onClick={handleOpenOrganizationsPopover}
              ref={organizationsRef}
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Company
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  {t("Your tier")} : Name
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box> */}
        </div>
        <Divider
          sx={{
            borderColor: "divider", // dark divider
            // my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {sections.map((section, index) => (
            <DashboardSidebarSection
              key={index}
              path={router.pathname}
              sx={{
                mt: 2,
                "& + &": {
                  mt: 2,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider
          sx={{
            borderColor: "divider", // dark divider
          }}
        />
      </Box>
      {/* <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <Link to="/">
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </Link>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Acme Inc
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t("Your tier")} : Premium
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.pathname}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t("Need Help?")}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t("Check our docs")}
            </Typography>
            <Link to="/docs/welcome">
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Documentation")}
              </Button>
            </Link>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      /> */}
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "background.sideBar",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 1,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "background.sideBar",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
