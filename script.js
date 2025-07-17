document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.querySelector('.btn-text');
    const spinner = document.querySelector('.spinner');
    const linkInput = document.getElementById('linkInput');
    const outputSection = document.getElementById('outputSection');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const postBtn = document.getElementById('postBtn');

    // --- SIMULASI FUNGSI BACKEND ---

    /**
     * @important INI ADALAH SIMULASI
     * Scraping langsung dari browser tidak memungkinkan karena CORS.
     * Fungsi ini harus diganti dengan panggilan API ke backend Anda
     * yang melakukan scraping sesungguhnya di https://trends24.in/united-states/
     */
    async function fetchTrendingTopics() {
        console.log("Simulating: Fetching trends from backend...");
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulasi delay jaringan
        // Data contoh hasil scraping
        return [
            '#TechTuesday',
            'AIForGood',
            '#FutureOfWork',
            'Elon Musk'
        ];
    }

    /**
     * @important INI ADALAH SIMULASI
     * Kunci API Gemini TIDAK BOLEH diekspos di frontend.
     * Fungsi ini harus diganti dengan panggilan API ke backend Anda
     * yang aman memanggil Gemini API.
     */
    async function callGeminiAPI(trends, link) {
        console.log("Simulating: Calling Gemini API from backend...");
        const prompt = `Based on the trending topics "${trends.join(', ')}" and the content of the link ${link}, create a relevant, engaging X.com post. The post must be in English, a maximum of 250 characters, and include the 4 most relevant hashtags from the trends. Format the output as a single string.`;
        console.log("Generated Prompt for Gemini:", prompt);
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi delay API

        // Contoh respons dari Gemini API
        const hashtags = trends.map(t => t.replace(/ /g, '')).map(t => t.startsWith('#') ? t : `#${t}`).slice(0, 4).join(' ');
        const post = `Exploring how AI is shaping the #FutureOfWork. This article breaks down the key changes we can expect. A must-read for professionals!`;
        
        return `${post}`; // Gemini akan mereturn post + hashtag, kita format di sini
    }

    // --- FUNGSI UTAMA ---

    async function handleGeneratePost() {
        const link = linkInput.value.trim();
        if (!link) {
            alert('Please enter a valid link.');
            return;
        }
        
        // 1. Tampilkan status loading
        setLoading(true);
        outputSection.style.display = 'none';

        try {
            // 2. Ambil data (Simulasi)
            const trends = await fetchTrendingTopics();
            const formattedTrends = trends.slice(0, 4).map(t => t.replace(/ /g, '')).map(t => t.startsWith('#') ? t : `#${t}`);

            // 3. Panggil API Gemini (Simulasi)
            const generatedPost = await callGeminiAPI(trends, link);
            
            // 4. Format output akhir
            const finalOutput = `${generatedPost}\n\n${link}\n\n${formattedTrends.join(' ')}`;
            
            // 5. Tampilkan hasil
            outputText.innerText = finalOutput;
            outputSection.style.display = 'block';

        } catch (error) {
            console.error('An error occurred:', error);
            alert('Failed to generate post. Please check the console for details.');
        } finally {
            // 6. Hentikan status loading
            setLoading(false);
        }
    }

    // --- FUNGSI BANTUAN & EVENT LISTENERS ---

    function setLoading(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            generateBtn.disabled = false;
            btnText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }

    function copyToClipboard() {
        const textToCopy = outputText.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyBtn.textContent = '📄 Copy Result';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Could not copy text.');
        });
    }

    function postToX() {
        const text = outputText.innerText;
        const encodedText = encodeURIComponent(text);
        const twitterIntentURL = `https://x.com/intent/post?text=${encodedText}`;
        window.open(twitterIntentURL, '_blank');
    }

    generateBtn.addEventListener('click', handleGeneratePost);
    copyBtn.addEventListener('click', copyToClipboard);
    postBtn.addEventListener('click', postToX);
});
