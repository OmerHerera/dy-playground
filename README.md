# Multimart Ecommerce

## 📌 Live Demo

[Demo](https://dy-playground.vercel.app/)

## 😎 Features

- Beauty UI similar to ecommerce website
- Fully responsive and mobile friendly
- User can add items to cart
- User can view details of an item
- User can show total price in cart
- In Item page user can add quantity of item to cart instead of click add more and more

## 🚀 What technologies were used?

- react.js (create-react-app)
- react-dom-router
- react-bootstrap
- state management using Context API

## How can you clone and tweak this project?

From your command line, first clone this repo:

```bash
# Clone this repository
$ https://github.com/0mar-helal/multimart-react-ecommerce.git

# Go into the repository
$ cd multimart-react-ecommerce

# Remove current origin repository
$ git remote remove origin

```

Then you can install the dependencies using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm start

## or using https server but only after running Certificate for localhost steps
$  npm run start-http
```

👨‍💻 Happy coding!

---

### Certificate for localhost

#### Generating the certificate

- Open a terminal and run the following command:

```bash
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout dy-playground.com.key -out dy-playground.com.crt -extensions san -config \
  <(echo "[req]"; 
    echo distinguished_name=req; 
    echo "[san]"; 
    echo subjectAltName=DNS:dy-playground.com,IP:10.0.0.1,IP:127.0.0.1
    ) \
  -subj "/CN=dy-playground.com"
```

- In the terminal run the following command:

```bash
echo '127.0.0.1 dy-playground.com' | sudo tee -a /etc/hosts
```

- Once we have the certificates ready, we need to trust them. Just double click on the certificate dy-playground.com.crt to install it.

