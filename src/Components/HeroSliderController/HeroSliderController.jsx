import { useEffect, useState } from "react";
import "./HeroSliderController.scss";

const HeroSliderController = () => {

  const [heroSlider, setHeroSlider] = useState([]);
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    fetch('http://localhost:3020/matrassMain', {
      'method': "GET",
  })  
  .then(response => {
      return response.json()
  })
  .then(data => {
    setHeroSlider(data)
  })
  }, [])
  useEffect(() => {
    const lastIndex = heroSlider.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, heroSlider]);
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  });
  return (
    <>
      {heroSlider.length && (
        <ul className="line">
          {heroSlider.map((e, i) => {
            let dotPosition = "nextDot";
            if (i === index) {
              dotPosition = "activeDot";
            }
            if (
              i === index - 1 ||
              (index === 0 && i === heroSlider.length - 1)
            ) {
              dotPosition = "lastDot";
            }

            return (
              <li
                dataset-id={i}
                className={dotPosition}
                style={{ width: 250 / heroSlider.length }}
                key={i}
              ></li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default HeroSliderController;
