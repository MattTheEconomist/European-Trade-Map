import React, { useState, useEffect } from "react";

export const Title = (props) => {
  const { origin, tradeFlow } = props;

  const [titleText, setTitleText] = useState("Please Select a Country");

  function returnTitleText(origin, tradeFlow) {
    if (!origin) {
      return "Please Select a Country";
    }
    let flowText;

    if (tradeFlow === "export") {
      flowText = "Exports to";
    } else {
      flowText = "Imports from";
    }

    return `${flowText} ${origin}`;
  }

  useEffect(() => {
    setTitleText(returnTitleText(origin, tradeFlow));
    console.log(origin, tradeFlow);
  }, [tradeFlow, origin]);

  //   useEffect(() => {
  //     setTitleText("hello");
  //   }, []);

  return (
    <div>
      <h1>{titleText}</h1>
    </div>
  );
};

export default Title;
