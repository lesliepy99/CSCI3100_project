/*
* MODULE Checker
* PROGRAMMER: XIONG Jiajie
* VERSION: 1.0 (30 April 2021)
* PURPOSE: Checker for sort order, tags, region, school
* Reference: https://material-ui.com/zh/components/radio-buttons/
*            https://material-ui.com/zh/api/form-control-label/#formcontrollabel-api
*/


/**
 * Module dependencies and prototypes.
 */
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Checker = props => {
  // default value is none
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.parentTag(event.target.value);
  };
  
  // use FormControl to build the checker
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"> {props.tagKind} </FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {props.tags.map((tag) => {
          if(tag == "None"){
          return (
            <FormControlLabel value='' control={<Radio />} label={tag} />
          )}
          else{
            return (
              <FormControlLabel value={tag} control={<Radio />} label={tag} />
            )}
          }
        )}
      </RadioGroup>
    </FormControl>
  );
}
export default Checker;