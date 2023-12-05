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
          const hotelCard = `
            <div class="searched-hotel">
              <div class="hotel-description">
                <h2 class="hotel-name">${hotel.name}<span class="hotel-rating">${hotel.rating}</span></h2>
                <h3>${hotel.city}</h3>
                <p>${hotel.descrHotel}</p>
                <button type="button" class="button nomer-card ${hotel.id}">Інформація про номер</button>
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
      //в назві класу кнопки є id готеля
      //class="button nomer-card ${hotel.id}"
      const className = e.target.className; //клас кнопки
      const number = className.match(/\d+/)[0]; //виділяємо з класу число
      ShowNomer(number);
    });
  });
};

function ShowNomer(number) {
  console.log(number);
}
