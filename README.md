# QuickGist

QuickGist is an application that allows users to generate summaries of YouTube videos using OpenAI's API.

## Technologies Used

- React.js
- Node.js
- TypeScript
- Express
- CORS
- TailwindCSS
- Vite

## Table of Contents

1. [Installation](#installation)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Notes](#notes)
5. [Contact](#contact)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/QuickGist.git
    ```

2. Navigate to the project directory:

    ```bash
    cd QuickGist
    ```

3. Install dependencies for both client and server:

    ```bash
    npm install
    ```

## Setup

1. Install dependencies on the client and server by running `npm install`.
2. Place your OpenAI API key in `server/.env`.
3. Start the client with:

    ```bash
    npm run dev
    ```

4. Start the server with:

    ```bash
    npm start
    ```

## Usage

1. Paste the full YouTube URL into the form. Example:  
   `https://www.youtube.com/watch?v=MtOQhWeTiWY`
2. Press **Get Gist**.
3. Wait a few seconds for the program to generate the summary.
4. The summary will be displayed on the screen.

## Notes

- Make sure to replace `yourusername` with your actual GitHub username in the clone command.
- Ensure you add a valid OpenAI API key in `QuickGist/server/.env` for the application to function properly.

## Contact

For any questions or issues, contact me at:  
**mikeypalermo7@gmail.com**

## Demo

![QuickGist demo](assets/demo.gif)
