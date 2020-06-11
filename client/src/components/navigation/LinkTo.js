import React from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkTo = React.forwardRef((props, ref) => <RouterLink {...props} />);

export default LinkTo;
