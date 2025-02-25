const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const clearBtn = document.getElementById('clear-btn');
const themeBtn = document.getElementById('theme-btn');

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
      startBtn.classList.remove('listening');
      output.innerHTML = `<div class="loading"></div> Processing...`;
      setTimeout(() => {
        handleCommand(transcript);
      }, 1000); // Simulate processing delay
    };

    recognition.onerror = (event) => {
      output.textContent = "Error occurred. Please try again.";
      startBtn.classList.remove('listening');
      speak("Error occurred. Please try again.");
    };

    recognition.onend = () => {
      output.textContent = "Listening stopped.";
      startBtn.classList.remove('listening');
      speak("Goodbye! Let me know if you need anything else.");
    };

    function handleCommand(command) {
      let response = "";

      if (command.includes('hello')) {
        response = "Hello, how can I help you today?";
      } else if (command.includes('open youtube')) {
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
      } else if (command.includes('open calculator')) {
        response = "Opening Calculator.";
        window.open('calculator:', '_blank');
      } else if (command.includes('help')) {
        response = "Here are some commands you can try: 'Hello', 'Open YouTube', 'Open Google', 'Search for [query]', 'What's the time', 'What's the date', 'Open Calculator'.";
      } else {
        response = `Command not recognized: ${command}`;
      }

      output.textContent = "";
      typeResponse(response, output);
      speak(response);
    }

    function speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech
      synth.speak(utterance);
    }

    clearBtn.addEventListener('click', () => {
      output.textContent = "Your command will appear here...";
    });

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLightTheme = document.body.classList.contains('light-theme');
      themeBtn.innerHTML = `<i class="fas ${isLightTheme ? 'fa-sun' : 'fa-moon'}"></i>`;
    });

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

    // Function to set the theme based on the time of day
    function setTheme() {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 18) {
        document.body.classList.add('light-theme');
        themeBtn.innerHTML = `<i class="fas fa-sun"></i>`;
      } else {
        document.body.classList.remove('light-theme');
        themeBtn.innerHTML = `<i class="fas fa-moon"></i>`;
      }
    }

    // Call the function when the page loads
    window.onload = () => {
      setTheme();
      speak("Hello, I am Jarvis. How can I assist you today?");
    };
  } else {
    output.textContent = "Your browser does not support speech synthesis.";
  }
} else {
  output.textContent = "Your browser does not support speech recognition.";
}
