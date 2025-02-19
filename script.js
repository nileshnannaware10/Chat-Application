const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');

// Check if the browser supports the Web Speech API for speech recognition
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // Stop after one command
  recognition.interimResults = false; // Only final results
  recognition.lang = 'en-US'; // Set language

  // Check if the browser supports the Web Speech API for speech synthesis
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    startBtn.addEventListener('click', () => {
      recognition.start();
      output.textContent = "Listening...";
      startBtn.classList.add('listening');
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      output.textContent = `You said: ${transcript}`;
      handleCommand(transcript);
      startBtn.classList.remove('listening');
    };

    recognition.onerror = (event) => {
      output.textContent = "Error occurred. Please try again.";
      startBtn.classList.remove('listening');
      speak("Error occurred. Please try again.");
    };

    recognition.onend = () => {
      output.textContent = "Listening stopped.";
      startBtn.classList.remove('listening');
    };

    function handleCommand(command) {
      let response = "";

      if (command.includes('open youtube')) {
        response = "Opening YouTube.";
        window.open('https://www.youtube.com', '_blank');
      } else if (command.includes('open google')) {
        response = "Opening Google.";
        window.open('https://www.google.com', '_blank');
      } else if (command.includes('search for')) {
        const query = command.split('search for')[1].trim();
        response = `Searching for ${query}.`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      } else if (command.includes('what\'s the time') || command.includes('what is the time')) {
        const time = new Date().toLocaleTimeString();
        response = `The time is ${time}.`;
      } else if (command.includes('what\'s the date') || command.includes('what is the date')) {
        const date = new Date().toLocaleDateString();
        response = `Today's date is ${date}.`;
      } else if (command.includes('open instagram')) {
        response = "Opening Instagram.";
        window.open('https://www.instagram.com', '_blank');
      } else if (command.includes('open facebook')) {
        response = "Opening Facebook.";
        window.open('https://www.facebook.com', '_blank');
      } else if (command.includes('open spotify')) {
        response = "Opening Spotify.";
        window.open('https://www.spotify.com', '_blank');
      } else if (command.includes('open whatsapp')) {
        response = "Opening WhatsApp.";
        window.open('https://web.whatsapp.com', '_blank');
      } else if (command.includes('open linkedin')) {
        response = "Opening LinkedIn.";
        window.open('https://www.linkedin.com', '_blank');
      } else if (command.includes('open telegram')) {
        response = "Opening Telegram.";
        window.open('https://web.telegram.org', '_blank');
      } else if (command.includes('open gmail')) {
        response = "Opening Gmail.";
        window.open('https://mail.google.com', '_blank');
      } else if (command.includes('open flipkart')) {
        response = "Opening Flipkart.";
        window.open('https://www.flipkart.com', '_blank');
      } else if (command.includes('open amazon')) {
        response = "Opening Amazon.";
        window.open('https://www.amazon.com', '_blank');
      } else if (command.includes('open drive')) {
        response = "Opening Google Drive.";
        window.open('https://drive.google.com', '_blank');
      } else if (command.includes('open discord')) {
        response = "Opening Discord.";
        window.open('https://discord.com', '_blank');
      } else {
        response = `Command not recognized: ${command}`;
      }

      output.textContent = response;
      speak(response);
    }

    function speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech
      synth.speak(utterance);
    }
  } else {
    output.textContent = "Your browser does not support speech synthesis.";
  }
} else {
  output.textContent = "Your browser does not support speech recognition.";
}

// Greet the user when the page loads
window.onload = () => {
  speak("Hello, I am Jarvis. How can I assist you today?");
};

// Farewell message when the bot stops listening
recognition.onend = () => {
  output.textContent = "Listening stopped.";
  startBtn.classList.remove('listening');
  speak("Goodbye! Let me know if you need anything else.");
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  output.textContent = `You said: ${transcript}`;
  startBtn.classList.remove('listening');
  output.innerHTML = `<div class="loading"></div> Processing...`;
  setTimeout(() => {
    handleCommand(transcript);
  }, 1000); // Simulate processing delay
};

function typeResponse(text, element) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 50); // Adjust typing speed
}

// Modify the handleCommand function to use the typing effect
function handleCommand(command) {
  let response = "";

  if (command.includes('open youtube')) {
    response = "Opening YouTube.";
    window.open('https://www.youtube.com', '_blank');
  } 
  // ... (rest of the commands)

  output.textContent = ""; // Clear previous content
  typeResponse(response, output);
  speak(response);
}

// Function to set the theme based on the time of day
function setTheme() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

// Call the function when the page loads
window.onload = () => {
  setTheme();
  speak("Hello, I am Jarvis. How can I assist you today?");
};