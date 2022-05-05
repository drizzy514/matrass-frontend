import { useEffect, useState } from "react";
import "./LocationInfo.scss";

const LocationInfo = ({ address }) => {
  const [aIndex, setAIndex] = useState(0);

  useEffect(() => {
    const alastIndex = address.length - 1;
    if (aIndex < 0) {
      setAIndex(alastIndex);
    }
    if (aIndex > alastIndex) {
      setAIndex(0);
    }
  }, [aIndex, address]);
  useEffect(() => {
    let slider = setInterval(() => {
      setAIndex(aIndex + 1);
    }, 3000);
    return () => clearInterval(slider);
  });
  return (
    <div className="address-info__wrapper">
      {address.map((e, i) => {
        let position = "nextSlide-adres";
        if (
          i === aIndex - 1 ||
          (aIndex === 0 && aIndex === address.length - 1)
        ) {
          position = "lastSlide-adres";
        }
        if (i === aIndex) {
          position = "activeSlide-adres";
        }
        return (
          <article className={position} key={i}>
            <h3 className="address-info__title">{e.locations_city}</h3>
            <p className="address-info__intended">{e.locations_description}</p>
            <a
              className="btn address__btn"
              href={`https://maps.google.com/?q=${e.locations_city},${e.locations_city}`}
              target="_blank"
              rel="noreferrer"
            >
              Geolokatsiya
            </a>
          </article>
        );
      })}
    </div>
  );
};
export default LocationInfo;
