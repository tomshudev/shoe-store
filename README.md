# show-store

This repository is consisted of two parts, the backend and frontend, the backend is developed using NodeJS and the frontend using ReactJS
For both parts I used TypeScript to help me better understand what each type consists and ease up my development

For the backend I used express as a library to start the server, it has 3 routes:
1. Health check
2. Scraping endpoint - gets a mandatory array of urls
3. Prodcuts endpoint - gets an optional query for filtering products

For the scraping I used `cheerio`, that gives me an object I can use to query and find elements in the DOM
In order to batch scan, I am using some javascript syntax that lets me await till all chunks are done
The products are stored as a key/value map in order to prevent some duplicated products
There is a map that is called `models` it is a map between a dmonain string to the `ExtractionModel`
Each `ExtractionModel` is an object that has a `scrape` function that gets a url and return a product

For the frontend I used `ReactQuery` and `axios` for fetching and managing loading state for the application
The application is divided into two parts, the URL scraping part and the products display
The URL scraping part has an input to insert a url, once the user is done he can click on scrape, which will go to the server and scrape all the urls
The Products part has a seach input, a list of products in the current page and buttons to go between pages
The pagination is done inside the application and not in the server
I used `tailwindcss` for the design and CSS, and I used `react-icons` for the icons
The frontend also using `dotenv` to load the environment variables, in this case the server URL
