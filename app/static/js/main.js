document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const muteToggle = document.getElementById('mute-toggle');
    const ambientAudio = document.getElementById('ambient-audio');

    // Ensure the audio volume is not 0 (default is 1, but just in case)
    ambientAudio.volume = 0.7;

    // Initially, the audio is muted (as set in the HTML)
    // Clicking the toggle button will switch between muted and unmuted.
    muteToggle.addEventListener('click', () => {
        if (ambientAudio.muted) {
            ambientAudio.muted = false;
            // Explicitly start playing the audio
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

    // Handle form submission for sending a message
    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Append the player's message to the chat
        appendMessage('player', message);
        chatInput.value = '';

        // Send the message to the backend API
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
            // Append the DM's response to the chat
            appendMessage('dm', data.message);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('dm', 'There was an error processing your request.');
        }
    });

    // Function to append a message to the chat container
    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
