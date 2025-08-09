// Random Weather Generator with Useless Advice
// No API needed - completely random and useless!

// Weather types and their icons
const weatherTypes = [
  { main: 'clear', description: 'clear sky', icon: '☀️' },
  { main: 'clouds', description: 'few clouds', icon: '🌤️' },
  { main: 'clouds', description: 'scattered clouds', icon: '☁️' },
  { main: 'clouds', description: 'broken clouds', icon: '☁️' },
  { main: 'clouds', description: 'overcast clouds', icon: '☁️' },
  { main: 'rain', description: 'light rain', icon: '🌦️' },
  { main: 'rain', description: 'moderate rain', icon: '🌧️' },
  { main: 'rain', description: 'heavy rain', icon: '🌧️' },
  { main: 'rain', description: 'shower rain', icon: '🌦️' },
  { main: 'thunderstorm', description: 'thunderstorm', icon: '⛈️' },
  { main: 'thunderstorm', description: 'thunderstorm with rain', icon: '⛈️' },
  { main: 'snow', description: 'light snow', icon: '❄️' },
  { main: 'snow', description: 'heavy snow', icon: '❄️' },
  { main: 'snow', description: 'snow', icon: '❄️' },
  { main: 'mist', description: 'mist', icon: '🌫️' },
  { main: 'fog', description: 'fog', icon: '🌫️' },
  { main: 'haze', description: 'haze', icon: '🌫️' },
  { main: 'dust', description: 'dust', icon: '🌪️' },
  { main: 'sand', description: 'sand storm', icon: '🌪️' },
  { main: 'tornado', description: 'tornado', icon: '🌪️' },
  { main: 'squall', description: 'squall', icon: '💨' },
  { main: 'ash', description: 'volcanic ash', icon: '🌋' }
];

// Completely useless and opposite weather advice
const uselessAdvice = {
  'clear': [
    "Perfect sunny weather! Time to stay indoors with all curtains closed. Your vampire lifestyle will thank you later!",
    "Beautiful sunshine outside! Better wear your heaviest winter coat and complain about how bright it is. Sunglasses indoors are mandatory!",
    "Gorgeous clear skies! Perfect day to schedule that important indoor meeting and avoid all that horrible vitamin D. Who needs happiness anyway?",
    "Sunny day ahead! Time to water your plants with ice cubes and wonder why they're not growing. Science is overrated!",
    "Clear weather! Excellent opportunity to wear all black and stand in the shade. Embrace your inner goth!"
  ],
  'clouds': [
    "Cloudy skies! Great news - you can finally stop using moisturizer. The lack of sun will do wonders for your pale complexion!",
    "Overcast weather! Time to wear your brightest neon colors so you can blend perfectly with the gray atmosphere. Camouflage level: expert!",
    "Cloudy day! Perfect excuse to tell everyone how the weather matches your soul. Very original and not dramatic at all!",
    "Gray skies ahead! Ideal time to plan that outdoor photoshoot. Natural lighting is so overrated anyway!",
    "Cloudy conditions! Great day to complain about the lack of shadows. Who needs contrast in life?"
  ],
  'rain': [
    "Rain is coming! Don't bother with an umbrella - embrace the wet dog look! It's very fashionable in some parallel universe!",
    "Rainy weather ahead! Perfect time to wear your best suede shoes and leave all windows open. What could possibly go wrong?",
    "Precipitation expected! Great day to style your hair extra nice and plan that outdoor picnic you've been postponing for months!",
    "Wet weather! Excellent opportunity to wash your car and hang laundry outside. Mother Nature loves helping with chores!",
    "Rain forecast! Time to take your electronics for a nice outdoor walk. They need fresh air too!"
  ],
  'thunderstorm': [
    "Thunderstorms approaching! Excellent time to go flying a kite with a metal string. Benjamin Franklin would be so proud of your scientific spirit!",
    "Stormy weather! Perfect conditions for that outdoor metal concert you've been planning. The lightning will add amazing special effects!",
    "Thunder and lightning! Ideal time to stand under the tallest tree and contemplate life's mysteries. Very zen!",
    "Electrical storm incoming! Great day to take a nice relaxing bath while using all your electronic devices. Multitasking at its finest!",
    "Thunderstorm alert! Perfect weather for that rooftop yoga session. Connect with nature's raw power!"
  ],
  'snow': [
    "Snow is falling! Time to break out those flip-flops and shorts. Who needs warm clothing when you have hypothermia to look forward to?",
    "Snowy conditions! Perfect weather for that convertible car ride with the top down. Frostbite is just nature's way of giving you free ice cubes!",
    "Winter wonderland ahead! Great day to forget your coat and pretend you're a penguin. They seem happy enough in Antarctica!",
    "Snow forecast! Excellent time to plan that beach volleyball tournament. Snow angels can wait!",
    "Blizzard conditions! Perfect opportunity to test if your summer clothes are really 'all-season' as advertised!"
  ],
  'mist': [
    "Misty weather! Excellent visibility for that important driving test. Who needs to see where they're going anyway?",
    "Foggy conditions! Perfect time to play hide and seek with moving vehicles. Very thrilling and not dangerous at all!",
    "Hazy atmosphere! Great day to lose your way in your own neighborhood. Adventure awaits around every invisible corner!",
    "Mist rolling in! Ideal conditions for that outdoor photography session. Blurry photos are so artistic!",
    "Foggy day! Perfect time to practice your echolocation skills. Dolphins make it look so easy!"
  ],
  'extreme': [
    "Extreme weather conditions! Perfect time to question all your life choices while nature shows off its dramatic side!",
    "Severe weather alert! Mother Nature is having one of her episodes again. Time to hide indoors and order pizza!",
    "Wild weather incoming! Great day to realize that humans are basically hairless apes pretending to control nature!",
    "Apocalyptic conditions! Excellent opportunity to practice your survival skills by ordering takeout!",
    "Chaotic weather! Perfect time to appreciate the reliability of your weather app's complete randomness!"
  ]
};

