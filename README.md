Bootstrapped with create-react-app

## AudioNimbus

AudioNimbus is an audio distribution web application for uploading music, podcasts, and other audio, enabling users to share their original audio content.

## Running Locally

#### Clone Repo

`git clone https://github.com/ryanthomas30/AudioNimbus.git`

#### Move Into AudioNimbus Folder

`cd ~/AudioNimbus`

#### Install Dependencies

`npm install`

#### Add Environment Variables

Add a file called `.env` in the root directory `~/AudioNimbus` containing:

```
MONGODB_URI=mongodb://localhost:auth/auth
SECRET=<STRING>
```

*Set SECRET to any string of 10 or more characters*
  
#### Download MongoDB

https://www.mongodb.com/download-center?jmp=nav#community

#### Install MongoDB

https://docs.mongodb.com/manual/installation/

Scroll down to "Tutorials" and follow instructions based on operating system. Add `mongod.exe` to your path.

#### Running Applications

In 3 separate instances of terminal/command prompt, please run these commands:

In `~/AudioNimbus` run `npm run dev` and `npm run dev-server`

Anywhere, run `mongod` 

Open your browser and visit: `http://localhost:3000/`

This is my edit for the in class assignment.
