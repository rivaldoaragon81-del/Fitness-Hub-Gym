import Link from "next/link";
import { styled, Typography } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "200px",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          color: "primary.main",
          whiteSpace: "nowrap",
        }}
      >
        Fitness Hub Gym
      </Typography>
    </LinkStyled>
  );
};

export default Logo;