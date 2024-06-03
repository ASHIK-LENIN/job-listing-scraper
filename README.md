# Job Scraper

This project is a web scraper that extracts job listings from [SkipTheDrive](https://www.skipthedrive.com) and stores them in a MongoDB Atlas database.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Scraper](#running-the-scraper)


## Features

- Scrapes job listings from the specified webpage.
- Extracts job details including title, company, location, and description.
- Saves job listings to MongoDB Atlas.

## Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or later)
- npm (version 6 or later)

## Installation

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/ASHIK-LENIN/job-listing-scraper.git
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory of the project and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_connection_string
    ```

   Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

## Running the Scraper

To run the scraper, use the following command:

```sh
npm start
 ```



### Detailed Setup and Running Instructions

1. **Clone the repository**

    Open your terminal and run the following command to clone the repository:

    ```sh
     git clone https://github.com/ASHIK-LENIN/job-listing-scraper.git
    ```

2. **Install Dependencies**

    Run the following command to install the required dependencies:

    ```sh
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory of the project with the following content:

    ```env
    MONGO_URI=your_mongodb_connection_string
    ```

    Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

4. **Run the Scraper**

    Run the scraper with the following command:

    ```sh
    npm start
    ```

    This will start the scraper, which will fetch job listings from [SkipTheDrive](https://www.skipthedrive.com) and save them to your MongoDB Atlas database.

5. **Verify the Data in MongoDB**

    After running the scraper, you can verify that the data has been saved in your MongoDB Atlas database by using a MongoDB client or the MongoDB Atlas web interface.

By following these steps, you will be able to set up and run the job scraper locally. If you encounter any issues or have questions, feel free to open an issue in the repository.


