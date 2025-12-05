# J.A.R.V.I.S - AI Virtual Assistant

> **Just A Rather Very Intelligent System** - Your personal AI assistant inspired by Tony Stark's JARVIS

![Version](https://img.shields.io/badge/version-2.0.1-blue)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![macOS](https://img.shields.io/badge/macOS-Compatible-brightgreen)
![Windows](https://img.shields.io/badge/Windows-Compatible-brightgreen)
![Linux](https://img.shields.io/badge/Linux-Compatible-brightgreen)

##  Project Overview

JARVIS is a sophisticated AI-powered virtual assistant that combines voice recognition, natural language processing, and system automation to create an intelligent companion for your digital life. Built with modern web technologies and a futuristic UI inspired by Iron Man's JARVIS, this assistant provides seamless voice-controlled interactions and smart automation capabilities.

The system features a beautiful glassmorphism interface with animated backgrounds, arc reactor-style visualizations, and real-time status indicators. It processes voice commands through advanced speech recognition, executes system operations, manages productivity tasks, and provides intelligent responses through integration with the GROQ AI API.

**Key Capabilities:**
-  **Voice-First Interface** - Natural speech recognition and text-to-speech
-  **AI-Powered Responses** - Intelligent conversations using GROQ LLM
-  **System Control** - Native OS automation and app management  
-  **Productivity Suite** - Notes, todos, reminders, and smart routines
-  **Context Awareness** - Remembers commands and learns user patterns
-  **Modular Architecture** - Easily extensible command system

---

##  Features

###  **Core AI Features**
-  Voice recognition with real-time processing
-  Text-to-speech with natural voice synthesis
-  Conversational AI powered by GROQ API
-  Context-aware command interpretation
-  Smart suggestions and quick commands

###  **System Control**
-  Application launcher (VS Code, Spotify, Brave, etc.)
-  Brightness control with voice commands
-  Volume control and audio management
-  Screenshot capture with automatic saving
-  System monitoring (CPU, memory, disk usage)
-  File search and organization

###  **Productivity Suite**
-  **Smart Notes** - Voice-to-text note taking and retrieval
-  **Todo Management** - Task creation, completion tracking
-  **Multi-Timer System** - Multiple named timers with audio alerts
-  **Stopwatch** - Precision timing with voice control
-  **Advanced Calculator** - Math operations and unit conversions
-  **Date & Time** - Current time and date information

###  **Health & Wellness**
-  Water reminders with customizable intervals
-  Posture check reminders
-  Eye rest with 20-20-20 rule timer
-  Break reminders for productivity
-  Wellness routine automation

###  **Smart Routines**
-  **Morning Routine** - Opens calendar, email, news, weather
-  **Work Mode** - Launches dev tools, enables focus mode
-  **End Workday** - Closes work apps, disables notifications
-  **Focus Sessions** - Distraction-free work periods

###  **Information Services**
-  Latest news headlines with Google News integration
-  File search across system directories
-  System performance monitoring
-  Quick web searches and navigation

---

##  Tech Stack

**Frontend:**
-  **EJS Templates** - Server-side rendering
-  **TailwindCSS** - Modern utility-first styling
-  **Custom CSS Animations** - Arc reactor, grid backgrounds, glassmorphism
-  **Web Speech API** - Voice recognition and synthesis

**Backend:**
-  **Node.js & Express** - High-performance server
-  **GROQ API** - Advanced language model integration
-  **NewsAPI** - Real-time news data
-  **File System APIs** - Local data persistence

**Architecture:**
-  **Command Pattern** - Modular, extensible command system
-  **Event-Driven** - Real-time voice processing
-  **JSON Storage** - Lightweight data persistence
-  **Error Handling** - Robust error management and logging

---

##  Project Structure

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

##  Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **GROQ API Key** (free at console.groq.com)
- **NewsAPI Key** (free at newsapi.org)
- **Modern web browser** with Web Speech API support

### **Platform-Specific Requirements**

#### macOS
- macOS 10.14 (Mojave) or later
- Terminal with Accessibility permissions (for advanced features)

#### Windows
- Windows 10 version 1903 or later
- Windows 11 (recommended for best experience)
- PowerShell 5.1+ (usually pre-installed)

#### Linux
- Ubuntu 18.04+, Debian 10+, or equivalent
- Audio system (ALSA/PulseAudio)
- X11 or Wayland display server
- Optional: `espeak` for enhanced TTS

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Harsh9934-debug/AI_virtual_assistant.git
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

##  Usage Examples

### Voice Commands
-  **"What time is it?"** - Get current time and date
-  **"Take note: Buy groceries"** - Save a quick note
-  **"Add task: Call dentist"** - Create a todo item
-  **"Set timer for 5 minutes"** - Start a countdown timer
-  **"Increase brightness by 20%"** - Adjust screen brightness
-  **"Open Spotify"** - Launch applications
-  **"Today's news"** - Get latest headlines
-  **"Start morning routine"** - Execute smart automation
-  **"Water reminder every hour"** - Set health reminders

### Quick Commands (UI Buttons)
- **What time is it?** - Instant time check
- **Take note: Meeting at 3** - Quick note creation
- **Add task: Call John** - Rapid task addition
- **Morning routine** - One-click automation
- **Water reminder every hour** - Health tracking

---

##  Available Commands

###  **System Control**
| Command | Description | Example |
|---------|-------------|---------|
| `open [app]` | Launch applications | "Open VS Code" |
| `set brightness to [%]` | Control screen brightness | "Set brightness to 75%" |
| `set volume to [%]` | Adjust system volume | "Set volume to 50%" |
| `take screenshot` | Capture screen | "Take a screenshot" |
| `system status` | Check performance | "Show system status" |

###  **Productivity**
| Command | Description | Example |
|---------|-------------|---------|
| `take note: [text]` | Save notes | "Take note: Important meeting" |
| `read notes` | Retrieve saved notes | "Show my notes" |
| `add task: [text]` | Create todo items | "Add task: Buy milk" |
| `todo list` | View pending tasks | "Show my tasks" |
| `complete task: [text]` | Mark tasks done | "Complete task: groceries" |

###  **Timers & Scheduling**
| Command | Description | Example |
|---------|-------------|---------|
| `set timer for [time]` | Start countdown | "Set timer for 10 minutes" |
| `start stopwatch` | Begin timing | "Start stopwatch" |
| `stop stopwatch` | End timing | "Stop stopwatch" |
| `what time is it` | Current time | "What time is it?" |

###  **Health & Wellness**
| Command | Description | Example |
|---------|-------------|---------|
| `water reminder every [time]` | Hydration alerts | "Water reminder every hour" |
| `break reminder every [time]` | Work break alerts | "Break reminder every 25 minutes" |
| `posture check` | Posture reminder | "Check my posture" |
| `eye rest` | 20-20-20 rule timer | "Start eye rest" |

---

##  API Integrations

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

##  Data Storage

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

##  Operating System Compatibility

JARVIS is designed to work seamlessly across multiple operating systems with platform-specific optimizations:

###  **Fully Supported Platforms**

####  **macOS** (10.14+ recommended)
- **Voice Commands:** Native `say` command integration
- **System Control:** AppleScript automation
- **App Launching:** Native `open -a` commands
- **Brightness Control:** System Events integration
- **Volume Control:** AppleScript audio management
- **Screenshots:** Native `screencapture` utility
- **File Operations:** Spotlight search (`mdfind`)
- **Special Features:** 
  - Focus mode (Do Not Disturb)
  - System shortcuts integration
  - Native notification sounds

####  **Windows** (10/11)
- **Voice Commands:** PowerShell speech synthesis
- **System Control:** WMI (Windows Management Instrumentation)
- **App Launching:** Native `start` command
- **Brightness Control:** WMI monitor methods
- **Volume Control:** NirCmd or PowerShell audio
- **Screenshots:** PowerShell screen capture
- **File Operations:** `where` command and PowerShell
- **Special Features:**
  - Windows Store app integration
  - Task Manager automation
  - Registry operations (advanced)

####  **Linux** (Ubuntu 18.04+, Debian, CentOS, Fedora)
- **Voice Commands:** `espeak` or `festival` TTS
- **System Control:** SystemD and native Linux commands
- **App Launching:** Desktop file execution
- **Brightness Control:** `xrandr` or `/sys/class/backlight`
- **Volume Control:** ALSA/PulseAudio integration
- **Screenshots:** `scrot` or `gnome-screenshot`
- **File Operations:** `find` and `locate` commands
- **Special Features:**
  - Desktop environment integration (GNOME, KDE, XFCE)
  - Package manager integration

---

##  Platform-Specific Setup

###  **macOS Setup**
```bash
# Enable accessibility permissions for terminal
# System Preferences > Security & Privacy > Accessibility > Add Terminal

# Install optional dependencies
brew install node npm

# For enhanced voice synthesis (optional)
# System Preferences > Accessibility > Spoken Content
```

###  **Windows Setup**
```powershell
# Install Node.js from nodejs.org
# No additional permissions required for basic features

# For enhanced system control (optional)
# Install NirCmd: https://www.nirsoft.net/utils/nircmd.html
# Add to PATH for advanced volume control
```

###  **Linux Setup**
```bash
# Install dependencies
sudo apt update
sudo apt install nodejs npm espeak alsa-utils

# For screenshot functionality
sudo apt install scrot

# For brightness control (laptop users)
# May require adding user to video group
sudo usermod -a -G video $USER
```

---

##  Feature Compatibility Matrix

| Feature | macOS | Windows | Linux | Notes |
|---------|-------|---------|--------|-------|
| **Voice Recognition** | ✅ | ✅ | ✅ | Browser-based, universal |
| **Text-to-Speech** | ✅ | ✅ | ✅ | Native TTS on all platforms |
| **App Launching** | ✅ | ✅ | ✅ | Platform-specific commands |
| **Brightness Control** | ✅ | ✅ | ⚠️ | Linux: Laptop only |
| **Volume Control** | ✅ | ⚠️ | ✅ | Windows: May need NirCmd |
| **Screenshots** | ✅ | ✅ | ✅ | All platforms supported |
| **File Search** | ✅ | ✅ | ✅ | Optimized per platform |
| **System Monitoring** | ✅ | ✅ | ✅ | Cross-platform Node.js |
| **Notes & Todos** | ✅ | ✅ | ✅ | File-based, universal |
| **Timers & Alerts** | ✅ | ✅ | ✅ | All platforms supported |

**Legend:** ✅ Full Support | ⚠️ Partial/Optional | ❌ Not Supported

---

##  Platform Detection

JARVIS automatically detects your operating system and uses appropriate commands:

```javascript
// Automatic platform detection
const platform = process.platform;
// 'darwin' = macOS
// 'win32' = Windows  
// 'linux' = Linux

// Commands adapt automatically
const volumeCommand = {
  darwin: 'osascript -e "set volume 5"',
  win32: 'nircmd.exe setsysvolume 50',
  linux: 'amixer set Master 50%'
};
```

---

## 🌐 Browser Compatibility

### **Web Speech API Support**
- ✅ **Chrome/Chromium** (Recommended) - Full support
- ✅ **Microsoft Edge** - Full support  
- ✅ **Safari** (macOS) - Full support
- ⚠️ **Firefox** - Limited speech recognition
- ❌ **Internet Explorer** - Not supported

### **Recommended Browsers by Platform**
- **macOS:** Chrome, Safari, Edge
- **Windows:** Chrome, Edge
- **Linux:** Chrome, Chromium

---

##  Performance by Platform

### **Optimal Performance**
- **macOS:** Best native integration, fastest voice processing
- **Windows 11:** Excellent performance, modern TTS
- **Windows 10:** Good performance, may need additional setup
- **Linux:** Solid performance, highly customizable

### **Resource Usage**
- **RAM:** ~50-100MB (lightweight)
- **CPU:** Minimal when idle, moderate during voice processing
- **Disk:** ~20MB base installation + data files
- **Network:** Only for AI API calls and news updates

---

##  Platform-Specific Troubleshooting

###  **macOS Issues**

**"Operation not permitted" errors**
- Grant Terminal accessibility permissions
- System Preferences > Security & Privacy > Accessibility

**Voice commands not working**
- Check microphone permissions in browser
- System Preferences > Security & Privacy > Microphone

###  **Windows Issues**

**Volume control not working**
- Install NirCmd utility for advanced audio control
- Some features may require administrator privileges

**PowerShell execution policy**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

###  **Linux Issues**

**Audio/TTS not working**
```bash
# Install audio dependencies
sudo apt install espeak espeak-data
sudo apt install alsa-utils pulseaudio

# Test audio
espeak "Hello World"
```

**Brightness control not working**
```bash
# Add user to video group
sudo usermod -a -G video $USER
# Logout and login again
```

**Permission denied for file operations**
```bash
# Ensure proper permissions
chmod 755 ./data
mkdir -p ./data
```



