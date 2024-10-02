import React, { useCallback, useState } from "react";
import Heading from "@atlaskit/heading";
import { AtlassianIcon } from "@atlaskit/logo";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import {
  containerStyles,
  extraInfoStyles,
  inlineStyles,
} from "./styles/TaskCardStyles";

export const TaskCard = ({ task, onDelete, onToggleComplete }) => {
  const [isChecked, setIsChecked] = useState(task.status);

  // Handle checkbox toggle
  const handleCheckboxChange = useCallback(() => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onToggleComplete(newCheckedState); // Notify parent of change
  }, [isChecked, onToggleComplete]);

  return (
    <Stack
      xcss={containerStyles(isChecked)} // Apply styles based on checked state
      space='space.150'
    >
      <Text as='span'>{task.summary}</Text>
      <Box xcss={extraInfoStyles}>
        <Box xcss={inlineStyles}>
          <AtlassianIcon
            appearance='brand'
            size='small'
            label=''
          />
          <Heading level='h300'>{task.key}</Heading>
        </Box>
        <Inline
          space='space.100'
          alignBlock='center'
        >
          <Checkbox
            isChecked={isChecked} // Controlled checkbox state
            onChange={handleCheckboxChange}
            label=''
            size='large'
            name='task-checkbox'
          />
          <Button
            onClick={onDelete} // Trigger delete action
            appearance='danger'
            spacing='compact'
          >
            Delete
          </Button>
        </Inline>
      </Box>
    </Stack>
  );
};
