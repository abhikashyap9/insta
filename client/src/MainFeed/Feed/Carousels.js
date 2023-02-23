import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

export default function Carroussel(props) {
  
  const table = props.cards.map((element, index) => {
   
    return { ...element, onClick: () => setGoToSlide(index) };
  });
  console.log()

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);
  console.log(goToSlide)
  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
    <div>Close</div>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        onClick={console.log(cards)}
      />
    </div>
  );
}