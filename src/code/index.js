const buttonSearch = document.getElementById("search-button");
const citySearch = document.getElementById("cities-choice");
const quantitySearch = document.getElementById("quantity-person-choice");
const dateInSearch = document.getElementById("dateIn-choice");
const dateOutSearch = document.getElementById("dateOut-choice");
const hotelContainer = document.getElementById("hotel-container");
let selectedNomer = null;

if (!Array.isArray(data)) {
  throw new Error(`Ми отримали щось інше...`);
}

//клікаємо на кнопку "Пошук", викликається функція пошуку Search
buttonSearch.addEventListener("click", Search);

//функція пошуку виводить картки готелей hotelCard, які задовільняють пошуку
function Search() {
  hotelContainer.innerHTML = "";
  if (citySearch.value !== "Виберіть місто") {
    //шукаємо по введеному значенню міста
    const findCity = data.filter((el) => el.city.includes(citySearch.value));
    if (quantitySearch.value !== "Виберіть кількість") {
      //шукаємо по введеному значенню кількості гостей
      const findQuantity = findCity.filter((el) =>
        el.nomer.some((room) => room.quantityPerson === quantitySearch.value)
      );
      //шукємо по даті вїзду/виїзду
      if (
        dateInSearch.value === "2023-12-01" &&
        dateOutSearch.value === "2023-12-08"
      ) {
        findQuantity.forEach((hotel) => {
          selectedNomer = hotel;
          console.log(hotel);
          const hotelCard = `
            <div class="searched-hotel">
              <div class="hotel-description">
                <h2 class="hotel-name">${hotel.name}<span class="hotel-rating">${hotel.rating}</span></h2>
                <h3>${hotel.city}</h3>
                <p>${hotel.descrHotel}</p>
                <button type="button" class="button nomer-card ${hotel.name}">Інформація про номер</button>
              </div>
              <div class="hotel-image">
                <img
                  src="./src/images/${hotel.imageHotel}"
                  alt="${hotel.imageHotel}"
                />
              </div>
            </div>
        `;
          hotelContainer.insertAdjacentHTML("beforeend", hotelCard);
          //після загрузки карток готелю на сторінку, оновлюємо значення колекції кнопок для переходу на картку номера
          refreshButtonsNomerCard();
        });
      } else {
        alert("На цю дату немає можливості забронювати готель");
      }
    } else {
      alert("Введіть кількість гостей");
    }
  } else {
    alert("Введіть місто");
  }
}

const refreshButtonsNomerCard = () => {
  const buttonsNomerCard = document.getElementsByClassName("nomer-card"); //отримуємо колекцію кнопок для переходу на картку номера
  Array.from(buttonsNomerCard).forEach((button) => {
    button.addEventListener("click", (e) => {
      //на цю кнопку натиснули, нам потрібно знати до якого готеля вона відноситься
      //в назві класу кнопки є name готеля
      //class="button nomer-card ${hotel.name}"
      const className = e.target.className; //клас кнопки
      const hotelName = className.match(/nomer-card\s(.+)/)[1]; //виділяємо з класу назву готеля, що стоїть після nomer-card та пробілу
      const number = quantitySearch.value;
      ShowNomer(hotelName, number);
    });
  });
};

//функція показує картку номера при натисканні на картці готелю кнопки "Інформація про номер"
//в функцію передаємо назву вибраного готеля та вибрану кільість гостей
function ShowNomer(hotelName, number) {
  const modal = document.querySelector(".container-modal");
  const modalWindow = document.querySelector(".modal-window");
  const modalClose = document.getElementById("modal-close");
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = ""; //очищуємо тіло модального вікна перед додаванням картки номеру

  //обєкт вибраного готелю
  const hotel = data.filter((el) => el.name.includes(hotelName))[0];
  //обєкт вибраного номеру
  const nomer = hotel.nomer.filter((el) =>
    el.quantityPerson.includes(number)
  )[0];

  //підрахунок розміщення модального вікна в залежності від положення скрола
  const scrollTop = document.documentElement.scrollTop;
  const windowMiddle = scrollTop + window.innerHeight / 3;
  const modalWindowHeight = modalWindow.offsetHeight;
  const modalTop = Math.max(windowMiddle - modalWindowHeight / 2, 0);
  modal.style.top = `${modalTop}px`;

  modal.classList.remove("hide"); //щоб показати модальне вікно

  console.log(nomer);

  //код, що потрібно вставити в тіло модального вікна
  const nomerCard = `
    <div class="modal-title">${hotelName}</div>
    <div class="nomer-image">
      <img
        src="./src/images/nomer/${nomer.imageNomer}"
        alt="${nomer.imageNomer}"
      />
    </div>
    <p class="nomer-description">${nomer.description}</p>
    <p class="nomer-price">${nomer.price} грн.</p>
    <button type="button" class="button" id="btn-book">Забронювати</button>
    `;
  //вставляємо картку номера в тіло модального вікна
  modalBody.insertAdjacentHTML("beforeend", nomerCard);

  //коли натискаємо на модальному вікні хрестик, модальне вікно зникає
  modalClose.addEventListener("click", () => {
    modal.classList.add("hide");
  });
}
