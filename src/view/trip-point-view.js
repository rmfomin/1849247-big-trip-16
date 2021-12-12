import { createElement } from '../render.js';
import { capitalise } from '../utils/utils.js';
import { formatPointDuration } from '../utils/date.js';

// Генерируем один оффер
const createOfferTemplate = ({ title, price } = {}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
);

// Собираем в список все офферы точки
const createEventOffersListTemplate = (offers) => (
  `<ul class="event__selected-offers">
    ${offers.map(createOfferTemplate).join('')}
  </ul>`
);

// Создать шаблон разметки точки
const createPointTemplate = (point) => {
  const {
    type,
    dateFrom,
    dateTo,
    destination,
    basePrice,
    offers,
    isFavorite
  } = point;

  const pointDuration = formatPointDuration(dateTo - dateFrom);

  const starClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
    <div class="event">
      <time
        class="event__date"
        datetime="${dateFrom.toISOString()}">${dateFrom.format('MMM D')}</time>
      <div class="event__type">
        <img
          class="event__type-icon"
          width="42"
          height="42"
          src="img/icons/${type}.png"
          alt="Event type icon">
      </div>
      <h3 class="event__title">${capitalise(type)} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time
            class="event__start-time"
            datetime="${dateFrom.toISOString()}">${dateFrom.format('HH:mm')}</time>
          &mdash;
          <time
            class="event__end-time"
            datetime="${dateTo.toISOString()}">${dateTo.format('HH:mm')}</time>
        </p>
        <p class="event__duration">${pointDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;
        <span class="event__price-value">${basePrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>

      ${createEventOffersListTemplate(offers)}

      <button
        class="event__favorite-btn ${starClassName}"
        type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button
        class="event__rollup-btn"
        type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class TripPointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
