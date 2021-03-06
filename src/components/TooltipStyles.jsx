import styled from "styled-components";

const TooltipWrapper = styled.div`
  transform: scale(1);
  position: relative;
  z-index: ${(props) => (props.zIndex === undefined ? "auto" : props.zIndex)};
`;

const TooltipBody = styled.div`
  padding: 20px;
  position: absolute;
  border-radius: 5px;
  opacity: ${(props) => props.display};
  transition: opacity 0.4s ease-in;
  pointer-events: ${(props) => (props.display ? "auto" : "none")};
  top: ${(props) => (props.offsets ? props.offsets.offsetTop : "")}px;
  left: ${(props) => (props.offsets ? props.offsets.offsetLeft : "")}px;
  bottom: ${(props) => (props.offsets ? props.offsets.offsetBottom : "")}px;
  right: ${(props) => (props.offsets ? props.offsets.offsetRight : "")}px;
  background-color: ${(props) => props.backgroundColor};
  width: 400px;
`;

const TooltipPointer = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  &.above {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 16px solid ${(props) => props.backgroundColor};
    top: -16px;
  }
  &.below {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 16px solid ${(props) => props.backgroundColor};
    top: 100%;
  }
  &.left {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 16px solid ${(props) => props.backgroundColor};
    left: -16px;
  }
  &.right {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 16px solid ${(props) => props.backgroundColor};
    right: -16px;
  }
`;

const TooltipContent = styled.div`
  display: block;
  padding: 10px;
`;

const TooltipButtons = styled.div`
  float: right;
  padding-top: 10px;
`;

const TooltipButton = styled.button`
  all: unset;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  text-align: center;
  margin: 4px;
  width: 64px;
  height: 32px;
  font-size: 14px;
  border: solid 1px #fff;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  :hover {
    color: #808080;
    border-color: #808080;
  }
`;

const CloseButton = styled.button`
  all: unset;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  :hover {
    color: #808080;
  }
`;

export {
  TooltipBody,
  TooltipContent,
  TooltipWrapper,
  CloseButton,
  TooltipPointer,
  TooltipButtons,
  TooltipButton,
};
