# 🤖 J.A.R.V.I.S - AI Virtual Assistant

> **Just A Rather Very Intelligent System** - Your personal AI assistant inspired by Tony Stark's JARVIS

![Version](https://img.shields.io/badge/version-2.0.1-blue)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

## 🧠 Project Overview

JARVIS is a sophisticated AI-powered virtual assistant that combines voice recognition, natural language processing, and system automation to create an intelligent companion for your digital life. Built with modern web technologies and a futuristic UI inspired by Iron Man's JARVIS, this assistant provides seamless voice-controlled interactions and smart automation capabilities.

The system features a beautiful glassmorphism interface with animated backgrounds, arc reactor-style visualizations, and real-time status indicators. It processes voice commands through advanced speech recognition, executes system operations, manages productivity tasks, and provides intelligent responses through integration with the GROQ AI API.

**Key Capabilities:**
- 🎤 **Voice-First Interface** - Natural speech recognition and text-to-speech
- 🤖 **AI-Powered Responses** - Intelligent conversations using GROQ LLM
- ⚙️ **System Control** - Native OS automation and app management  
- 📋 **Productivity Suite** - Notes, todos, reminders, and smart routines
- 🎯 **Context Awareness** - Remembers commands and learns user patterns
- 🔧 **Modular Architecture** - Easily extensible command system

---

## ✨ Features

### 🎮 **Core AI Features**
- 🗣️ Voice recognition with real-time processing
- 🔊 Text-to-speech with natural voice synthesis
- 🧠 Conversational AI powered by GROQ API
- 📝 Context-aware command interpretation
- 🎯 Smart suggestions and quick commands

### ⚙️ **System Control**
- 🖥️ Application launcher (VS Code, Spotify, Brave, etc.)
- 🔆 Brightness control with voice commands
- 🔊 Volume control and audio management
- 📸 Screenshot capture with automatic saving
- 📊 System monitoring (CPU, memory, disk usage)
- 🗂️ File search and organization

### 📋 **Productivity Suite**
- 📝 **Smart Notes** - Voice-to-text note taking and retrieval
- ✅ **Todo Management** - Task creation, completion tracking
- ⏰ **Multi-Timer System** - Multiple named timers with audio alerts
- ⏱️ **Stopwatch** - Precision timing with voice control
- 🧮 **Advanced Calculator** - Math operations and unit conversions
- 📅 **Date & Time** - Current time and date information

### 🏃 **Health & Wellness**
- 💧 Water reminders with customizable intervals
- 🪑 Posture check reminders
- 👀 Eye rest with 20-20-20 rule timer
- ⏰ Break reminders for productivity
- 🧘 Wellness routine automation

### ⚡ **Smart Routines**
- 🌅 **Morning Routine** - Opens calendar, email, news, weather
- 💼 **Work Mode** - Launches dev tools, enables focus mode
- 🏠 **End Workday** - Closes work apps, disables notifications
- 🎯 **Focus Sessions** - Distraction-free work periods

### 📰 **Information Services**
- 📰 Latest news headlines with Google News integration
- 🗂️ File search across system directories
- 📊 System performance monitoring
- 🔍 Quick web searches and navigation

---

## 🚀 Tech Stack

**Frontend:**
- 🎨 **EJS Templates** - Server-side rendering
- 🌈 **TailwindCSS** - Modern utility-first styling
- ✨ **Custom CSS Animations** - Arc reactor, grid backgrounds, glassmorphism
- 🎤 **Web Speech API** - Voice recognition and synthesis

**Backend:**
- ⚡ **Node.js & Express** - High-performance server
- 🤖 **GROQ API** - Advanced language model integration
- 📰 **NewsAPI** - Real-time news data
- 🗂️ **File System APIs** - Local data persistence

**Architecture:**
- 🏗️ **Command Pattern** - Modular, extensible command system
- 🔄 **Event-Driven** - Real-time voice processing
- 📦 **JSON Storage** - Lightweight data persistence
- 🛡️ **Error Handling** - Robust error management and logging

---

## 📁 Project Structure

```
AI_virtual_assistant/
├── 📁 commands/           # Modular command system
│   ├── BaseCommand.js     # Abstract command class
│   ├── VoiceCommands.js   # Voice-specific commands
│   ├── SystemCommands.js  # OS integration commands
│   ├── ProductivityCommands.js # Notes, todos, timers
│   └── CommandRegistry.js # Command management
├── 📁 controllers/        # Request handlers
│   └── assistantController.js
├── 📁 services/          # External integrations
│   └── llmService.js     # GROQ API integration
├── 📁 routes/            # API endpoints
│   └── virtualRoute.js
├── 📁 views/             # Frontend templates
│   └── main.ejs          # Main UI interface
├── 📁 utils/             # Helper functions
│   ├── platform.js       # OS detection utilities
│   └── logger.js         # Logging system
├── 📁 data/              # Local storage
│   ├── notes.json        # User notes
│   └── todos.json        # Task management
└── 📄 index.js           # Application entry point
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **GROQ API Key** (free at console.groq.com)
- **NewsAPI Key** (free at newsapi.org)

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/jarvis-ai-assistant.git
cd jarvis-ai-assistant/AI_virtual_assistant
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your API keys
GROQ_API_KEY=your_groq_api_key_here
NEWS_API_KEY=your_news_api_key_here
PORT=3000
```

4. **Start the application**
```bash
npm start
# or
node index.js
```

5. **Open in browser**
```
http://localhost:3000
```

---

## 🎯 Usage Examples

### Voice Commands
- 🗣️ **"What time is it?"** - Get current time and date
- 📝 **"Take note: Buy groceries"** - Save a quick note
- ✅ **"Add task: Call dentist"** - Create a todo item
- ⏰ **"Set timer for 5 minutes"** - Start a countdown timer
- 🔆 **"Increase brightness by 20%"** - Adjust screen brightness
- 🎵 **"Open Spotify"** - Launch applications
- 📰 **"Today's news"** - Get latest headlines
- 🌅 **"Start morning routine"** - Execute smart automation
- 💧 **"Water reminder every hour"** - Set health reminders

### Quick Commands (UI Buttons)
- **What time is it?** - Instant time check
- **Take note: Meeting at 3** - Quick note creation
- **Add task: Call John** - Rapid task addition
- **Morning routine** - One-click automation
- **Water reminder every hour** - Health tracking

---

## 🔧 Available Commands

### 📱 **System Control**
| Command | Description | Example |
|---------|-------------|---------|
| `open [app]` | Launch applications | "Open VS Code" |
| `set brightness to [%]` | Control screen brightness | "Set brightness to 75%" |
| `set volume to [%]` | Adjust system volume | "Set volume to 50%" |
| `take screenshot` | Capture screen | "Take a screenshot" |
| `system status` | Check performance | "Show system status" |

### 📝 **Productivity**
| Command | Description | Example |
|---------|-------------|---------|
| `take note: [text]` | Save notes | "Take note: Important meeting" |
| `read notes` | Retrieve saved notes | "Show my notes" |
| `add task: [text]` | Create todo items | "Add task: Buy milk" |
| `todo list` | View pending tasks | "Show my tasks" |
| `complete task: [text]` | Mark tasks done | "Complete task: groceries" |

### ⏰ **Timers & Scheduling**
| Command | Description | Example |
|---------|-------------|---------|
| `set timer for [time]` | Start countdown | "Set timer for 10 minutes" |
| `start stopwatch` | Begin timing | "Start stopwatch" |
| `stop stopwatch` | End timing | "Stop stopwatch" |
| `what time is it` | Current time | "What time is it?" |

### 🏃 **Health & Wellness**
| Command | Description | Example |
|---------|-------------|---------|
| `water reminder every [time]` | Hydration alerts | "Water reminder every hour" |
| `break reminder every [time]` | Work break alerts | "Break reminder every 25 minutes" |
| `posture check` | Posture reminder | "Check my posture" |
| `eye rest` | 20-20-20 rule timer | "Start eye rest" |

---

## 🔌 API Integrations

### GROQ AI Integration
- **Endpoint:** `https://api.groq.com/openai/v1/chat/completions`
- **Model:** `llama3-8b-8192`
- **Features:** Natural language processing, context awareness

### NewsAPI Integration  
- **Endpoint:** `https://newsapi.org/v2/top-headlines`
- **Features:** Real-time news, country-specific headlines

---

##  UI Features

### Design Elements
-  **Animated Grid Background** - Dynamic moving grid pattern
-  **Glassmorphism Effects** - Modern frosted glass containers
-  **Arc Reactor Animation** - Rotating circles with pulsing core
-  **Voice Wave Visualization** - Real-time audio feedback
-  **Status Indicators** - Visual system status with animations

### Interactive Components
-  **Voice Activation Button** - Large, prominent activation
-  **Stop Control** - Emergency stop functionality  
-  **Command History** - Scrollable interaction log
-  **Quick Commands** - One-click common actions
-  **System Information** - Version and status display

---

##  Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Command Development
To add new commands:
1. Create a new command class extending `BaseCommand`
2. Implement `matches()` and `execute()` methods
3. Register in `CommandRegistry.js`
4. Update this README with usage examples

---

## 📊 Data Storage

### Notes Storage
- **Location:** `./data/notes.json`
- **Format:** JSON with timestamp and content
- **Commands:** "take note", "read notes"

### Todo Storage  
- **Location:** `./data/todos.json`
- **Format:** JSON with completion status
- **Commands:** "add task", "todo list", "complete task"

---

##  Troubleshooting

### Common Issues

**Voice Recognition Not Working**
- Check browser permissions for microphone access
- Ensure you're using HTTPS or localhost
- Try Chrome/Edge (better Web Speech API support)

**API Errors**
- Verify your GROQ API key in `.env` file
- Check NewsAPI key validity
- Ensure internet connectivity

**Timer Not Speaking**
- Check system volume settings
- Verify TTS permissions on macOS
- Test with: `say "hello"` in terminal (Mac)

**File Operations Failing**
- Check file system permissions
- Verify paths exist for note/todo storage
- Ensure write permissions in project directory

---

## Acknowledgments

- **OpenAI** - For inspiration in AI assistant design
- **GROQ** - For fast language model inference
- **TailwindCSS** - For beautiful, responsive styling
- **Iron Man/Marvel** - For the JARVIS concept and design inspiration

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/jarvis-ai-assistant/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/jarvis-ai-assistant/discussions)
- **Email:** your.email@example.com

---

<div align="center">

**Made with ❤️ by [Harsh kumar gupta]**

*"Sometimes you gotta run before you can walk."* - Tony Stark

[⭐ Star this repo]
</div>



