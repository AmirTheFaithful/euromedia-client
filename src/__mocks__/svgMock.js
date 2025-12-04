const React = require("react");

function SvgMock(props) {
  return React.createElement("svg", { ...props, "data-testid": "mock-svg" });
}

module.exports = SvgMock;
module.exports.ReactComponent = SvgMock;