// Random country codes for added realism
const countryCodes = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'BR', 'IN', 'CN', 'RU', 'MX', 'AR', 'ZA', 'EG', 'NG', 'KE', 'GH'];

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const cityName = document.querySelector('.city-name');
const commentText = document.querySelector('.comment-text');

// Weather detail elements
const humidityValue = document.querySelector('.detail-item:nth-child(1) .detail-value');
const windSpeedValue = document.querySelector('.detail-item:nth-child(2) .detail-value');
const feelsLikeValue = document.querySelector('.detail-item:nth-child(3) .detail-value');
const pressureValue = document.querySelector('.detail-item:nth-child(4) .detail-value');

// Weather cards
const weatherCards = document.querySelectorAll('.weather-card');

// Event listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

// Handle search functionality
function handleSearch() {
  const city = cityInput.value.trim();
  
  if (!city) {
    showError('Please enter a city name! Even imaginary ones work here!');
    return;
  }

  // Show loading animation
  showLoading();
  
  // Simulate API delay for realism
  setTimeout(() => {
    const weatherData = generateRandomWeatherData(city);
    displayWeatherData(weatherData);
  }, Math.random() * 2000 + 500); // Random delay between 0.5-2.5 seconds
}

// Generate completely random weather data
function generateRandomWeatherData(city) {
  const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
  const randomTemp = Math.floor(Math.random() * 60) - 20; // -20°C to 40°C
  const randomCountry = countryCodes[Math.floor(Math.random() * countryCodes.length)];
  
  return {
    name: capitalizeWords(city),
    sys: { country: randomCountry },
    main: {
      temp: randomTemp,
      feels_like: randomTemp + Math.floor(Math.random() * 10) - 5, // ±5°C difference
      humidity: Math.floor(Math.random() * 60) + 20, // 20-80%
      pressure: Math.floor(Math.random() * 100) + 980 // 980-1080 hPa
    },
    weather: [{
      main: randomWeather.main,
      description: randomWeather.description,
      icon: randomWeather.icon
    }],
    wind: {
      speed: Math.floor(Math.random() * 25) + 1 // 1-25 m/s
    }
  };
}

// Display weather data with useless advice
function displayWeatherData(data) {
  // Update basic weather info
  weatherIcon.textContent = data.weather[0].icon;
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = capitalizeWords(data.weather[0].description);
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  
  // Update weather details
  humidityValue.textContent = `${data.main.humidity}%`;
  windSpeedValue.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
  feelsLikeValue.textContent = `${data.main.feels_like}°C`;
  pressureValue.textContent = `${data.main.pressure} hPa`;
  
  // Get useless advice based on weather
  const weatherCategory = getWeatherCategory(data.weather[0].main);
  const adviceArray = uselessAdvice[weatherCategory];
  const randomAdvice = adviceArray[Math.floor(Math.random() * adviceArray.length)];
  commentText.textContent = randomAdvice;
  
  // Update weather cards with random scenarios
  updateWeatherCards();
  
  // Add some fun animations
  animateWeatherUpdate();
}

// Get weather category for advice
function getWeatherCategory(weatherMain) {
  const weather = weatherMain.toLowerCase();
  
  if (weather.includes('clear')) return 'clear';
  if (weather.includes('cloud')) return 'clouds';
  if (weather.includes('rain')) return 'rain';
  if (weather.includes('thunder') || weather.includes('storm')) return 'thunderstorm';
  if (weather.includes('snow')) return 'snow';
  if (weather.includes('mist') || weather.includes('fog') || weather.includes('haze')) return 'mist';
  
  return 'extreme';
}

