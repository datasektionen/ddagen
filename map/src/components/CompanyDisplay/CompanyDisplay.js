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
    maxWidth: "130px",
    maxHeight: "60px",
    minWidth: "90px",
    minHeight: "30px",
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

function Opportunities(props) {
  if (props.opportunities) {
    var opportunities = props.opportunities.split(",") 
    return (
      <ul>
        {opportunities.map(txt => {
          return (
            <li>{ txt }</li>
          );
        })}
      </ul>
    )
  } else {
    return ""
  }
}

const CompanyDisplay = React.forwardRef(({ company, selected, onMouseDown }, ref) => {
  const classes = useStyles();

  const avatarInputProps = {
    classes: {
      imgLogo: classes.imgLogo
    },
    srcImg: "https://ddagen.se/static/img/companies2022/" + company.img.default
  };

  const cardHeaderClasses = {
    root: classes.cardHeaderRoot,
    title: classes.cardHeaderTitle
  };

  return (
    <Card
      ref={ref}
      raised
      onMouseDown={onMouseDown}
      className={classes.card + " " + (selected ? "selected" : "") }
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
        <CardContent >
          <Typography>
            {company.description}
            <br/><br/>
            <span className="bold">Webbsida:</span> <a href={company.website} target="_blank">{company.website}</a>
            <br/><br/>
            <span className="bold">Erbjuder:</span>
            
            <Opportunities opportunities={company.opportunities}/>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
});

CompanyDisplay.propTypes = {
  company: companyType.isRequired,
  selected: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default CompanyDisplay;
