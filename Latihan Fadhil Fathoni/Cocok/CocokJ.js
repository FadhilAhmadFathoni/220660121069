document.addEventListener('DOMContentLoaded', function() {
    const words = [
        { english: 'House', indonesian: 'Rumah', word: 'house' },
        { english: 'Cat', indonesian: 'Kucing', word: 'cat' },
        { english: 'Tree', indonesian: 'Pohon', word: 'tree' },
        { english: 'Car', indonesian: 'Mobil', word: 'car' },
        { english: 'Book', indonesian: 'Buku', word: 'book' },
        { english: 'Sun', indonesian: 'Matahari', word: 'sun' },
        { english: 'Moon', indonesian: 'Bulan', word: 'moon' },
        { english: 'Water', indonesian: 'Air', word: 'water' },
        { english: 'Fire', indonesian: 'Api', word: 'fire' },
        { english: 'Flower', indonesian: 'Bunga', word: 'flower' },
        { english: 'Sky', indonesian: 'Langit', word: 'sky' },
        { english: 'River', indonesian: 'Sungai', word: 'river' },
        { english: 'Mountain', indonesian: 'Gunung', word: 'mountain' },
        { english: 'Sea', indonesian: 'Laut', word: 'sea' },
        { english: 'Grass', indonesian: 'Rumput', word: 'grass' },
        { english: 'Cloud', indonesian: 'Awan', word: 'cloud' },
        { english: 'Wind', indonesian: 'Angin', word: 'wind' },
        { english: 'Rain', indonesian: 'Hujan', word: 'rain' },
        { english: 'Snow', indonesian: 'Salju', word: 'snow' },
        { english: 'Star', indonesian: 'Bintang', word: 'star' }
    ];

    let selected = null;
    let correctCount = 0;
    let incorrectCount = 0;

    function getRandomPairs(array, num) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function createBox(word, language) {
        const box = document.createElement('div');
        box.className = 'box';
        box.textContent = word[language];
        box.setAttribute('data-word', word.word);
        box.onclick = () => checkMatch(box);
        return box;
    }

    function initializeGame() {
        const englishColumn = document.getElementById('english-column');
        const indonesianColumn = document.getElementById('indonesian-column');

        englishColumn.innerHTML = '';
        indonesianColumn.innerHTML = '';

        const selectedWords = getRandomPairs(words, 6);
        const englishBoxes = selectedWords.map(word => createBox(word, 'english'));
        const indonesianBoxes = selectedWords.map(word => createBox(word, 'indonesian'));

        shuffleArray(englishBoxes);
        shuffleArray(indonesianBoxes);

        englishBoxes.forEach(box => englishColumn.appendChild(box));
        indonesianBoxes.forEach(box => indonesianColumn.appendChild(box));
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function checkMatch(element) {
        if (selected) {
            if (selected === element) {
                document.getElementById('result').textContent = 'Klik elemen yang berbeda.';
                return;
            }

            if (selected.getAttribute('data-word') === element.getAttribute('data-word')) {
                selected.classList.add('correct');
                element.classList.add('correct');
                correctCount += 1;
                document.getElementById('result').textContent = 'Cocok!';
                setTimeout(() => {
                    selected.classList.add('hidden');
                    element.classList.add('hidden');
                    selected = null;
                    checkGameCompletion();
                }, 500);
            } else {
                incorrectCount += 1;
                element.classList.add('incorrect');
                selected.classList.add('incorrect');
                document.getElementById('result').textContent = 'Tidak cocok, coba lagi.';
                setTimeout(() => {
                    selected.classList.remove('selected', 'incorrect');
                    element.classList.remove('incorrect');
                    selected = null;
                }, 500);
            }
        } else {
            selected = element;
            selected.classList.add('selected');
            document.getElementById('result').textContent = 'Pilih elemen yang sesuai.';
        }
    }

    function checkGameCompletion() {
        const allCorrect = document.querySelectorAll('.box.correct');
        const totalBoxes = document.querySelectorAll('.box').length;
        if (allCorrect.length === totalBoxes) {
            document.getElementById('result').textContent = 'Selamat! Kamu telah menyelesaikan permainan.';
            document.getElementById('continue-button').style.display = 'block'; // Tampilkan tombol Lanjutkan
        }
    }

    initializeGame();
});
