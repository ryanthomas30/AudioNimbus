Bootstrapped with create-react-app

## AudioNimbus

AudioNimbus is an audio distribution web application for uploading music, podcasts, and other audio, enabling users to share their original audio content.

## Running Locally

#### Clone Repo

`git clone https://github.com/ryanthomas30/AudioNimbus.git`

#### Move Into AudioNimbus Folder

`cd ~/AudioNimbus`

#### Install FrontEnd Dependencies

`npm install`

#### Move Into AudioNimbus server Folder

`cd ~/AudioNimbus/server`

#### Install BackEnd Dependencies

`npm install`

#### Add config.js

Add a file called `config.js` containing:

`module.exports={
  secret: '<String>'
};`

*Replace <String> with any string of 10 or more characters
  
#### Install MongoDB

https://www.mongodb.com/download-center?jmp=nav#community

#### Run MongoDB

https://docs.mongodb.com/manual/installation/

Scroll down to "Tutorials" and follow instructions based on operating system. Add `mongod.exe` to your path.

#### Running Applications

In 3 separate instances of terminal/command prompt, please run these commands:

In `~/AudioNimbus` run `npm start`

In `/AudioNimbus/server` run `npm run dev`

Anywhere, run `mongod` 

Open your browser and visit: `http://localhost:3000/`



