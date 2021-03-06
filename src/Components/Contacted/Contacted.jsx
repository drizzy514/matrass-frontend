import "./Contacted.scss";
import { useEffect, useState, useRef } from "react";

const Contacted = () => {
  const [res, setRes] = useState(false);
  const [warning, setWarning] = useState(false);
  const phoneNumber = useRef();
  useEffect(() => {
    if (res) {
      let timeout = setInterval(() => {
        setRes(false);
      }, 3000);
      return () => clearInterval(timeout);
    }
  });
  const inputValidate = () => {
    if (phoneNumber.current.value.length > 0) {
      if (!/^[0-9]+$/.test(phoneNumber.current.value)) {
        setWarning(true);
      } else {
        setWarning(false);
      }
    } else {
      setWarning(false);
    }
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    if (/^[0-9]+$/.test(phoneNumber.current.value)) {
      const phone = Number(phoneNumber.current.value);
      const date = new Date()
      const DATA = await fetch("https://matras-backend-g1.herokuapp.com/makeancustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, date }),
      });
      if ((await DATA.json()).message === "added") {
        setRes(true);
      } else {
        setRes(false);
      }
    } else {
      console.log("error");
    }
  };
  return res ? (
    <section className="cta">
      <div className="cta-modal">
        <h2 className="cta-modal__heading">
          Arizangiz muvaffaqiyatli qabul qilindi ✅
        </h2>
        <p className="cta-modal__text">Siz bilan tez orada bog’lanamiz 😊</p>
      </div>
    </section>
  ) : (
    <section className="cta" id="Contacted">
      <div className="container--home">
        <div>
          <h3 className="cta__heading">Sizni qiziqtirdimi?</h3>
          <p className="cta__text">
            Raqamingizni qoldiring, biz sizga yana qo'ng'iroq qilamiz
          </p>
        </div>
        <form className="cta-form" onSubmit={formSubmit}>
          <span className="cta-form__numberCode">+998</span>
          <span className="cta-form__line"></span>
          {warning ? (
            <span className="cta-form__warning">
              Please, just enter a number
            </span>
          ) : (
            ""
          )}
          <input
            onChange={inputValidate}
            ref={phoneNumber}
            type="text"
            className="cta-form__input"
            placeholder="Raqamingizni yozing"
          />
          <button className="cta-form__btn">Yuborish</button>
        </form>
      </div>
    </section>
  );
};
export default Contacted;
