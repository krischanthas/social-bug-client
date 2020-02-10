import React from 'react';
// material ui
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const MyButton = ({children, onClick, tip, btnClassName, tipClassName}) => (
      <Tooltip
            title={tip}
            className={tipClassName}
            placement="top"
      >
            <IconButton className={btnClassName} onClick={onClick}>
                  {children}
            </IconButton>
      </Tooltip>
);

export default MyButton;
