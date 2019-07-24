# Gentlestudent
Gentlestudent is an application that allows learners to engage in learning opportunities. Companies can issue a learning opportunities and learners can choose to participate. After completing a learning opportunity, the learner is rewarded with an open badge, which is a verifiable record of their learning. This way, Gentlestudent stimulates informal learning and teaches valuable lessons about community life and social engagement.

Click [here](https://osoc19.github.io/gentlestudent-web) to navigate to the GitHub page.

## Contents
- [Installation Guide](#installation-guide)
- [Deployment](#deployment)
- [About Gentlestudent](#about-gentlestudent)
- [The Future](#possible-future)
- [Used Tools and Frameworks](#used-tools-and-frameworks)
- [The Team](#the-team)
- [License](#license)
- [References](#references)

## Installation Guide
Clone or download the code and add a .env file to the project root. The .env file looks like this
```
REACT_APP_FIREBASE_API_KEY=FIREBASEAPIKEY
REACT_APP_FIREBASE_AUTH_DOMAIN=gentle-student.firebaseapp.com
REACT_APP_DATABASE_URL=https://gentle-student.firebaseio.com
REACT_APP_PROJECT_ID=gentle-student
REACT_APP_STORAGE_BUCKET=gentle-student.appspot.com
REACT_APP_MESSAGING_SENDER_ID=FIREBASEMESSAGINGSENDERID
```
Install the required dependencies
```
npm install
```
Run the project on local machine with this command
```
npm start
```

## Deployment
Deploying this app is as easy as running this command from the project root
```
firebase deploy
```
For this command, you need to have the firebase tools installed. 
```
npm install -g firebase-tools
```
This will install firebase tools globally. <br>
The running version of the Gentlestudent website can be found [here](https://gentlestudent.gent/) after deployment.

## About Gentlestudent
Gentlestudent is an application which allows learners, mainly students, to participate in learning opportunities outside school. There are two categories of opportunities.

1. Learning opportunities: learning opportunities are offered by verified organisations and companies. Learners can sign up for those experiences, and the organisation validates their participation. When a learner finishes a learning opportunity, he/she is rewarded with an [Open Badge](https://openbadges.org/). Those Open Badges prove that you have acquired a certain skill or knowledge. They can be used in, for example, a job interview when they ask you how you can differentiate yourself from other people with the same degree. Badges can be compared with endorsements on LinkedIn.

2. Quests: quests are smaller opportunities with less weight than the previously discussed ones. Everyone can create quests for everyone. This encourages informal learning. A quest can for example be 'I need help with design in CSS, can someone help?'. People with knowledge of design and css then have the option to sign up for this quest. The creator of the quest can pick a subscribed user to come and help him/her. If someone successfully finishes a quest, he/she is rewarded with a token. Tokens have less value than badges. It is a sign of apprecation given by the creator of the quest.

Quests are in an early stage of development and may contain bugs. The version of quests is a prototype of the concept and does not have all functionality we planned. This feature is complementary with the mobile application: together they show the full possible functionality.

## Possible Future
Gentlestudent is not finished yet. Open Summer of code 2019 comes to an end and we still have some ideas which might be interesting for the future of this application. In this section we will focus on the Quest part of Gentlestudent. 

- Right now, users can get tokens for finishing quests. Those tokens don't really have any value right now. A possible improvement for the future might be a progress system. After reaching a certain amount of tokens, users can trade them for an Open Badge which contains a reference to all quests that user did. 

- Right now, quests only have one icon. In the future it can be interesting if users can create their own quest icon, or at least be able to pick an icon from some presets. This can add a personal touch to the whole questing part.

## Used Tools and Frameworks
- [React](https://reactjs.org/) for the core of the web application.
- [Leaflet API](https://leafletjs.com/) for the [OpenStreetMap](https://www.openstreetmap.org/) displays.
- [Google Firebase](https://firebase.google.com/) as a backend service.
- [Badgr API](https://badgr.io/) for creation and management of Open Badges

## The Team
| Member        | Function          |
| ------------- |:-------------:| 
| Bert Jehoul     | Coach |
| Bram De Coninck    | Lead Developer & Mobile Developer |
| Maxim De Geyter | Designer & Front-end Developer | 
| Hamza Mahmoudi | Tester & Front-end Developer | 
| Olivia Fontes de Mello | Communication Manager | 
| Freek De Sagher | Front-end Developer | 

## License
This project is MIT licensed. View [LICENSE](./LICENSE) for details.

## References
- [Mobile application repository](https://github.com/oSoc19/gentlestudent-mobile)
- [oSoc19 website](https://2019.summerofcode.be/2019/gentlestudent)
- [Artevelde University of Applied Sciences documentation](https://drive.google.com/drive/folders/1vkDLn_qmJT_vRxGx8hoCRRXEcHTxpjwi)
- [oSoc18 code repository](https://github.com/oSoc18/gentlestudent)
- [Badgr API documentation](https://api.badgr.io/)
