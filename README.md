# NeonSandbox - Interactive Code Playground

A modern, neon-themed code sandbox for Go, JavaScript, and Python with real-time execution.

## Features

- 🎨 Neon-themed UI with dark mode
- 💻 Support for multiple programming languages
  - JavaScript
  - Python
  - Go
- 🔒 Secure authentication with Clerk
- 💾 Save and manage your code snippets
- ⚡ Real-time code execution
- 📱 Responsive split-screen layout

## Tech Stack

- Next.js 14 with App Router
- Redux Toolkit for state management
- Clerk for authentication
- Monaco Editor for code editing
- Tailwind CSS & Shadcn UI for styling
- PostgreSQL (Neon) for database
- Prisma as ORM

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/JasonPaulino/neonsandbox.git
   cd neonsandbox
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   DATABASE_URL=your_neon_db_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
