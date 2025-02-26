document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const imageContainer = document.getElementById('image-container');
    const muteToggle = document.getElementById('mute-toggle');
    const ambientAudio = document.getElementById('ambient-audio');
    const loadingIcon = document.getElementById('loading-icon');
    const startButton = document.getElementById('start-button');
    const storyJournal = document.querySelector('.story-journal');

    storyJournal.classList.add('grayed-out');

    ambientAudio.volume = 0.7;

    muteToggle.addEventListener('click', () => {
        if (ambientAudio.muted) {
            ambientAudio.muted = false;
            ambientAudio.play().catch(error => {
                console.error("Audio play failed:", error);
            });
            muteToggle.textContent = "🔊";
            muteToggle.title = "Mute Audio";
        } else {
            ambientAudio.muted = true;
            muteToggle.textContent = "🔇";
            muteToggle.title = "Unmute Audio";
        }
    });

    startButton.addEventListener('click', async (event) => {
        event.preventDefault();
        startButton.style.display = 'none';
        chatForm.style.opacity = '1';
        chatForm.style.pointerEvents = 'auto';
        storyJournal.classList.remove('grayed-out');
        loadingIcon.style.display = 'block';
        chatForm.querySelector('button').disabled = true;
        ambientAudio.muted = false;
        ambientAudio.play().catch(error => {
            console.error("Audio play failed:", error);
        });
        muteToggle.textContent = "🔊";
        muteToggle.title = "Mute Audio";

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: "" })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            appendMessage('dm', data.message);
            if (data.image_url) {
                appendImage(data.image_url);
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('dm', 'There was an error processing your request.');
        } finally {
            loadingIcon.style.display = 'none';
            chatForm.querySelector('button').disabled = false;
        }
    });

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
        chatForm.querySelector('button').disabled = true;
        appendMessage('player', message);
        chatInput.value = '';
        loadingIcon.style.display = 'block';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            appendMessage('dm', data.message);
            if (data.image_url) {
                appendImage(data.image_url);
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('dm', 'There was an error processing your request.');
        } finally {
            loadingIcon.style.display = 'none';
            chatForm.querySelector('button').disabled = false;
        }
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
    }

    function appendImage(imageUrl) {
        imageContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Generated Scene";
        img.classList.add("generated-image");
        img.addEventListener('load', () => {
            imageContainer.scrollIntoView({ behavior: 'smooth' });
        });
        imageContainer.appendChild(img);
    }
});