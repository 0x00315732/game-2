// --- 1. GLOBAL VARIABLES AND ELEMENTS ---
const storyTextElement = document.getElementById('story-text');
const optionsElement = document.getElementById('options');
const errorCountElement = document.getElementById('error-count');
const bgMusic = document.getElementById('bg-music');
const musicToggleButton = document.getElementById('music-toggle-btn');
const sceneImageElement = document.getElementById('scene-image');

let errorCount = 0;
let isMusicPlaying = false;

function updateScore() {
    errorCountElement.textContent = errorCount;
}

// --- 2. MUSIC CONTROL ---
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggleButton.textContent = "▶️ Play Music";
        isMusicPlaying = false;
    } else {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(e => {
            console.error("Audio playback failed:", e);
            musicToggleButton.textContent = "🚫 Blocked";
        });
        musicToggleButton.textContent = "⏸️ Pause Music";
        isMusicPlaying = true;
    }
}

// --- 3. STORY DATA: "Aldar Kose’s Clever Adventure (Extended)" ---
const story = {
    start: {
        text:
            "It was a very cold winter day. Aldar Kose wore an old coat full of holes and rode his tired horse. ‘I need a warm coat… and a faster horse,’ he thought. In the distance he saw the local bai riding toward him.",
        image: "images/steppe_cold.png",
        options: [
            { text: "Greet the bai politely", nextScene: "meetBai", isError: false },
            { text: "Hide and watch first", nextScene: "observe", isError: false },
            { text: "Ride away into the steppe", nextScene: "end_cold", isError: true }
        ]
    },

    observe: {
        text:
            "Aldar hides behind a dune and watches. The bai’s horse is strong and fast; the fur coat looks warm. An idea sparks in Aldar’s mind.",
        image: "images/dune_watch.png",
        options: [
            { text: "Approach and sing cheerfully", nextScene: "meetBai", isError: false },
            { text: "Keep hiding until the bai passes", nextScene: "missChance", isError: true }
        ]
    },

    meetBai: {
        text:
            "The bai rides closer. ‘Hello, Aldar Kose. It’s so cold today. Aren’t you cold?’ Aldar smiles and sings, opening his holey coat.",
        image: "road_meeting.jpg",
        options: [
            { text: "Claim the coat is magical", nextScene: "magicCoatPitch", isError: false },
            { text: "Admit you’re freezing", nextScene: "end_pity", isError: true }
        ]
    },

    magicCoatPitch: {
        text:
            "‘This is a magic coat,’ says Aldar. ‘These holes let the cold out, so I stay warm!’ The bai blinks in surprise.",
        image: "coat_closeup.jpg",
        options: [
            { text: "Refuse to sell to increase desire", nextScene: "refuseSell", isError: false },
            { text: "Offer to sell immediately", nextScene: "tooEager", isError: true }
        ]
    },

    refuseSell: {
        text:
            "‘Oh no, I can’t sell it. My mother made it,’ Aldar says. The bai frowns, then smiles.",
        image: "bai_thinking.jpg",
        options: [
            { text: "Wait for the bai’s better offer", nextScene: "baiOffersFur", isError: false },
            { text: "Walk away dramatically", nextScene: "walkAway", isError: true }
        ]
    },

    baiOffersFur: {
        text:
            "‘You can have my fur coat and money,’ says the bai. Aldar shrugs. ‘I can’t… it’s my mother’s.’",
        image: "fur_offer.jpg",
        options: [
            { text: "Hold silence (create tension)", nextScene: "baiAddsHorse", isError: false },
            { text: "Say ‘deal!’ too quickly", nextScene: "tooEager", isError: true }
        ]
    },

    baiAddsHorse: {
        text:
            "Desperate, the bai adds, ‘Take my fast horse too!’ Aldar eyes the beautiful white horse.",
        image: "white_horse.jpg",
        options: [
            { text: "Accept the trade smartly", nextScene: "acceptTrade", isError: false },
            { text: "Ask for even more (greedy)", nextScene: "pushTooFar", isError: true }
        ]
    },

    acceptTrade: {
        text:
            "Aldar takes the fur coat, the bag of gold, and mounts the swift horse. He turns back: ‘I forgot—this magic works only when I wear it. Goodbye!’",
        image: "trade_success.jpg",
        options: [
            { text: "Ride off quickly", nextScene: "end_trickedBai", isError: false },
            { text: "Linger and brag", nextScene: "chase", isError: true }
        ]
    },

    chase: {
        text:
            "Aldar lingers too long. The bai realizes the trick and orders a chase!",
        image: "chase_start.jpg",
        options: [
            { text: "Dash into the open steppe", nextScene: "steppeEscape", isError: false },
            { text: "Hide in a frozen ravine", nextScene: "end_caught", isError: true }
        ]
    },

    steppeEscape: {
        text:
            "The new horse flies across the steppe. The wind howls, but Aldar is warm in the fur coat. The bai’s men give up the chase.",
        image: "steppe_escape.jpg",
        options: [
            { text: "Head toward the mountains", nextScene: "end_wise", isError: false }
        ]
    },

    // --- Soft fails / teaching moments ---
    tooEager: {
        text:
            "Aldar offers too quickly. The bai grows suspicious and refuses. The chance slips away.",
        image: "suspicious_bai.jpg",
        options: [
            { text: "Rewind to the claim", nextScene: "magicCoatPitch", isError: false }
        ]
    },

    pushTooFar: {
        text:
            "Greed spoils the plan. The bai laughs: ‘Magic? Then keep it!’ No trade today.",
        image: "deal_breaks.jpg",
        options: [
            { text: "Return to a modest request", nextScene: "baiAddsHorse", isError: false }
        ]
    },

    walkAway: {
        text:
            "Dramatic exits are risky. The bai rides off, unimpressed. The cold bites harder.",
        image: "lonely_road.jpg",
        options: [
            { text: "Try again—be patient this time", nextScene: "baiOffersFur", isError: false }
        ]
    },

    missChance: {
        text:
            "The bai passes by. No gold, no horse, no fur—only winter wind.",
        image: "empty_road.jpg",
        options: [
            { text: "Step out and call him back", nextScene: "meetBai", isError: false }
        ]
    },

    end_pity: {
        text:
            "Honesty wins pity, not fortune. The bai offers nothing and rides on. Aldar shivers.",
        image: "cold_end.jpg",
        options: [
            { text: "Restart", nextScene: "start", isError: false }
        ]
    },

    end_cold: {
        text:
            "Riding away solves nothing. The cold grows sharper; the old horse stumbles.",
        image: "blizzard.jpg",
        options: [
            { text: "Try a braver approach", nextScene: "meetBai", isError: false }
        ]
    },

    end_caught: {
        text:
            "The ravine is a trap. The bai’s men catch up. ‘Hand back the gold!’",
        image: "ravine_caught.jpg",
        options: [
            { text: "Retry smarter", nextScene: "acceptTrade", isError: false }
        ]
    },

    // --- Happy endings ---
    end_trickedBai: {
        text:
            "Aldar rides off fast. The bai hugs the ‘magic’ coat with holes—and starts to freeze.",
        image: "bai_freezing.jpg",
        options: [
            { text: "Continue the journey", nextScene: "end_wise", isError: false }
        ]
    },

    end_wise: {
        text:
            "Warm coat, fast horse, heavy gold. ‘A quick mind rides farther than a quick horse,’ Aldar smiles.",
        image: "sunrise_victory.jpg",
        options: []
    }
};



// --- 4. SCENE LOADER ---
function loadScene(sceneKey) {
    const currentScene = story[sceneKey];
    let sceneText = currentScene.text;

    if (currentScene.image) {
        sceneImageElement.style.backgroundImage = `url('${currentScene.image}')`;
    }

    if (sceneKey.startsWith('end') || sceneKey === 'happyEnd') {
        sceneText += `<br><br><em>Total mistakes: ${errorCount}. The End.</em>`;
    }

    storyTextElement.innerHTML = sceneText;
    optionsElement.innerHTML = '';

    currentScene.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option.text;

        button.onclick = () => {
            if (option.isError) {
                errorCount++;
                updateScore();
            }
            loadScene(option.nextScene);
        };

        optionsElement.appendChild(button);
    });
}

// --- 5. START GAME ---
updateScore();
loadScene('start');

musicToggleButton.addEventListener('click', toggleMusic);

if (bgMusic.paused) {
    musicToggleButton.textContent = "▶️ Play Music";
    isMusicPlaying = false;
} else {
    musicToggleButton.textContent = "⏸️ Pause Music";
    isMusicPlaying = true;
}
