// Complete Tarot Deck Data
const tarotDeck = [
    // Major Arcana
    { name: "The Fool", meaning: "New beginnings, spontaneity, free spirit", number: "00", reversed: "Recklessness, naivety" },
    { name: "The Magician", meaning: "Manifestation, resourcefulness, power", number: "01", reversed: "Manipulation, trickery" },
    { name: "The High Priestess", meaning: "Intuition, sacred knowledge, mystery", number: "02", reversed: "Secrets, hidden agendas" },
    { name: "The Empress", meaning: "Fertility, nurturing, abundance", number: "03", reversed: "Dependence, smothering" },
    { name: "The Emperor", meaning: "Authority, structure, control", number: "04", reversed: "Tyranny, rigidity" },
    { name: "The Hierophant", meaning: "Tradition, spiritual guidance", number: "05", reversed: "Dogma, conformity" },
    { name: "TheLovers", meaning: "Love, harmony, choices", number: "06", reversed: "Disharmony, imbalance" },
    { name: "TheChariot", meaning: "Willpower, victory", number: "07", reversed: "Lack of direction" },
    { name: "Strength", meaning: "Courage, inner strength", number: "08", reversed: "Self-doubt, weakness" },
    { name: "TheHermit", meaning: "Soul-searching, wisdom", number: "09", reversed: "Loneliness, isolation" },
    { name: "WheelOfFortune", meaning: "Destiny, change", number: "10", reversed: "Bad luck, resistance to change" },
    { name: "Justice", meaning: "Fairness, truth", number: "11", reversed: "Injustice, dishonesty" },
    { name: "TheHangedMan", meaning: "Surrender, new perspective", number: "12", reversed: "Stalling, martyrdom" },
    { name: "Death", meaning: "Transformation, endings", number: "13", reversed: "Fear of change, stagnation" },
    { name: "Temperance", meaning: "Balance, moderation", number: "14", reversed: "Excess, imbalance" },
    { name: "TheDevil", meaning: "Bondage, materialism", number: "15", reversed: "Breaking free, enlightenment" },
    { name: "TheTower", meaning: "Sudden upheaval, revelation", number: "16", reversed: "Disaster avoidance, fear" },
    { name: "TheStar", meaning: "Hope, inspiration", number: "17", reversed: "Despair, lack of faith" },
    { name: "TheMoon", meaning: "Illusion, subconscious", number: "18", reversed: "Confusion, deception" },
    { name: "TheSun", meaning: "Joy, success", number: "19", reversed: "Temporary sadness" },
    { name: "Judgement", meaning: "Rebirth, inner calling", number: "20", reversed: "Self-doubt, ignoring the call" },
    { name: "TheWorld", meaning: "Completion, wholeness", number: "21", reversed: "Incompletion, delays" },
    // Add Minor Arcana here...
];

// DOM Elements
const drawButton = document.getElementById("drawButton");
const cardSlots = document.querySelectorAll(".card-slot");
const interpretationSection = document.getElementById("cardMeaning");

// Initialize the deck
let currentDeck = [...tarotDeck];
let drawnCards = [];

// Fisher-Yates shuffle algorithm
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Reset all cards to face-down position
function resetCards() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'reversed');
    });
}

// Draw new cards
function drawNewCards() {
    // Reset previous cards
    resetCards();
    
    // Shuffle and select 3 cards
    shuffleDeck(currentDeck);
    drawnCards = currentDeck.slice(0, 3);
    
    // Update UI after a short delay for animation
    setTimeout(() => {
        drawnCards.forEach((card, index) => {
            const slot = cardSlots[index];
            const cardElement = slot.querySelector('.card');
            const cardFront = slot.querySelector('.card-front');
            const isReversed = Math.random() > 0.5;
            
            // Set card content
            cardFront.innerHTML = `
                <h4 class="card-name">${card.name}</h4>
                <div class="card-art ${isReversed ? 'reversed' : ''}"></div>
                <p class="card-meaning">${isReversed ? card.reversed : card.meaning}</p>
            `;
            
            // Set card image
            const cardImageName = card.name.replace(/ /g, '-');
            const cardArt = slot.querySelector('.card-art');
            cardArt.style.backgroundImage = `url('Cards-png/${card.number}-${cardImageName}.png')`;
            
            // Add classes for styling
            if (isReversed) {
                cardElement.classList.add('reversed');
            }
            
            // Update interpretation
            const meaningParagraphs = interpretationSection.querySelectorAll('p');
            meaningParagraphs[index].innerHTML = `
                <strong>${["Past", "Present", "Future"][index]}:</strong> 
                ${card.name} ${isReversed ? '(Reversed)' : ''}<br>
                ${isReversed ? card.reversed : card.meaning}
            `;
            
            // Flip card after a small delay for visual effect
            setTimeout(() => {
                cardElement.classList.add('flipped');
            }, index * 200);
        });
    }, 500);
}

// Event Listeners
drawButton.addEventListener('click', drawNewCards);

// Click individual cards to flip them
cardSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        const card = slot.querySelector('.card');
        card.classList.toggle('flipped');
    });
});



// Initialize all pages
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in nav
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Page-specific logic
    if (currentPage === 'readings.html') {
        initReadingsPage();
    } else if (currentPage === 'meanings.html') {
        initMeaningsPage();
    } else if (currentPage === 'history.html') {
        initHistoryPage();
    }
});

function initReadingsPage() {
    // Readings page logic (from previous examples)
}

function initMeaningsPage() {
    const cardList = document.getElementById('cardList');
    
    // Populate card list
    tarotDeck.forEach(card => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-list-item';
        cardItem.innerHTML = `
            <img src="cards/${card.number}-${card.name.replace(/ /g, '-')}.png" alt="${card.name}">
            <p>${card.name}</p>
        `;
        cardItem.addEventListener('click', () => showCardDetail(card));
        cardList.appendChild(cardItem);
    });
}

function initHistoryPage() {
    // Load saved readings from localStorage
    const savedReadings = JSON.parse(localStorage.getItem('tarotReadings')) || [];
    const historyContainer = document.getElementById('readingHistory');
    
    savedReadings.forEach(reading => {
        const readingElement = document.createElement('div');
        readingElement.className = 'saved-reading';
        readingElement.innerHTML = `
            <div class="reading-date">${new Date(reading.date).toLocaleDateString()}</div>
            <div class="reading-spread">${reading.spread}</div>
            <div class="reading-cards">
                ${reading.cards.map(card => `
                    <div class="mini-card" style="background-image: url('cards/${card.number}-${card.name.replace(/ /g, '-')}.jpg')"></div>
                `).join('')}
            </div>
            <button class="view-reading">View</button>
            <button class="delete-reading">Delete</button>
        `;
        historyContainer.appendChild(readingElement);
    });
}