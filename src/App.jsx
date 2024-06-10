import React, { useState } from "react";
import SingleColor from "./components/SingleColor";
import rgbToHex from "./utils";

import Values from "values.js";

function App() {
  const initialRgb = [randColor(), randColor(), randColor()];
  const initialHex = rgbToHex(...initialRgb);

  const [value, setValue] = useState({ text: initialHex, count: 10 });
  const [colors, setColors] = useState(new Values(initialHex).all(value.count));
  const [errorList, setErrorList] = useState([false, false]);

  console.log(typeof colors[0].weight);

  function handleSubmit(e) {
    e.preventDefault();
    let values;
    try {
      values = new Values(value.text);
    } catch (error) {
      console.log("first");
      console.log(error);
      setErrorList(
        errorList.map((item, index) => {
          if (index === 0) {
            return true;
          } else {
            return item;
          }
        })
      );
      return;
    }
    if (value.count < 1 || value.count > 100) {
      setErrorList((errorList) =>
        errorList.map((item, index) => {
          if (index === 1) {
            return true;
          } else {
            return item;
          }
        })
      );
    } else {
      values = values.all(parseInt(value.count));
      setColors(values);
    }
  }

  function randColor() {
    return Math.floor(Math.random() * 154);
  }
  return (
    <>
      <section className="container">
        <h3>Color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={value.text}
            onChange={(e) => {
              setErrorList(
                errorList.map((item, index) => {
                  if (index === 0) {
                    return false;
                  } else {
                    return item;
                  }
                })
              );

              setValue((value) => {
                return { ...value, text: e.target.value };
              });
            }}
            value={value.text}
            className={errorList[0] ? "error" : null}
          />
          <input
            type="number"
            value={value.count}
            onChange={(e) => {
              setErrorList(
                errorList.map((item, index) => {
                  if (index === 1) {
                    return false;
                  } else {
                    return item;
                  }
                })
              );

              setValue((value) => {
                return { ...value, count: e.target.value };
              });
            }}
            placeholder="count"
            title="Count of colors weight"
            className={errorList[1] === true ? "error" : null}
          />

          <button type="submit" className="btn">
            Click
          </button>
        </form>
      </section>
      <section className="colors">
        <h4>list goes here</h4>
        {colors.map((color, index) => (
          <SingleColor
            key={index}
            {...color}
            hex={color.hex}
            color={index > colors.length / 2 && "white"}
          />
        ))}
      </section>
    </>
  );
}

export default App;
