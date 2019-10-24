import React from "react";
// import PropTypes from "prop-types";
import { Link as RouterLink } from "@reach/router";
import {
  Typography,
  CardContent,
  Button,
  IconButton,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { usePlanningState } from "../contexts/planning";

import EditableTextField from "../EditableTextField";
import { fromNow } from "../utils/date";
import { Wrapper, CardActionsWrapper, AvatarWrapper } from './index.style';

function RecipeCard({
    recipe,
    planningPoint = {},
    selected = false,
    onPick,
  }) {
  const { title, _id, url, vegetarian: veg, description } = recipe;
  const savedNote = planningPoint.note || "";
  const [note, setNote] = React.useState(savedNote);
  const { updatePlanningPoint } = usePlanningState();
  const onChange = event => {
    const { value } = event.target;
    setNote(value);
  }
  const onSave = () => {
    updatePlanningPoint({ ...planningPoint, note });
  }

  const isPlanned = !!planningPoint.date;
  const [showNoteField, setShowNoteField] = React.useState(planningPoint.date && savedNote !== "");
  const onNoteClick = () => {
    if(showNoteField) return
    setShowNoteField(true);
  }
  return (
    <Wrapper selected={selected}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {recipe.lastDate && (
          <Typography component="span">
            <i>{fromNow(recipe.lastDate)}</i>
          </Typography>
        )}
        {description && (<Typography>{description}</Typography>)}
        {showNoteField && (
          <EditableTextField
            multiline
            fullWidth
            name="note"
            value={note}
            hasChanged={note !== savedNote}
            onChange={onChange}
            onSave={onSave}
            onClear={() => setNote("")}
          />
        )}
      </CardContent>
      <CardActionsWrapper>
        {veg && <AvatarWrapper>V</AvatarWrapper>}
        {url && (
          <IconButton
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <OpenInNewIcon style={{ fontSize: 20 }} />
          </IconButton>
        )}
        {(isPlanned && !showNoteField) && <Button onClick={onNoteClick}>NOTE</Button>}
        <Button component={RouterLink} to={`/recipes/${_id}`}>
          PLUS
        </Button>
        {!!onPick && <Button onClick={() => onPick(recipe)}>AJOUTER</Button>}
      </CardActionsWrapper>
    </Wrapper>
  );
}

export default RecipeCard;
