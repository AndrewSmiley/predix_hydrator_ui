# Kegurator Frontend
This is the Angular2/Electron Js frontend for Predix Kegurator Project. 

## Setup
First thing is to pull down the code and install all the needed npm packages. If you are on the GE network, you will need to setup proxy settings
```
git clone git@github.build.ge.com:210040001/kegurator_front.git

npm config set proxy http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80
npm config set https-proxy http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80
npm config set registry http://registry.npmjs.org/
npm set strict-ssl false

npm install

```
## Compile
This is not a typical Angnular app due to it running in an Electron context. So we need to compile to make sure the code can be run correctly.
npm compile. 

```
npm run compile
```

## Test 
To run the tests against the angular 2 front end, run the following command. 
```
npm run test-once 
```

## Run 
To execute the program in desktop mode then run the following command 
```
npm start
```
