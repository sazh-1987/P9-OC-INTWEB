import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // ----------------------------------- copie et trie du plus récent au plus ancien
  const byDateDesc = [...(data?.focus || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % byDateDesc.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [byDateDesc.length])
  return (
  <div className="SlideCardList">
    {byDateDesc.map((event, idx) => (
      <div
        key={event.id || `${event.title}-${idx}`}
        className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
      >
        <img src={event.cover} alt={event.title} />
        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
    ))}

    <div className="SlideCard__paginationContainer">
      <div className="SlideCard__pagination">
        {byDateDesc.map((slide, radioIdx) => (
          <input
            key={slide.id || `radio-${radioIdx}`}
            type="radio"
            name="radio-button"
            checked={index === radioIdx}
            onChange={() => setIndex(radioIdx)}
            aria-label={`Afficher la slide ${radioIdx + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
)}

export default Slider;