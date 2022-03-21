# Currency Pair Alert Bot

A bot that alerts on currency price oscillations

## Installation

1. Make sure your machine has docker installed. [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. Clone into your desired directory 
```
git clone https://github.com/pgzisis/currency-pair-alert-bot.git
```

3. Change directory into the project's root directory
```
cd currency-pair-alert-bot
```

4. Start the bot
```
docker-desktop up -d
```

## Usage

To view alerts from the bots logs
```
docker logs -f bot
```

To view alerts from the database use adminer:
1. Open your browser at `localhost:8080`
2. Use the following login credentials:
   * System: PostgreSQL
   * Server: postgres
   * Username: bot
   * Password: password
   * Database: alerts
3. Click on the `alert` table
4. Click `Select data`

To change currency pairs, fetch interval or price oscillation percentage
1. Modify the environment variables in `docker-compose.yml` under `bot`
2. Restart the bot
```
docker-compose down && docker-compose up -d
```

To run the tests:
1. Install Node.js in your machine. [Download Node.js](https://nodejs.org/en/download/)
2. Install the project's dependencies
```
npm install
```
3. Run the tests
```
npm run test
```