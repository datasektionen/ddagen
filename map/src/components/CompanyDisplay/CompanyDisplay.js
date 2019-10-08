import React from "react";
import "./CompanyDisplay.css";
import { PropTypes } from "prop-types";
import companyType from "types/company";

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
    width: "auto",
    maxWidth: "100px",
    maxHeight: "60px",
    minWidth: "40px",
  },
  cardHeaderTitle: {
    fontSize: "16px",
    display: "flex",
    flexWrap: "wrap",
  },
  cardHeaderRoot: {
    flexDirection: "row-reverse",
    height: "70px",
    padding: "10px"
  }
}));

// const avatar = () => {return <Avatar>Logo</Avatar>}
function avatar(inputProps) {
  const { classes, srcImg } = inputProps;
  return <img src={srcImg} alt="logo" className={classes.imgLogo} />;
}

const CompanyDisplay = ({ company, selected, onMouseDown }) => {
  const classes = useStyles();

  const avatarInputProps = {
    classes: {
      imgLogo: classes.imgLogo
    },
    srcImg: company.img.default
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
