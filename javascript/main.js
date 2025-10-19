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

// --- 3. STORY DATA: "Aldar Köse’s Clever Adventure (Extended)" ---
const story = {
    start: {
        text: "On a scorching day, Aldar Köse wandered across the endless Kazakh steppe. His torn robe fluttered in the wind, and his horse, Shubar, snorted wearily. In the distance, smoke rose from a wealthy bay’s village. Aldar chuckled: 'Hmm, time to teach another greedy man a lesson!' What should Aldar do first?",
        image: "images/steppe.png",
        options: [
            { text: "Ride to the bay’s aul (village) and ask for shelter", nextScene: "bayHouse", isError: false },
            { text: "Ignore the village and continue across the steppe", nextScene: "steppeWander", isError: true },
            { text: "Sneak closer to observe the bay’s house first", nextScene: "bayObservation", isError: false }
        ]
    },

    steppeWander: {
        text: "The sun burned mercilessly. Aldar’s throat was dry, and even Shubar stumbled. Soon, they found a lonely yurt with an old woman outside, weaving cloth. 'Poor traveler,' she said, 'come drink some kumys.' Aldar gratefully drank and rested, but he knew adventure awaited elsewhere.",
        image: "images/old_woman_yurt.png",
        options: [
            { text: "Thank the woman and ride back toward the bay’s aul", nextScene: "bayHouse", isError: false },
            { text: "Rest longer and fall asleep under the sun", nextScene: "end_sleep", isError: true }
        ]
    },

    bayObservation: {
        text: "Hiding behind a camel cart, Aldar spied the bay counting his gold. Servants rushed around, terrified. The bay shouted: 'Who stole one coin from my chest? I’ll whip everyone!' Aldar smirked — greed always made people foolish. He decided it was the perfect time to appear.",
        image: "images/bay_observation.png",
        options: [
            { text: "Enter the yard pretending to be a traveling wise man", nextScene: "bayHouse", isError: false },
            { text: "Try to steal food first", nextScene: "end_caught", isError: true }
        ]
    },

    bayHouse: {
        text: "The bay greeted Aldar with a scowl. 'Who are you, dusty wanderer?' Aldar bowed politely. 'A poor traveler with great knowledge and a sheep that brings fortune to kind men,' he said. The bay raised an eyebrow — 'Fortune, you say?'",
        image: "images/bay_house.png",
        options: [
            { text: "Tell him about the magic sheep that gives gold every morning", nextScene: "magicSheep", isError: false },
            { text: "Challenge the bay to a riddle contest", nextScene: "riddleContest", isError: false },
            { text: "Steal food when no one is looking", nextScene: "end_caught", isError: true }
        ]
    },

    riddleContest: {
        text: "Aldar smiled slyly. 'Bay, they say your mind is as sharp as your whip. Let’s see if that’s true. If I win, you must feed me and my horse!' The bay agreed. Aldar asked, 'What grows without roots, shines without fire, and dies without smoke?' The bay scratched his head, confused.",
        image: "images/riddle_contest.png",
        options: [
            { text: "Reveal the answer — 'It’s the sun!'", nextScene: "bayRiddleLoss", isError: false },
            { text: "Tease him without giving the answer", nextScene: "end_caught", isError: true }
        ]
    },

    bayRiddleLoss: {
        text: "The bay gasped. 'You trickster! The sun!' Aldar laughed. 'A deal’s a deal — food for me and my horse!' Grumbling, the bay served him a feast. But Aldar wasn’t done yet; he had bigger plans for this greedy man.",
        image: "images/bay_feast.png",
        options: [
            { text: "Tell the bay about the magic sheep", nextScene: "magicSheep", isError: false },
            { text: "Quietly leave the village after eating", nextScene: "steppeEscape", isError: false }
        ]
    },

    magicSheep: {
        text: "Aldar said: 'My sheep gives gold every morning, but only to kind masters.' The bay’s eyes gleamed. 'Bring it to me tomorrow!' Aldar nodded, hiding a grin. He had already spotted an old sheepskin drying near the fence — perfect for his next trick.",
        image: "images/market.png",
        options: [
            { text: "Sell the bay an old sheepskin, claiming it’s magical", nextScene: "bayFooled", isError: false },
            { text: "Tell the bay it was a test of greed", nextScene: "end_truth", isError: true }
        ]
    },

    bayFooled: {
        text: "Aldar sold the old sheepskin for a chest of gold. The bay could barely sleep, dreaming of endless riches. Morning came — no gold, just silence. Rage filled the house. 'Find that liar!' the bay roared.",
        image: "images/angry_bay.png",
        options: [
            { text: "The bay sends his men after Aldar", nextScene: "chase", isError: true },
            { text: "Aldar leaves quietly through the back gate", nextScene: "mountainPath", isError: false }
        ]
    },

    chase: {
        text: "Aldar’s horse galloped across the dry steppe as the bay’s men shouted behind him. Dust rose high. Ahead, a road forked — one way led to the bazaar, the other to the mountains.",
        image: "images/chase.png",
        options: [
            { text: "Hide in a wagon full of watermelons at the bazaar", nextScene: "marketTrick", isError: false },
            { text: "Ride toward the mountains", nextScene: "mountainPath", isError: false }
        ]
    },

    marketTrick: {
        text: "At the bazaar, Aldar jumped into a watermelon wagon. When the bay’s men came by, he put on a merchant’s robe and shouted, 'Fresh melons! Cheap and sweet!' They passed without recognizing him. Aldar chuckled and decided to earn some extra coins.",
        image: "images/market_cart.png",
        options: [
            { text: "Sell the melons and buy a new horse", nextScene: "happyEnd", isError: false },
            { text: "Spend all money on sweets", nextScene: "end_foolish", isError: true }
        ]
    },

    mountainPath: {
        text: "Aldar rode into the cool mountains. There, he met a kind shepherd who shared bread and tea. The shepherd said: 'I know your stories, Aldar. But remember — not every rich man is greedy.' Aldar nodded thoughtfully.",
        image: "images/mountain.png",
        options: [
            { text: "Thank the shepherd and continue your journey", nextScene: "steppeEscape", isError: false },
            { text: "Laugh and boast about fooling the bay", nextScene: "end_karma", isError: true }
        ]
    },

    steppeEscape: {
        text: "Aldar rode freely through the steppe, the wind in his beard and laughter in his heart. 'That’ll teach the greedy ones!' he said. But deep down, he also remembered the shepherd’s words — wisdom is better than gold.",
        image: "images/steppe_ride.png",
        options: []
    },

    happyEnd: {
        text: "Aldar fooled the bay, earned money at the bazaar, and shared his wealth with poor villagers. Children followed him, laughing and calling: 'Tell us another story, clever Aldar Köse!' And he did, smiling under the bright steppe sky.",
        image: "images/aul_celebration.png",
        options: []
    },

    end_foolish: {
        text: "Aldar bought too many sweets and fell asleep under a tree. When he woke, foxes had eaten everything — even his new boots! He sighed: 'Even tricksters must learn moderation.'",
        image: "images/tree_sleep.png",
        options: []
    },

    end_caught: {
        text: "The bay’s men caught Aldar and brought him back. The bay took his gold. But Aldar just grinned: 'You can take my coins, but not my cleverness!' He was thrown out, already planning his next trick.",
        image: "images/caught.png",
        options: []
    },

    end_truth: {
        text: "Aldar told the bay the truth — that greed blinds men. Surprisingly, the bay laughed and said: 'You’re right. Keep your sheep and my respect.' Aldar left smiling — sometimes honesty wins too.",
        image: "images/truth.png",
        options: []
    },

    end_karma: {
        text: "Aldar mocked the bay too much, boasting of his cleverness. But while laughing, he slipped into a stream and soaked all his gold coins! He groaned, 'Perhaps even wit needs humility.'",
        image: "images/stream.png",
        options: []
    },

    end_sleep: {
        text: "Aldar fell asleep in the heat of the sun. When he awoke, Shubar had wandered off! He shook his head: 'That’s what laziness brings!' and started walking barefoot through the sand.",
        image: "images/sleep_steppe.png",
        options: []
    },

    end_skip: {
        text: "Aldar passed the village without doing anything. The day was wasted, and the bay remained just as greedy. 'What a boring story that would be,' Aldar sighed.",
        image: "images/empty_steppe.png",
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
