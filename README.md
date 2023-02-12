### Built With

- NodeJs
- Mongoose
- Compromise
- Express
- Axios

<!-- GETTING STARTED -->

### Prerequisites

- NodeJs

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/YoussefWasfy/DeriveQuestions.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Copy the Example.env file and fill in the database url, database name, and server port

4. Run the server
   ```
   npm run start
   ```

<!-- USAGE EXAMPLES -->

## Usage

There are two endpoints that could be called:

1. `/articles` <br>
   ```
   [
    {
        "articleId": "Article Id",
        "articleName": "Article Name",
        "articleText": "Article text"
        "questions": [Questions]
    }
   ]
   ```
1. `/articles/<articleId>` <br>

   ```
    {
        "articleId": "Article Id",
        "articleName": "Article Name",
        "articleText": "Article text"
        "questions": [Questions]
    }
   ```
