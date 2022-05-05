import { useEffect, useState } from "react";
import "./LocationImg.scss";

const LocationImg = ({ address }) => {
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
    <div className="address-imgs">
      {address.map((e, i) => {
        return (
       
            <img
            key={i}
              src={e.locations_img}
              className="address-imgs__item"
              alt="img"
            />
          
        );
      })}
      {address.length && (
        <ul className="line" width={525}>
          {address.map((e, i) => {
            let dotPosition = "nextDot";
            if (i === aIndex) {
              dotPosition = "activeDot";
            }
            if (
              i === aIndex - 1 ||
              (aIndex === 0 && i === address.length - 1)
            ) {
              dotPosition = "lastDot";
            }

            return (
              <li
                dataset-id={i}
                className={dotPosition}
                key={i}
                style={{ width: 525 / address.length }}
              ></li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default LocationImg;
