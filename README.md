# Step 1

## Prerequisites
1. Install node js (Version 14 LTS) from the [official download page](https://nodejs.org/it/download/)
2. Clone this repository:
```
git clone https://github.com/spaghiajoeojo/floppy-qa.git
```

## A quick overview of the code
In this repository we have a boilerplate to code an Electron app.  
```
root folder
├─ src
│  ├─ assets        - images
│  ├─ classes       - javascript objects used in this project
│  ├─ components    - Vue components
│  └─ model         - folder for our ML model
├─ package.json
└─ other configuration files
```
This app is configured with webpack, the entry point of our web application is `index.html`.  
In `main.js` we have the background process logic that is used to create a window and to register a custom protocol schema (`static://`) to load external files (more on that later).  
In `renderer.js` we have all the application logic that will run in the renderer process like a browser.

### Vue
Our application is written using [Vue 3](https://vuejs.org/). You can browse the components already included in the `src/components` folder:
- MessageComponent -> is a simple component used to render a message of a chat 
- DropArea -> we need it to read text from a file dropped or selected
- ChatComponent -> the true core of our application. At this moment it's logic less. 

## Let's start our app
First thing to do is check that everything works:
```
npm start
```
should start our Electron app.

To build our app as an executable we have to run:
```
npm run make
```