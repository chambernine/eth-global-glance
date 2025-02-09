# Glance AI Agent

An AI-powered polling platform that transforms social media insights into engaging interactive polls. Glance AI Agent allows users to generate polls based on trending topics and gauge public sentiment through a simple, intuitive interface.

## Features

- 🤖 **AI-Driven Analysis**: Automatically generates polls from social media trends
- 📊 **Dynamic Polling**: Create Yes/No or multiple-choice polls instantly
- 🔍 **Keyword-Based Content**: Get curated content by entering relevant keywords
- 📈 **Sentiment Analysis**: Track and analyze public opinion on trending topics

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org) - React framework for production

### Authentication & Blockchain
- [Privy](https://privy.io) - Secure user authentication
- Privy Server Wallet - Secure transaction management
- [Viem](https://viem.sh) - Balance checks and transaction handling

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/chambernine/glance-ai-agent.git
cd glance-ai-agent
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
└── lib/          # Utility functions and configurations
```

## Contributing

We welcome contributions to Glance AI Agent! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built during ETHGlobal Hackathon
- Powered by Next.js and Privy

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

---

Made with ❤️ by the Glance AI Agent Team
