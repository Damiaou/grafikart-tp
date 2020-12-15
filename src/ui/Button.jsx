import React from "react";
import { PropTypes } from "prop-types";
import { Loader } from "./Loader";

export function Button({
  children,
  type = "primary",
  loading = false,
  ...props
}) {
  let className = `btn btn-${type}`;
  className = type === "submit" ? "btn btn-primary" : className;
  let htmlType = type === "submit" ? type : null;
  return (
    <button className={className} type={htmlType} {...props} disabled={loading}>
      {loading ? <Loader /> : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool
};