// Update weather cards with random data
function updateWeatherCards() {
  const cardAdvice = [
    "Perfect day to wear a tuxedo to the beach! Formal wear loves sand and saltwater!",
    "Ideal weather for ice skating in your living room! Who needs an ice rink anyway?",
    "Great conditions for sunbathing in a snowstorm! Natural exfoliation at its finest!"
  ];
  
  weatherCards.forEach((card, index) => {
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    const randomTemp = Math.floor(Math.random() * 50) - 15;
    
    const icon = card.querySelector('.card-icon');
    const temp = card.querySelector('.card-temp');
    const desc = card.querySelector('.card-desc');
    const comment = card.querySelector('.card-comment');
    
    if (icon) icon.textContent = randomWeather.icon;
    if (temp) temp.textContent = `${randomTemp}°C`;
    if (desc) desc.textContent = capitalizeWords(randomWeather.description);
    if (comment) comment.textContent = cardAdvice[index] || "Weather exists. That's about all we can confirm.";
  });
}

// Utility functions
function capitalizeWords(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

function showLoading() {
  weatherIcon.textContent = '⏳';
  temperature.textContent = 'Loading...';
  weatherDescription.textContent = 'Generating nonsense...';
  cityName.textContent = 'Somewhere on Earth';
  commentText.textContent = 'Hold on, let me find something completely useless to say about your weather...';
  
  // Add loading animation to details
  humidityValue.textContent = '...';
  windSpeedValue.textContent = '...';
  feelsLikeValue.textContent = '...';
  pressureValue.textContent = '...';
}

function showError(message) {
  weatherIcon.textContent = '❌';
  temperature.textContent = 'Error';
  weatherDescription.textContent = 'Not found';
  cityName.textContent = 'Unknown Location';
  commentText.textContent = message;
  
  // Reset details
  humidityValue.textContent = '0%';
  windSpeedValue.textContent = '0 km/h';
  feelsLikeValue.textContent = '0°C';
  pressureValue.textContent = '0 hPa';
}

// Add fun animations when weather updates
function animateWeatherUpdate() {
  weatherIcon.style.transform = 'scale(1.2) rotate(360deg)';
  setTimeout(() => {
    weatherIcon.style.transform = '';
  }, 500);
}

// Fun interactions
weatherIcon.addEventListener('click', () => {
  const funMessages = [
    "Stop poking me! I'm just an emoji!",
    "That tickles! Do it again!",
    "I'm not a button, but thanks for the attention!",
    "Weather.exe has stopped working... just kidding!",
    "You've discovered the secret weather dance!"
  ];
  
  const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
  const originalText = commentText.textContent;
  
  commentText.textContent = randomMessage;
  animateWeatherUpdate();
  
  setTimeout(() => {
    commentText.textContent = originalText;
  }, 2000);
});

// Easter egg: Random weather facts (completely made up)
const fakeFacts = [
  "Did you know? Weather is just the sky having mood swings!",
  "Fun fact: Clouds are just sky sheep that got lost!",
  "Weather tip: If you can't see the weather, it's probably invisible!",
  "Scientific fact: 73% of weather statistics are made up on the spot!",
  "Weather wisdom: The best time to check the weather is when you're already outside!",
  "Pro tip: Weather apps are just very expensive magic 8-balls!",
  "Weather fact: Rain is just clouds crying because they're too heavy!",
  "Did you know? Snow is just frozen cloud dandruff!"
];

// Random fact generator
function showRandomFact() {
  const randomFact = fakeFacts[Math.floor(Math.random() * fakeFacts.length)];
  const originalText = commentText.textContent;
  
  commentText.textContent = randomFact;
  
  setTimeout(() => {
    commentText.textContent = originalText;
  }, 3000);
}

// Add random fact on double click
document.addEventListener('dblclick', showRandomFact);

// Initialize with a random city on page load
document.addEventListener('DOMContentLoaded', () => {
  const randomCities = ['Atlantis', 'Narnia', 'Gotham', 'Wakanda', 'Hogwarts', 'Mordor', 'Asgard', 'Pandora'];
  const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
  
  // Set a fun placeholder
  cityInput.placeholder = 'Enter any city (real or imaginary)...';
  
  // Uncomment to load random city on startup
  // cityInput.value = randomCity;
  // handleSearch();
});

// Konami code easter egg for extra chaos
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    commentText.textContent = "🎉 CHAOS MODE ACTIVATED! All weather advice is now 500% more useless! Reality has left the chat! 🎉";
    
    // Make everything extra chaotic
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 3000);
    
    konamiCode = [];
  }
});

// Random weather changes every 30 seconds (because why not?)
setInterval(() => {
  if (cityName.textContent !== 'London, UK' && cityName.textContent !== 'Unknown Location') {
    // Only auto-update if user has searched for something
    const currentCity = cityName.textContent.split(',')[0];
    if (currentCity && Math.random() < 0.3) { // 30% chance every 30 seconds
      const weatherData = generateRandomWeatherData(currentCity);
      displayWeatherData(weatherData);
    }
  }
}, 30000);