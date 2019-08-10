import React from "react";
import "./CompanyDisplay.css";
import { PropTypes } from "prop-types";
import companyType from "types/company";
import tgLogo from "assets/company-logos/tg-toptracer-logo-vertical-blue - Ludvig Jansson.svg";

import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1)
  },
  imgLogo: {
    width: "50px",
    height: "50px"
  },
  cardHeaderTitle: {
    fontSize: "16px",
    display: "flex",
    flexWrap: "wrap"
  },
  cardHeaderRoot: {
    flexDirection: "row-reverse"
  }
}));

// const avatar = () => {return <Avatar>Logo</Avatar>}
function avatar(inputProps) {
  const { classes } = inputProps;
  return <img src={tgLogo} alt="logo" className={classes.imgLogo} />;
}

const CompanyDisplay = ({ company, selected, onMouseDown }) => {
  const classes = useStyles();

  const avatarInputProps = {
    classes: {
      imgLogo: classes.imgLogo
    }
  };

  const cardHeaderClasses = {
    root: classes.cardHeaderRoot,
    title: classes.cardHeaderTitle
  };

  return (
    <Card
      raised
      onMouseDown={onMouseDown}
      className={classes.card}
      // className={`company-list-item animated-transition ${
      //   selected ? "selected" : ""
      // }`}
    >
      <CardHeader
        avatar={avatar(avatarInputProps)}
        title={company.name}
        classes={cardHeaderClasses}
      />
      <Collapse in={selected}>
        <CardContent>
          <Typography>{company.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

CompanyDisplay.propTypes = {
  company: companyType.isRequired,
  selected: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired
};

export default CompanyDisplay;
