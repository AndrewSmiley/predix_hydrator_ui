# Kegurator Frontend
This is the Angular2/Electron Js frontend for Predix Kegurator Project. 

## Setup & Running on Internet 
These are the instructions for setting up the UI on a raspberry pi connected to internet 

### Pull from public git hub & install
Make sure that all proxy settings have been REMOVED

```
git clone git@github.com:azzmodious/predix_hydrator_ui.git
npm install
```
### Configure
You need to open up the app/common/kegurator/kegurator.service.ts and change the port to match the one being used for the rest api

```
private kegURL = 'http://localhost:1337';
```

### Run 
Now just run the start script to compile and run the ui. 
MAKE SURE THE KEGURATOR REST API IS RUNNING FIRST
```
npm start
```

## Troubleshooting 

### When trying to start there is an error complaining about not being able to find webdrivers etc....
You need to install the selenium web drivers
```
npm install @types/selenium-webdriver@2.53.36 --save-dev
npm start
```

# Useful Scripts 

## Unset Proxies 
```
npm config rm proxy
npm config rm https-proxy

```

## NPM Proxies and stuff

```
npm config set proxy http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80
npm config set https-proxy http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80
npm config set registry http://registry.npmjs.org/
npm set strict-ssl false
```