import { Fragment } from "react";
import PropTypes from "prop-types";

import SizedBox from "../ui/SizedBox";

const Separator = () => (
  <>
    <SizedBox width={4} />
    <span>|</span>
    <SizedBox width={4} />
  </>
);

const ActionLinks = ({ children }) => {
  return (
    <div className="actions">
      {children.map((child, index) => {
        return (
          <Fragment key={index}>
            {child}
            {index === children.length - 1 ? null : <Separator />}
          </Fragment>
        );
      })}
    </div>
  );
};

ActionLinks.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ActionLinks;
