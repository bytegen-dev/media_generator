# Text to Media Generator

(WIP)

<img width="1367" height="1197" alt="image" src="https://github.com/user-attachments/assets/95d09475-12d3-4118-b19c-7e8c287f36de" />

## Features

### Multi-Engine Support

- **Free Engines**: Pollinations.AI, AI Horde (no API key required)
- **Premium Engines**: OpenAI DALL-E, Google Gemini, xAI Grok, Midjourney, Cloudflare Workers AI, Hugging Face, Modelslab
- **Real-time Generation**: Stream results as they complete
- **Parallel Processing**: Multiple engines run simultaneously

### Media Types

- **Images**: Currently available with all engines
- **Videos**: Coming soon
- **Audio**: Coming soon

### Advanced Features

- **Responsive Design**: Mobile-first with hamburger menu
- **Dark Mode**: Beautiful dark theme throughout
- **Real-time Updates**: Images appear as soon as each engine completes
- **API Key Management**: Secure local storage of API keys
- **Search & Filter**: Find engines by name or media type
- **Download Options**: Save generated images directly
- **Recent Prompts**: Local storage of generation history

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **API Calls**: SWR for data fetching
- **3D Graphics**: Three.js (ASCII text background)
- **Icons**: Lucide React + React Icons (Font Awesome 6)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bytegen-dev/text-to-media-generator.git
   cd text-to-media-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### API Keys Setup

1. **Navigate to Settings**

   - Click the "Settings" tab in the navigation
   - Or visit `/settings` directly

2. **Add Your API Keys**

   - **OpenAI**: Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - **Google Gemini**: Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **xAI Grok**: Get your key from [xAI Console](https://console.x.ai)
   - **Midjourney**: Get your key from [Apiframe](https://apiframe.ai)
   - **Cloudflare**: Get your token from [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - **Hugging Face**: Get your key from [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - **Modelslab**: Get your key from [Modelslab](https://modelslab.com)

3. **Save and Start Generating**
   - Keys are stored locally in your browser
   - No data is sent to our servers

## Usage

### Basic Generation

1. **Select Media Type**

   - Choose between Images, Videos, or Audio
   - Currently only Images are available

2. **Enter Your Prompt**

   - Describe what you want to generate
   - Be specific and detailed for better results

3. **Choose AI Engines**

   - Select from available engines
   - Free engines work immediately
   - Premium engines require API keys

4. **Configure Settings**

   - Set image size (default: 512x512)
   - Choose number of images (1-4)

5. **Generate**
   - Click "Generate Images"
   - Watch results appear in real-time
   - Download individual images

### Advanced Features

- **Search Engines**: Use the search bar in Settings to find specific engines
- **Filter by Media Type**: Filter engines by supported media types
- **Reset All Keys**: Clear all saved API keys with confirmation
- **Mobile Menu**: Full-screen mobile navigation with social links

## UI Components

### Navigation

- **Desktop**: Clean tab navigation
- **Mobile**: Hamburger menu with full-screen overlay
- **Logo**: Custom favicon and branding

### Pages

- **Home** (`/`): Main generation interface
- **Settings** (`/settings`): API key management
- **Help** (`/help`): Comprehensive documentation

### Components

- **ImageGeneratorForm**: Main input form
- **ResultsGrid**: Real-time results display
- **SettingsForm**: API key management
- **Navigation**: Responsive navigation bar
- **Footer**: Social links and branding

## Security

- **Local Storage**: API keys stored only in your browser
- **No Server Storage**: Keys never sent to our servers
- **Secure Transmission**: HTTPS for all API calls
- **Input Validation**: Zod schema validation for all forms

## API Integrations

### Free Engines

- **Pollinations.AI**: High-quality image generation
- **AI Horde**: Community-driven distributed generation

### Premium Engines

- **OpenAI DALL-E**: Advanced image generation
- **Google Gemini**: Google's multimodal AI
- **xAI Grok**: xAI's generative model
- **Midjourney**: Professional image generation via Apiframe
- **Cloudflare Workers AI**: Fast, scalable inference
- **Hugging Face**: Access to open-source models
- **Modelslab**: Various AI models via single API

## Mobile Experience

- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets and gestures
- **Hamburger Menu**: Full-screen navigation overlay
- **Social Links**: Quick access to social profiles
- **Smooth Animations**: Fluid transitions and interactions

## Performance

- **Streaming Results**: Images appear as they complete
- **Parallel Processing**: Multiple engines run simultaneously
- **Optimized Images**: Next.js Image optimization
- **Lazy Loading**: Components load as needed
- **Caching**: SWR for efficient data fetching

## Development

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── settings/         # Settings page
│   ├── help/             # Help page
│   └── api/              # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Footer.tsx        # Footer component
│   └── ...
├── constants/            # App constants
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript types
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Bytegen**

- GitHub: [@bytegen-dev](https://github.com/bytegen-dev)
- Twitter: [@bytegen_dev](https://x.com/bytegen_dev)
- Website: [bytegen.dev](https://bytegen.dev)

## Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Next.js** team for the amazing framework
- **Tailwind CSS** for utility-first styling
- **Three.js** for 3D graphics capabilities
- **All AI service providers** for their powerful APIs

---

**Non-profit project for fun only**
