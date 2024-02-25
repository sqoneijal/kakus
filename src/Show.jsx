import { Children } from "react";

export const Show = (props) => {
   let when = null;
   let otherWise = null;

   Children.forEach(props.children, (children) => {
      if (children.props.isTrue === undefined) {
         otherWise = children;
      } else if (!when && children.props.isTrue === true) {
         when = children;
      }
   });

   return when || otherWise;
};

Show.When = ({ isTrue, children }) => isTrue && children;
Show.Else = ({ render, children }) => render || children;
