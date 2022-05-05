import { useEffect, useState } from "react";
import "./HeroSlider.scss";

const HeroSlider = () => {
  
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
    <div className="hero-slider-wrapper">
      {heroSlider.map((el, i) => {
        let position = "nextSlide";
        if (i === index) {
          position = "activeSlide";
        }
        if (i === index - 1 || (index === 0 && i === heroSlider.length - 1)) {
          position = "lastSlide";
        }
        return (
          <article className={position} key={i}>
            <img src={el.matrass_main_img} className="hero-slider__img" alt="img" />
          </article>
        );
      })}
    </div>
  );
};
export default HeroSlider;
