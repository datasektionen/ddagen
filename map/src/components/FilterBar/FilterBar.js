import React from "react";
import "./FilterBar.css";
import Autosuggest from "react-autosuggest";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const allBusinessAreas = ["IT"];
const allOpportunities = ["Internship"];
const allCompanies = ["Yelp", "Ericsson"];

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    width: "30%"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginBottom: "0px"
  },
  label: {
    "&$focused": {
      color: "#fafafa"
    }
  },
  focused: {},
  outlinedInput: {
    "&$focused $notchedOutline": {
      borderColor: "#F00",
      borderWidth: "5px"
    }
  },
  notchedOutline: {}
}));

function getSuggestions(value, suggestionList) {
  console.log(`getting suggestions`);
  console.log(value, suggestionList);
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : suggestionList.filter(
        entry =>
          entry
            .trim()
            .toLowerCase()
            .slice(0, inputLength) === inputValue
      );
}

function getSuggestionValue(value) {
  console.log(`reading value from suggestion`);
  console.log(value);
  return value;
}

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.outlinedInput,
          // textField: classes.textField,
          focused: classes.focused
        }
      }}
      InputLabelProps={{
        classes: {
          root: classes.label,
          focused: classes.focused
        }
      }}
      {...other}
      variant="outlined"
      margin="normal"
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function FilterBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    company: "",
    businessAreas: "",
    opportunities: ""
  });
  const [stateSuggestions, setSuggestions] = React.useState([]);
  const [selected, setSelected] = React.useState({
    businessAreas: [],
    opportunities: []
  });

  const handleChange = name => (event, { newValue }) => {
    console.log(`changed value`);
    setState({ ...state, [name]: newValue });
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionsFetchRequested = suggestionList => ({ value }) => {
    console.log(`handling suggestionlist`);
    console.log(suggestionList);
    console.log(value);
    setSuggestions(getSuggestions(value, suggestionList));
  };

  const handleChangeSelected = name => event => {
    console.log(event);
    console.log(name);
    setSelected({ ...state, [name]: event.target.value });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const personName = [];
  const names = ["alt 1", "alt 2", "alt 3", "alt 4"];

  return (
    <div className="company-filters-wrapper">
      <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={stateSuggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested(
          allCompanies
        )}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          id: "react-autosuggest-simple",
          label: "Companies",
          placeholder: "Search for companies",
          value: state.company,
          onChange: handleChange("company")
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={stateSuggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested(
          allBusinessAreas
        )}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          id: "react-autosuggest-simple",
          label: "Business areas",
          placeholder: "Filter business areas",
          value: state.businessAreas,
          onChange: handleChange("businessAreas")
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={stateSuggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested(
          allOpportunities
        )}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          id: "react-autosuggest-simple",
          label: "Opportunities",
          placeholder: "Filter opportunities",
          value: state.opportunities,
          onChange: handleChange("opportunities")
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">
          Filter business areas
        </InputLabel>
        <Select
          multiple
          value={selected.businessAreas}
          onChange={handleChangeSelected("businessAreas")}
          input={<Input id="select-multiple-chip" />}
          renderValue={selectedList => (
            <div className={classes.chips}>
              {selectedList.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterBar;
