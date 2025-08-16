// GovEase Database Restoration Script
// Generated: 2025-08-16T18:13:54.710Z

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');

// Your Firebase config
const firebaseConfig = {
  // Add your Firebase configuration here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const databaseData = {
  "exportInfo": {
    "projectId": "bitbybit-govease",
    "exportDate": "2025-08-16T18:13:50.639Z",
    "description": "Complete GovEase Firebase Database Export",
    "version": "1.0.0"
  },
  "collections": {
    "users": {
      "count": 69,
      "documents": [
        {
          "id": "1v1EdpNKmiWRH4MAwx9fKxbsYpO2",
          "data": {
            "nic": "555666777V",
            "phone": "+94775556677",
            "name": "Kumari Silva",
            "updatedAt": "2025-08-16T18:05:58.872Z",
            "department": "Administration",
            "position": "System Administrator",
            "createdAt": "2024-01-15T08:00:00.000Z",
            "permissions": [
              "view_all",
              "manage_users",
              "manage_departments",
              "view_analytics",
              "system_settings"
            ],
            "role": "admin",
            "email": "admin.demo@govease.lk"
          }
        },
        {
          "id": "7Vtjt9mL15Qs6G3MI5kpS6eAfix1",
          "data": {
            "updatedAt": "2025-08-16T17:59:49.288Z",
            "phone": "0742340024",
            "name": "john doe",
            "email": "sithumlimethaya2007@gmail.com",
            "nic": "7417410741v",
            "role": "citizen",
            "createdAt": "2025-08-16T17:59:49.288Z"
          }
        },
        {
          "id": "EhGMRj9X4DZ8SwYbugOHmhZVwOy1",
          "data": {
            "nic": "1212121212",
            "role": "citizen",
            "phone": "12121212121",
            "email": "methikafernando25@gmail.com",
            "updatedAt": "2025-08-16T16:45:41.953Z",
            "name": "Methika ",
            "createdAt": "2025-08-16T16:45:41.953Z"
          }
        },
        {
          "id": "NbmLbQBKNFRoNxb3dtBs6ZhpUcy2",
          "data": {
            "nic": "123456789V",
            "email": "test@example.com",
            "createdAt": "2025-08-16T16:39:34.279Z",
            "phone": "+94701234567",
            "role": "citizen",
            "name": "Test User",
            "updatedAt": "2025-08-16T16:39:34.279Z"
          }
        },
        {
          "id": "Rq6AMCE9becKXd0OvuoakcTH8e73",
          "data": {
            "email": "sithumlimethaya2007@gmail.com",
            "name": "john doe",
            "role": "citizen",
            "createdAt": "2025-08-16T17:49:41.544Z",
            "updatedAt": "2025-08-16T17:49:41.544Z",
            "phone": "07423022252",
            "nic": "7417410741v"
          }
        },
        {
          "id": "YvjIaeOMkmSc5nvat3AJ8JAO3Es1",
          "data": {
            "phone": "0742340052",
            "createdAt": "2025-08-16T16:46:49.464Z",
            "role": "citizen",
            "nic": "123456789v",
            "updatedAt": "2025-08-16T16:46:49.464Z",
            "email": "sithumlimethaya2007@gmail.com",
            "name": "john doe"
          }
        },
        {
          "id": "demo-admin-001",
          "data": {
            "nic": "555666777V",
            "phone": "+94775556677",
            "role": "admin",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "email": "admin.demo@govease.lk",
            "uid": "demo-admin-001",
            "name": "Kumari Silva"
          }
        },
        {
          "id": "demo-admin-002",
          "data": {
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "nic": "111222333V",
            "name": "Lakshman Abeysinghe",
            "phone": "+94771112223",
            "email": "super.admin@govease.lk",
            "role": "admin",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "uid": "demo-admin-002"
          }
        },
        {
          "id": "demo-citizen-001",
          "data": {
            "createdAt": "2025-08-16T17:48:38.298Z",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "phone": "+94771234567",
            "email": "citizen.demo@govease.lk",
            "nic": "123456789V",
            "uid": "demo-citizen-001",
            "role": "citizen",
            "name": "Amal Perera"
          }
        },
        {
          "id": "demo-citizen-002",
          "data": {
            "createdAt": "2025-08-16T17:48:38.298Z",
            "email": "nimal.silva@gmail.com",
            "phone": "+94772345678",
            "role": "citizen",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "uid": "demo-citizen-002",
            "nic": "234567890V",
            "name": "Nimal Silva"
          }
        },
        {
          "id": "demo-citizen-003",
          "data": {
            "phone": "+94773456789",
            "email": "sita.fernando@yahoo.com",
            "role": "citizen",
            "uid": "demo-citizen-003",
            "nic": "345678901V",
            "name": "Sita Fernando",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "createdAt": "2025-08-16T17:48:38.298Z"
          }
        },
        {
          "id": "demo-citizen-004",
          "data": {
            "uid": "demo-citizen-004",
            "name": "Kamal Jayasinghe",
            "email": "kamal.jayasinghe@hotmail.com",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "role": "citizen",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "nic": "456789012V",
            "phone": "+94774567890"
          }
        },
        {
          "id": "demo-citizen-005",
          "data": {
            "email": "priya.wickramasinghe@gmail.com",
            "name": "Priya Wickramasinghe",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "nic": "567890123V",
            "phone": "+94775678901",
            "role": "citizen",
            "uid": "demo-citizen-005",
            "updatedAt": "2025-08-16T17:48:38.298Z"
          }
        },
        {
          "id": "demo-citizen-006",
          "data": {
            "updatedAt": "2025-08-13T21:27:42.013Z",
            "uid": "demo-citizen-006",
            "createdAt": "2025-07-11T12:44:55.364Z",
            "nic": "842989697V",
            "phone": "+940729395385",
            "role": "citizen",
            "name": "Anushka Rathnayake",
            "email": "citizen1@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-007",
          "data": {
            "uid": "demo-citizen-007",
            "email": "citizen2@demo.govease.lk",
            "role": "citizen",
            "name": "Hasitha Dharmasena",
            "updatedAt": "2025-07-31T01:11:23.238Z",
            "nic": "782409270V",
            "createdAt": "2025-04-13T03:04:30.387Z",
            "phone": "+940769396927"
          }
        },
        {
          "id": "demo-citizen-008",
          "data": {
            "updatedAt": "2025-08-15T11:10:43.847Z",
            "role": "citizen",
            "email": "citizen3@demo.govease.lk",
            "uid": "demo-citizen-008",
            "createdAt": "2025-07-18T06:42:46.214Z",
            "phone": "+940779433843",
            "name": "Jagath Wimalasiri",
            "nic": "972874570V"
          }
        },
        {
          "id": "demo-citizen-009",
          "data": {
            "phone": "+940709389157",
            "updatedAt": "2025-07-21T05:21:12.296Z",
            "role": "citizen",
            "createdAt": "2025-04-15T21:48:26.104Z",
            "name": "Iresha Samaraweera",
            "uid": "demo-citizen-009",
            "nic": "772757285V",
            "email": "citizen4@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-010",
          "data": {
            "email": "citizen5@demo.govease.lk",
            "updatedAt": "2025-08-14T11:42:59.173Z",
            "uid": "demo-citizen-010",
            "nic": "763346641V",
            "name": "Ganga Wijesekara",
            "createdAt": "2025-02-18T21:14:09.060Z",
            "phone": "+940765140609",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-011",
          "data": {
            "phone": "+940723467500",
            "name": "Hasitha Dharmasena",
            "email": "citizen6@demo.govease.lk",
            "createdAt": "2025-07-22T05:10:58.105Z",
            "uid": "demo-citizen-011",
            "role": "citizen",
            "nic": "873299440V",
            "updatedAt": "2025-07-27T05:25:35.833Z"
          }
        },
        {
          "id": "demo-citizen-012",
          "data": {
            "phone": "+940721505523",
            "role": "citizen",
            "createdAt": "2025-07-24T07:50:04.633Z",
            "nic": "842980199V",
            "name": "Waseem Akram",
            "email": "citizen7@demo.govease.lk",
            "uid": "demo-citizen-012",
            "updatedAt": "2025-08-16T16:42:12.867Z"
          }
        },
        {
          "id": "demo-citizen-013",
          "data": {
            "phone": "+940774574469",
            "createdAt": "2025-04-29T18:26:05.865Z",
            "name": "Buddhika Silva",
            "role": "citizen",
            "email": "citizen8@demo.govease.lk",
            "uid": "demo-citizen-013",
            "nic": "801926380V",
            "updatedAt": "2025-08-01T19:00:22.916Z"
          }
        },
        {
          "id": "demo-citizen-014",
          "data": {
            "nic": "733216264V",
            "createdAt": "2025-05-09T20:52:27.290Z",
            "role": "citizen",
            "name": "Zenith Cooray",
            "updatedAt": "2025-07-21T18:43:41.779Z",
            "uid": "demo-citizen-014",
            "phone": "+940778684486",
            "email": "citizen9@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-015",
          "data": {
            "role": "citizen",
            "name": "Wasantha Munasinghe",
            "email": "citizen10@demo.govease.lk",
            "phone": "+940751088185",
            "createdAt": "2025-06-18T10:44:29.363Z",
            "nic": "861487204V",
            "uid": "demo-citizen-015",
            "updatedAt": "2025-07-25T10:27:26.938Z"
          }
        },
        {
          "id": "demo-citizen-016",
          "data": {
            "uid": "demo-citizen-016",
            "updatedAt": "2025-08-13T20:54:45.347Z",
            "email": "citizen11@demo.govease.lk",
            "createdAt": "2025-05-19T01:10:29.485Z",
            "phone": "+940707602572",
            "nic": "743469580V",
            "name": "Vimukthi Weeratunga",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-017",
          "data": {
            "email": "citizen12@demo.govease.lk",
            "name": "Lalitha Wijeratne",
            "phone": "+940724704642",
            "role": "citizen",
            "updatedAt": "2025-08-07T03:36:58.485Z",
            "nic": "781067668V",
            "uid": "demo-citizen-017",
            "createdAt": "2025-08-02T00:09:04.875Z"
          }
        },
        {
          "id": "demo-citizen-018",
          "data": {
            "name": "Yasas Samarawickrama",
            "createdAt": "2025-03-20T17:57:59.524Z",
            "nic": "851271579V",
            "role": "citizen",
            "email": "citizen13@demo.govease.lk",
            "uid": "demo-citizen-018",
            "phone": "+940767782821",
            "updatedAt": "2025-08-07T17:24:09.525Z"
          }
        },
        {
          "id": "demo-citizen-019",
          "data": {
            "name": "Xiomara Peris",
            "role": "citizen",
            "updatedAt": "2025-08-10T11:49:16.628Z",
            "nic": "740435894V",
            "uid": "demo-citizen-019",
            "createdAt": "2025-04-14T13:22:17.775Z",
            "phone": "+940721896937",
            "email": "citizen14@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-020",
          "data": {
            "nic": "792624970V",
            "role": "citizen",
            "name": "Kushani Wickremaratne",
            "phone": "+940716275534",
            "updatedAt": "2025-08-12T20:31:42.054Z",
            "createdAt": "2025-06-05T09:13:03.032Z",
            "uid": "demo-citizen-020",
            "email": "citizen15@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-021",
          "data": {
            "phone": "+940719627429",
            "uid": "demo-citizen-021",
            "name": "Fasika Kariyawasam",
            "updatedAt": "2025-07-22T19:23:28.150Z",
            "email": "citizen16@demo.govease.lk",
            "createdAt": "2025-03-24T05:01:16.356Z",
            "role": "citizen",
            "nic": "950120413V"
          }
        },
        {
          "id": "demo-citizen-022",
          "data": {
            "updatedAt": "2025-07-27T13:13:30.461Z",
            "nic": "833535397V",
            "role": "citizen",
            "name": "Dinesh Jayasinghe",
            "phone": "+940778669087",
            "uid": "demo-citizen-022",
            "createdAt": "2025-04-19T23:58:20.886Z",
            "email": "citizen17@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-023",
          "data": {
            "name": "Ganga Wijesekara",
            "updatedAt": "2025-07-24T15:44:22.142Z",
            "uid": "demo-citizen-023",
            "phone": "+940774839026",
            "role": "citizen",
            "createdAt": "2025-03-29T23:48:35.721Z",
            "email": "citizen18@demo.govease.lk",
            "nic": "871619923V"
          }
        },
        {
          "id": "demo-citizen-024",
          "data": {
            "role": "citizen",
            "email": "citizen19@demo.govease.lk",
            "updatedAt": "2025-07-23T06:37:04.306Z",
            "uid": "demo-citizen-024",
            "nic": "902560980V",
            "phone": "+940754071561",
            "name": "Fasika Kariyawasam",
            "createdAt": "2025-08-02T08:41:01.174Z"
          }
        },
        {
          "id": "demo-citizen-025",
          "data": {
            "createdAt": "2025-07-30T22:16:01.193Z",
            "name": "Lasith Embuldeniya",
            "updatedAt": "2025-08-14T18:31:22.457Z",
            "nic": "810274789V",
            "email": "citizen20@demo.govease.lk",
            "uid": "demo-citizen-025",
            "phone": "+940753061972",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-026",
          "data": {
            "updatedAt": "2025-07-24T14:14:42.235Z",
            "email": "citizen21@demo.govease.lk",
            "createdAt": "2025-06-05T18:33:38.313Z",
            "name": "Nayana Randunu",
            "phone": "+940765885578",
            "nic": "892565429V",
            "role": "citizen",
            "uid": "demo-citizen-026"
          }
        },
        {
          "id": "demo-citizen-027",
          "data": {
            "createdAt": "2025-06-25T10:51:07.257Z",
            "updatedAt": "2025-08-04T03:51:13.055Z",
            "email": "citizen22@demo.govease.lk",
            "uid": "demo-citizen-027",
            "name": "Vindya Herath",
            "phone": "+940782648690",
            "nic": "963036135V",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-028",
          "data": {
            "createdAt": "2025-05-16T21:51:27.467Z",
            "nic": "783284165V",
            "updatedAt": "2025-08-07T15:51:56.869Z",
            "uid": "demo-citizen-028",
            "email": "citizen23@demo.govease.lk",
            "phone": "+940751906365",
            "name": "Fathima Rasheed",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-029",
          "data": {
            "updatedAt": "2025-08-13T18:55:48.077Z",
            "phone": "+940773918976",
            "createdAt": "2025-07-25T18:47:05.336Z",
            "uid": "demo-citizen-029",
            "email": "citizen24@demo.govease.lk",
            "nic": "971042283V",
            "role": "citizen",
            "name": "Prasanna Hettiarachchi"
          }
        },
        {
          "id": "demo-citizen-030",
          "data": {
            "role": "citizen",
            "createdAt": "2025-06-30T07:39:37.399Z",
            "phone": "+940772801863",
            "updatedAt": "2025-07-28T00:35:55.674Z",
            "uid": "demo-citizen-030",
            "name": "Nimal Bandara",
            "email": "citizen25@demo.govease.lk",
            "nic": "911976712V"
          }
        },
        {
          "id": "demo-citizen-031",
          "data": {
            "updatedAt": "2025-08-06T22:08:20.989Z",
            "name": "Eranga Wickramasinghe",
            "phone": "+940772574531",
            "nic": "750258996V",
            "uid": "demo-citizen-031",
            "createdAt": "2025-03-24T06:35:35.457Z",
            "email": "citizen26@demo.govease.lk",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-032",
          "data": {
            "createdAt": "2025-03-05T23:16:37.982Z",
            "nic": "802281091V",
            "phone": "+940707389744",
            "uid": "demo-citizen-032",
            "name": "Malani Gunawardena",
            "updatedAt": "2025-07-22T19:07:01.052Z",
            "role": "citizen",
            "email": "citizen27@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-033",
          "data": {
            "role": "citizen",
            "nic": "802301818V",
            "createdAt": "2025-04-10T12:05:07.548Z",
            "email": "citizen28@demo.govease.lk",
            "name": "Nimal Bandara",
            "uid": "demo-citizen-033",
            "phone": "+940707598104",
            "updatedAt": "2025-08-08T16:42:25.876Z"
          }
        },
        {
          "id": "demo-citizen-034",
          "data": {
            "name": "Vimukthi Weeratunga",
            "phone": "+940788986460",
            "nic": "720626951V",
            "updatedAt": "2025-07-22T07:48:46.456Z",
            "createdAt": "2025-03-01T10:52:46.649Z",
            "uid": "demo-citizen-034",
            "role": "citizen",
            "email": "citizen29@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-035",
          "data": {
            "phone": "+940717447081",
            "updatedAt": "2025-08-15T01:06:07.433Z",
            "name": "Kamal Dissanayake",
            "uid": "demo-citizen-035",
            "createdAt": "2025-03-07T06:18:04.566Z",
            "email": "citizen30@demo.govease.lk",
            "nic": "761347428V",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-036",
          "data": {
            "email": "citizen31@demo.govease.lk",
            "phone": "+940757265385",
            "updatedAt": "2025-08-02T15:09:42.966Z",
            "createdAt": "2025-05-09T04:00:53.307Z",
            "uid": "demo-citizen-036",
            "name": "Xiomara Peris",
            "nic": "871003282V",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-037",
          "data": {
            "phone": "+940781950323",
            "uid": "demo-citizen-037",
            "role": "citizen",
            "createdAt": "2025-08-11T17:30:13.738Z",
            "nic": "850494173V",
            "name": "Tharanga Vithanage",
            "updatedAt": "2025-08-01T02:24:27.472Z",
            "email": "citizen32@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-038",
          "data": {
            "name": "Lasith Embuldeniya",
            "email": "citizen33@demo.govease.lk",
            "phone": "+940766010742",
            "updatedAt": "2025-07-30T10:50:54.527Z",
            "role": "citizen",
            "uid": "demo-citizen-038",
            "createdAt": "2025-07-09T19:45:14.349Z",
            "nic": "903505133V"
          }
        },
        {
          "id": "demo-citizen-039",
          "data": {
            "uid": "demo-citizen-039",
            "updatedAt": "2025-07-27T14:07:50.488Z",
            "name": "Jagath Wimalasiri",
            "createdAt": "2025-08-13T09:46:39.073Z",
            "email": "citizen34@demo.govease.lk",
            "nic": "813131976V",
            "role": "citizen",
            "phone": "+940713884363"
          }
        },
        {
          "id": "demo-citizen-040",
          "data": {
            "updatedAt": "2025-08-14T01:16:18.845Z",
            "role": "citizen",
            "email": "citizen35@demo.govease.lk",
            "uid": "demo-citizen-040",
            "createdAt": "2025-06-17T23:51:37.180Z",
            "phone": "+940703441659",
            "name": "Janaka Rajapaksa",
            "nic": "930420623V"
          }
        },
        {
          "id": "demo-citizen-041",
          "data": {
            "name": "Buddhika Silva",
            "updatedAt": "2025-08-03T08:06:35.291Z",
            "phone": "+940769732804",
            "createdAt": "2025-04-09T09:18:47.768Z",
            "role": "citizen",
            "email": "citizen36@demo.govease.lk",
            "uid": "demo-citizen-041",
            "nic": "981358244V"
          }
        },
        {
          "id": "demo-citizen-042",
          "data": {
            "nic": "873517575V",
            "createdAt": "2025-06-07T04:58:12.828Z",
            "name": "Tharanga Vithanage",
            "uid": "demo-citizen-042",
            "updatedAt": "2025-08-10T02:50:13.179Z",
            "email": "citizen37@demo.govease.lk",
            "phone": "+940722617696",
            "role": "citizen"
          }
        },
        {
          "id": "demo-citizen-043",
          "data": {
            "createdAt": "2025-06-10T06:02:47.829Z",
            "phone": "+940721072710",
            "uid": "demo-citizen-043",
            "nic": "791164358V",
            "name": "Yasoda Gamage",
            "role": "citizen",
            "email": "citizen38@demo.govease.lk",
            "updatedAt": "2025-07-24T02:04:35.737Z"
          }
        },
        {
          "id": "demo-citizen-044",
          "data": {
            "name": "Kamal Dissanayake",
            "updatedAt": "2025-07-22T22:56:27.245Z",
            "createdAt": "2025-06-11T06:55:44.539Z",
            "role": "citizen",
            "phone": "+940713994300",
            "uid": "demo-citizen-044",
            "email": "citizen39@demo.govease.lk",
            "nic": "752226199V"
          }
        },
        {
          "id": "demo-citizen-045",
          "data": {
            "updatedAt": "2025-08-15T18:06:58.508Z",
            "uid": "demo-citizen-045",
            "nic": "933470714V",
            "name": "Mahesh Abeysinghe",
            "role": "citizen",
            "createdAt": "2025-03-14T17:31:58.495Z",
            "phone": "+940728699206",
            "email": "citizen40@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-046",
          "data": {
            "email": "citizen41@demo.govease.lk",
            "uid": "demo-citizen-046",
            "role": "citizen",
            "nic": "953138142V",
            "name": "Ganga Wijesekara",
            "phone": "+940726970377",
            "createdAt": "2025-08-13T03:24:51.504Z",
            "updatedAt": "2025-07-30T23:32:31.466Z"
          }
        },
        {
          "id": "demo-citizen-047",
          "data": {
            "createdAt": "2025-04-13T02:40:49.766Z",
            "name": "Osanda Kumara",
            "email": "citizen42@demo.govease.lk",
            "uid": "demo-citizen-047",
            "role": "citizen",
            "nic": "762572835V",
            "phone": "+940757784309",
            "updatedAt": "2025-08-13T21:53:44.876Z"
          }
        },
        {
          "id": "demo-citizen-048",
          "data": {
            "role": "citizen",
            "email": "citizen43@demo.govease.lk",
            "updatedAt": "2025-08-07T19:05:24.565Z",
            "uid": "demo-citizen-048",
            "phone": "+940759658130",
            "nic": "872709446V",
            "name": "Binura Kodithuwakku",
            "createdAt": "2025-07-22T17:03:26.260Z"
          }
        },
        {
          "id": "demo-citizen-049",
          "data": {
            "name": "Yasas Samarawickrama",
            "nic": "862496511V",
            "role": "citizen",
            "createdAt": "2025-06-25T04:06:26.451Z",
            "email": "citizen44@demo.govease.lk",
            "phone": "+940715181841",
            "uid": "demo-citizen-049",
            "updatedAt": "2025-08-14T08:30:28.098Z"
          }
        },
        {
          "id": "demo-citizen-050",
          "data": {
            "name": "Waseem Akram",
            "uid": "demo-citizen-050",
            "phone": "+940753760095",
            "role": "citizen",
            "updatedAt": "2025-08-03T01:49:40.423Z",
            "nic": "773298212V",
            "createdAt": "2025-05-16T07:55:51.854Z",
            "email": "citizen45@demo.govease.lk"
          }
        },
        {
          "id": "demo-citizen-051",
          "data": {
            "name": "Eranga Wickramasinghe",
            "uid": "demo-citizen-051",
            "phone": "+940714035563",
            "updatedAt": "2025-08-02T23:43:34.412Z",
            "role": "citizen",
            "nic": "801483460V",
            "email": "citizen46@demo.govease.lk",
            "createdAt": "2025-04-09T09:34:44.200Z"
          }
        },
        {
          "id": "demo-citizen-052",
          "data": {
            "nic": "762299544V",
            "email": "citizen47@demo.govease.lk",
            "role": "citizen",
            "createdAt": "2025-03-20T15:39:33.632Z",
            "updatedAt": "2025-08-15T20:17:22.146Z",
            "uid": "demo-citizen-052",
            "phone": "+940757895904",
            "name": "Buddhika Silva"
          }
        },
        {
          "id": "demo-citizen-053",
          "data": {
            "updatedAt": "2025-07-26T20:26:12.123Z",
            "createdAt": "2025-05-04T01:09:36.448Z",
            "nic": "980311826V",
            "uid": "demo-citizen-053",
            "email": "citizen48@demo.govease.lk",
            "name": "Harsha Gunasekara",
            "role": "citizen",
            "phone": "+940707822499"
          }
        },
        {
          "id": "demo-citizen-054",
          "data": {
            "createdAt": "2025-06-03T10:40:57.863Z",
            "role": "citizen",
            "phone": "+940704933397",
            "name": "Gayan Amarasinghe",
            "nic": "990991958V",
            "updatedAt": "2025-07-30T01:41:14.579Z",
            "email": "citizen49@demo.govease.lk",
            "uid": "demo-citizen-054"
          }
        },
        {
          "id": "demo-citizen-055",
          "data": {
            "nic": "790611652V",
            "email": "citizen50@demo.govease.lk",
            "createdAt": "2025-04-10T16:02:23.400Z",
            "updatedAt": "2025-07-18T08:56:08.822Z",
            "name": "Hasitha Dharmasena",
            "role": "citizen",
            "phone": "+940784486016",
            "uid": "demo-citizen-055"
          }
        },
        {
          "id": "demo-officer-001",
          "data": {
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "role": "officer",
            "email": "officer.demo@motortraffic.gov.lk",
            "phone": "+94777654321",
            "uid": "demo-officer-001",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "name": "Sunil Fernando",
            "department": "demo-dept-motor-traffic",
            "nic": "987654321V"
          }
        },
        {
          "id": "demo-officer-002",
          "data": {
            "name": "Malini Rajapaksa",
            "nic": "876543210V",
            "department": "demo-dept-immigration",
            "phone": "+94778765432",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "uid": "demo-officer-002",
            "email": "immigration.officer@immigration.gov.lk",
            "role": "officer"
          }
        },
        {
          "id": "demo-officer-003",
          "data": {
            "department": "demo-dept-registrar-general",
            "email": "registrar.officer@rgd.gov.lk",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "nic": "765432109V",
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "role": "officer",
            "name": "Chandana Wijesinghe",
            "uid": "demo-officer-003",
            "phone": "+94779876543"
          }
        },
        {
          "id": "demo-officer-004",
          "data": {
            "updatedAt": "2025-08-16T17:48:38.298Z",
            "name": "Ranjith Gunasekara",
            "role": "officer",
            "email": "tax.officer@ird.gov.lk",
            "department": "demo-dept-inland-revenue",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "uid": "demo-officer-004",
            "phone": "+94770987654",
            "nic": "654321098V"
          }
        },
        {
          "id": "j2F7mOxeDzfVgBCkU0j051QGBJE3",
          "data": {
            "updatedAt": "2025-08-16T16:59:25.386Z",
            "email": "john.doe@example.com",
            "name": "Methika Fernando",
            "createdAt": "2025-08-16T16:59:25.386Z",
            "nic": "12121212121212",
            "role": "officer",
            "phone": "212121212121"
          }
        },
        {
          "id": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
          "data": {
            "nic": "123456789V",
            "email": "citizen.demo@govease.lk",
            "updatedAt": "2025-08-16T18:03:45.106Z",
            "createdAt": "2024-06-15T08:00:00.000Z",
            "name": "Amal Perera",
            "phone": "+94771234567",
            "role": "citizen"
          }
        }
      ]
    },
    "departments": {
      "count": 9,
      "documents": [
        {
          "id": "demo-dept-immigration",
          "data": {
            "createdAt": "2025-08-16T17:48:38.298Z",
            "location": "Battaramulla",
            "description": "Passport services, visa processing, and immigration matters",
            "workingHours": {
              "start": "08:00",
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "end": "16:00"
            },
            "email": "info@immigration.gov.lk",
            "name": "Department of Immigration & Emigration",
            "isActive": true,
            "contactNumber": "+94-11-5329000",
            "id": "demo-dept-immigration",
            "services": []
          }
        },
        {
          "id": "demo-dept-inland-revenue",
          "data": {
            "isActive": true,
            "workingHours": {
              "end": "16:30",
              "start": "08:30",
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ]
            },
            "name": "Department of Inland Revenue",
            "email": "info@ird.gov.lk",
            "location": "Sir Chittampalam A. Gardiner Mawatha, Colombo 02",
            "id": "demo-dept-inland-revenue",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "description": "Tax registration, returns filing, and revenue services",
            "services": [],
            "contactNumber": "+94-11-2328162"
          }
        },
        {
          "id": "demo-dept-motor-traffic",
          "data": {
            "email": "info@motortraffic.gov.lk",
            "location": "Werahera, Battaramulla",
            "isActive": true,
            "description": "Vehicle registration, driving licenses, and traffic-related services",
            "services": [],
            "name": "Department of Motor Traffic",
            "contactNumber": "+94-11-2877877",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "id": "demo-dept-motor-traffic",
            "workingHours": {
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "end": "16:30",
              "start": "08:30"
            }
          }
        },
        {
          "id": "demo-dept-registrar-general",
          "data": {
            "workingHours": {
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "start": "08:30",
              "end": "16:15"
            },
            "createdAt": "2025-08-16T17:48:38.298Z",
            "email": "info@rgd.gov.lk",
            "services": [],
            "id": "demo-dept-registrar-general",
            "isActive": true,
            "contactNumber": "+94-11-2694671",
            "name": "Registrar General's Department",
            "description": "Birth, death, marriage certificates and civil registration",
            "location": "Colombo 07"
          }
        },
        {
          "id": "dept-divisional-secretariat",
          "data": {
            "contactNumber": "+94112345679",
            "description": "Regional administrative division providing government services and documentation",
            "id": "dept-divisional-secretariat",
            "services": [
              "service-samurdhi-application",
              "service-land-permit"
            ],
            "createdAt": "2025-08-16T16:45:14.208Z",
            "isActive": true,
            "workingHours": {
              "start": "08:30",
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "end": "16:30"
            },
            "location": "Colombo District, Western Province",
            "email": "divisional.colombo@gov.lk",
            "name": "Divisional Secretariat"
          }
        },
        {
          "id": "dept-grama-niladhari",
          "data": {
            "id": "dept-grama-niladhari",
            "name": "Grama Niladhari Office",
            "email": "grama.colombo@gov.lk",
            "workingHours": {
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "end": "16:00",
              "start": "08:00"
            },
            "createdAt": "2025-08-16T16:45:13.914Z",
            "location": "Colombo District, Western Province",
            "services": [
              "service-grama-certificate",
              "service-income-certificate"
            ],
            "description": "Local administrative office providing various civil documentation and certification services",
            "contactNumber": "+94112345678",
            "isActive": true
          }
        },
        {
          "id": "dept-immigration",
          "data": {
            "workingHours": {
              "start": "08:30",
              "end": "16:30",
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ]
            },
            "contactNumber": "+94112345682",
            "isActive": true,
            "createdAt": "2025-08-16T16:45:15.182Z",
            "email": "info@immigration.gov.lk",
            "id": "dept-immigration",
            "name": "Department of Immigration and Emigration",
            "location": "Battaramulla, Western Province",
            "description": "Government agency responsible for passport issuance and immigration services",
            "services": [
              "service-passport-application",
              "service-passport-renewal"
            ]
          }
        },
        {
          "id": "dept-police",
          "data": {
            "email": "police.colombo@police.gov.lk",
            "description": "National police service providing law enforcement and public safety services",
            "workingHours": {
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "end": "20:00",
              "start": "08:00"
            },
            "id": "dept-police",
            "location": "Colombo Fort Police Station",
            "createdAt": "2025-08-16T16:45:14.476Z",
            "services": [
              "service-police-clearance",
              "service-character-certificate"
            ],
            "isActive": true,
            "name": "Sri Lanka Police",
            "contactNumber": "+94112345680"
          }
        },
        {
          "id": "dept-registrar-general",
          "data": {
            "email": "registrar@rgd.gov.lk",
            "name": "Department of Registrar General",
            "location": "Colombo 07, Western Province",
            "services": [
              "service-birth-certificate",
              "service-marriage-certificate"
            ],
            "workingHours": {
              "end": "16:15",
              "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "start": "08:30"
            },
            "isActive": true,
            "description": "Central vital registration authority for births, deaths, marriages and citizenship",
            "createdAt": "2025-08-16T16:45:14.838Z",
            "contactNumber": "+94112345681",
            "id": "dept-registrar-general"
          }
        }
      ]
    },
    "services": {
      "count": 22,
      "documents": [
        {
          "id": "demo-service-birth-certificate",
          "data": {
            "description": "Obtain a certified copy of birth certificate",
            "id": "demo-service-birth-certificate",
            "departmentId": "demo-dept-registrar-general",
            "requiredDocuments": [
              "Birth Registration Form",
              "Parent's National Identity Cards",
              "Hospital Birth Report"
            ],
            "name": "Birth Certificate",
            "availableSlots": 40,
            "duration": 20,
            "fee": 100,
            "createdAt": "2025-08-16T17:48:38.298Z",
            "isActive": true
          }
        },
        {
          "id": "demo-service-death-certificate",
          "data": {
            "fee": 100,
            "availableSlots": 15,
            "createdAt": "2025-08-16T17:48:38.298Z",
            "id": "demo-service-death-certificate",
            "departmentId": "demo-dept-registrar-general",
            "name": "Death Certificate",
            "duration": 25,
            "description": "Register death and obtain certificate",
            "requiredDocuments": [
              "Medical Certificate of Death",
              "National Identity Card of Deceased",
              "Next of Kin ID"
            ],
            "isActive": true
          }
        },
        {
          "id": "demo-service-driving-license",
          "data": {
            "isActive": true,
            "fee": 2500,
            "availableSlots": 20,
            "description": "Apply for a new driving license for various vehicle categories",
            "id": "demo-service-driving-license",
            "name": "Driving License Application",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "departmentId": "demo-dept-motor-traffic",
            "requiredDocuments": [
              "National Identity Card",
              "Medical Certificate",
              "Eye Report",
              "Completed Application Form",
              "Passport-size Photographs (2)"
            ],
            "duration": 60
          }
        },
        {
          "id": "demo-service-license-renewal",
          "data": {
            "createdAt": "2025-08-16T17:48:38.298Z",
            "requiredDocuments": [
              "Current Driving License",
              "National Identity Card",
              "Medical Certificate (if required)"
            ],
            "duration": 30,
            "isActive": true,
            "id": "demo-service-license-renewal",
            "description": "Renew your existing driving license",
            "availableSlots": 25,
            "departmentId": "demo-dept-motor-traffic",
            "name": "License Renewal",
            "fee": 1500
          }
        },
        {
          "id": "demo-service-marriage-certificate",
          "data": {
            "id": "demo-service-marriage-certificate",
            "description": "Register marriage and obtain certificate",
            "name": "Marriage Certificate",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "fee": 500,
            "isActive": true,
            "departmentId": "demo-dept-registrar-general",
            "requiredDocuments": [
              "Birth Certificates of Both Parties",
              "National Identity Cards",
              "Divorce Decree (if applicable)",
              "Notice of Marriage"
            ],
            "availableSlots": 20,
            "duration": 30
          }
        },
        {
          "id": "demo-service-passport-application",
          "data": {
            "createdAt": "2025-08-16T17:48:38.298Z",
            "description": "Apply for a new Sri Lankan passport",
            "availableSlots": 30,
            "name": "Passport Application",
            "fee": 3500,
            "departmentId": "demo-dept-immigration",
            "duration": 30,
            "isActive": true,
            "requiredDocuments": [
              "Birth Certificate",
              "National Identity Card",
              "Passport-size Photographs (2)",
              "Completed Application Form"
            ],
            "id": "demo-service-passport-application"
          }
        },
        {
          "id": "demo-service-passport-renewal",
          "data": {
            "requiredDocuments": [
              "Current Passport",
              "National Identity Card",
              "Passport-size Photographs (2)",
              "Completed Application Form"
            ],
            "description": "Renew your existing Sri Lankan passport",
            "availableSlots": 35,
            "name": "Passport Renewal",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "departmentId": "demo-dept-immigration",
            "duration": 25,
            "id": "demo-service-passport-renewal",
            "fee": 3000,
            "isActive": true
          }
        },
        {
          "id": "demo-service-tax-clearance",
          "data": {
            "name": "Tax Clearance Certificate",
            "availableSlots": 15,
            "id": "demo-service-tax-clearance",
            "departmentId": "demo-dept-inland-revenue",
            "requiredDocuments": [
              "Tax Registration Certificate",
              "Last 3 Years Tax Returns",
              "Payment Receipts",
              "Application Form"
            ],
            "fee": 1000,
            "createdAt": "2025-08-16T17:48:38.298Z",
            "duration": 30,
            "description": "Obtain tax clearance for various purposes",
            "isActive": true
          }
        },
        {
          "id": "demo-service-tax-filing",
          "data": {
            "name": "Tax Return Filing",
            "id": "demo-service-tax-filing",
            "requiredDocuments": [
              "Tax Registration Certificate",
              "Income Statements",
              "Bank Statements",
              "Receipts for Deductions"
            ],
            "duration": 45,
            "departmentId": "demo-dept-inland-revenue",
            "description": "File annual income tax return",
            "isActive": true,
            "fee": 0,
            "availableSlots": 20,
            "createdAt": "2025-08-16T17:48:38.298Z"
          }
        },
        {
          "id": "demo-service-tax-registration",
          "data": {
            "departmentId": "demo-dept-inland-revenue",
            "description": "Register for tax identification number",
            "name": "Tax Registration",
            "fee": 0,
            "availableSlots": 25,
            "isActive": true,
            "duration": 35,
            "createdAt": "2025-08-16T17:48:38.298Z",
            "id": "demo-service-tax-registration",
            "requiredDocuments": [
              "National Identity Card",
              "Business Registration Certificate",
              "Bank Account Details",
              "Address Proof"
            ]
          }
        },
        {
          "id": "demo-service-vehicle-registration",
          "data": {
            "fee": 5000,
            "isActive": true,
            "id": "demo-service-vehicle-registration",
            "createdAt": "2025-08-16T17:48:38.298Z",
            "duration": 45,
            "requiredDocuments": [
              "Vehicle Import Permit",
              "Bill of Sale",
              "National Identity Card",
              "Insurance Certificate",
              "Technical Inspection Report"
            ],
            "availableSlots": 15,
            "description": "Register a new vehicle or transfer ownership",
            "departmentId": "demo-dept-motor-traffic",
            "name": "Vehicle Registration"
          }
        },
        {
          "id": "demo-service-visa-extension",
          "data": {
            "duration": 40,
            "fee": 2000,
            "isActive": true,
            "requiredDocuments": [
              "Current Passport",
              "Current Visa",
              "Sponsor Letter",
              "Bank Statements",
              "Application Form"
            ],
            "createdAt": "2025-08-16T17:48:38.298Z",
            "availableSlots": 10,
            "name": "Visa Extension",
            "description": "Extend your current visa status",
            "id": "demo-service-visa-extension",
            "departmentId": "demo-dept-immigration"
          }
        },
        {
          "id": "service-birth-certificate",
          "data": {
            "id": "service-birth-certificate",
            "fee": 200,
            "name": "Birth Certificate",
            "duration": 30,
            "description": "Official birth registration certificate for citizens born in Sri Lanka",
            "availableSlots": 40,
            "departmentId": "dept-registrar-general",
            "isActive": true,
            "requiredDocuments": [
              "Birth registration form",
              "Hospital birth certificate",
              "Parents' National Identity Cards",
              "Parents' marriage certificate",
              "Witness statements (2)"
            ],
            "createdAt": "2025-08-16T16:45:12.510Z"
          }
        },
        {
          "id": "service-character-certificate",
          "data": {
            "duration": 20,
            "id": "service-character-certificate",
            "requiredDocuments": [
              "National Identity Card (NIC)",
              "Passport size photographs (2)",
              "Employment letter or purpose statement",
              "Grama Niladhari certificate"
            ],
            "description": "Certificate of good conduct issued by police for employment or travel purposes",
            "departmentId": "dept-police",
            "fee": 300,
            "availableSlots": 30,
            "isActive": true,
            "name": "Character Certificate",
            "createdAt": "2025-08-16T16:45:12.160Z"
          }
        },
        {
          "id": "service-grama-certificate",
          "data": {
            "name": "Grama Niladhari Certificate",
            "requiredDocuments": [
              "National Identity Card (NIC)",
              "Proof of Residence (Utility bill or lease agreement)",
              "Application form (filled and signed)"
            ],
            "duration": 15,
            "isActive": true,
            "createdAt": "2025-08-16T16:45:10.662Z",
            "description": "Official certificate issued by the Grama Niladhari confirming residence and good character",
            "departmentId": "dept-grama-niladhari",
            "fee": 100,
            "availableSlots": 20,
            "id": "service-grama-certificate"
          }
        },
        {
          "id": "service-income-certificate",
          "data": {
            "availableSlots": 15,
            "id": "service-income-certificate",
            "fee": 150,
            "departmentId": "dept-grama-niladhari",
            "createdAt": "2025-08-16T16:45:10.970Z",
            "duration": 20,
            "isActive": true,
            "name": "Income Certificate",
            "description": "Certificate verifying monthly or annual income for various official purposes",
            "requiredDocuments": [
              "National Identity Card (NIC)",
              "Employment letter or business registration",
              "Bank statements (last 3 months)",
              "Tax returns (if applicable)"
            ]
          }
        },
        {
          "id": "service-land-permit",
          "data": {
            "duration": 45,
            "departmentId": "dept-divisional-secretariat",
            "fee": 2500,
            "id": "service-land-permit",
            "requiredDocuments": [
              "Land ownership documents",
              "Survey plan",
              "Building plan (if applicable)",
              "Environmental clearance (if required)",
              "National Identity Card (NIC)"
            ],
            "description": "Permit for land development and construction activities",
            "name": "Land Development Permit",
            "createdAt": "2025-08-16T16:45:11.586Z",
            "availableSlots": 8,
            "isActive": true
          }
        },
        {
          "id": "service-marriage-certificate",
          "data": {
            "fee": 250,
            "id": "service-marriage-certificate",
            "duration": 25,
            "departmentId": "dept-registrar-general",
            "createdAt": "2025-08-16T16:45:12.819Z",
            "isActive": true,
            "requiredDocuments": [
              "Marriage registration form",
              "National Identity Cards of both parties",
              "Birth certificates of both parties",
              "Divorce decree (if previously married)",
              "Witness signatures (2)"
            ],
            "availableSlots": 20,
            "name": "Marriage Certificate",
            "description": "Official certificate of marriage registration"
          }
        },
        {
          "id": "service-passport-application",
          "data": {
            "duration": 60,
            "description": "Application for new Sri Lankan passport for international travel",
            "name": "Sri Lankan Passport Application",
            "requiredDocuments": [
              "National Identity Card (NIC)",
              "Birth certificate",
              "Passport size photographs (4)",
              "Completed application form",
              "Previous passport (if renewal)"
            ],
            "createdAt": "2025-08-16T16:45:13.197Z",
            "availableSlots": 50,
            "departmentId": "dept-immigration",
            "id": "service-passport-application",
            "isActive": true,
            "fee": 3500
          }
        },
        {
          "id": "service-passport-renewal",
          "data": {
            "departmentId": "dept-immigration",
            "duration": 45,
            "name": "Passport Renewal",
            "description": "Renewal of existing Sri Lankan passport",
            "createdAt": "2025-08-16T16:45:13.490Z",
            "requiredDocuments": [
              "Current passport",
              "National Identity Card (NIC)",
              "Passport size photographs (2)",
              "Renewal application form"
            ],
            "availableSlots": 35,
            "id": "service-passport-renewal",
            "isActive": true,
            "fee": 4000
          }
        },
        {
          "id": "service-police-clearance",
          "data": {
            "requiredDocuments": [
              "National Identity Card (NIC)",
              "Passport size photographs (2)",
              "Application form (duly filled)",
              "Fingerprints (taken at station)"
            ],
            "availableSlots": 25,
            "id": "service-police-clearance",
            "createdAt": "2025-08-16T16:45:11.894Z",
            "fee": 500,
            "description": "Official certificate confirming no criminal record, required for various purposes",
            "isActive": true,
            "duration": 25,
            "name": "Police Clearance Certificate",
            "departmentId": "dept-police"
          }
        },
        {
          "id": "service-samurdhi-application",
          "data": {
            "fee": 0,
            "availableSlots": 10,
            "requiredDocuments": [
              "National Identity Card (NIC) of all family members",
              "Income certificates of all earning members",
              "Grama Niladhari certificate",
              "Bank account details",
              "Family composition certificate"
            ],
            "description": "Application for government welfare assistance program for low-income families",
            "name": "Samurdhi Benefit Application",
            "duration": 30,
            "departmentId": "dept-divisional-secretariat",
            "createdAt": "2025-08-16T16:45:11.294Z",
            "isActive": true,
            "id": "service-samurdhi-application"
          }
        }
      ]
    },
    "appointments": {
      "count": 212,
      "documents": [
        {
          "id": "citizen-apt-001",
          "data": {
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "qrCode": "QR-DL-CITIZEN-20241115",
            "documents": [],
            "serviceId": "demo-service-driving-license",
            "date": "2024-11-15T10:00:00.000Z",
            "id": "citizen-apt-001",
            "referenceNumber": "GE-2024-DL-001",
            "status": "completed",
            "createdAt": "2024-11-10T09:00:00.000Z",
            "timeSlot": "10:00-11:00",
            "updatedAt": "2024-11-15T11:30:00.000Z",
            "notes": "First time driving license application - completed successfully",
            "departmentId": "demo-dept-motor-traffic"
          }
        },
        {
          "id": "citizen-apt-002",
          "data": {
            "status": "completed",
            "id": "citizen-apt-002",
            "qrCode": "QR-BC-CITIZEN-20241205",
            "documents": [],
            "timeSlot": "14:00-14:20",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "updatedAt": "2024-12-05T14:45:00.000Z",
            "date": "2024-12-05T14:00:00.000Z",
            "notes": "Birth certificate for passport application - completed",
            "referenceNumber": "GE-2024-BC-002",
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2024-11-28T16:00:00.000Z",
            "serviceId": "demo-service-birth-certificate"
          }
        },
        {
          "id": "citizen-apt-003",
          "data": {
            "date": "2024-12-20T09:30:00.000Z",
            "updatedAt": "2024-12-20T11:00:00.000Z",
            "departmentId": "demo-dept-immigration",
            "status": "completed",
            "createdAt": "2024-12-10T11:00:00.000Z",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "timeSlot": "09:30-10:00",
            "referenceNumber": "GE-2024-PP-003",
            "documents": [],
            "serviceId": "demo-service-passport-application",
            "qrCode": "QR-PP-CITIZEN-20241220",
            "notes": "New passport application - approved and completed",
            "id": "citizen-apt-003"
          }
        },
        {
          "id": "citizen-apt-004",
          "data": {
            "createdAt": "2025-01-20T10:00:00.000Z",
            "departmentId": "demo-dept-motor-traffic",
            "id": "citizen-apt-004",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "referenceNumber": "GE-2025-VR-004",
            "qrCode": "QR-VR-CITIZEN-20250218",
            "date": "2025-02-18T11:00:00.000Z",
            "timeSlot": "11:00-11:45",
            "status": "confirmed",
            "notes": "New vehicle registration for Honda Civic 2024",
            "documents": [],
            "serviceId": "demo-service-vehicle-registration",
            "updatedAt": "2025-01-20T15:30:00.000Z"
          }
        },
        {
          "id": "citizen-apt-005",
          "data": {
            "documents": [],
            "id": "citizen-apt-005",
            "createdAt": "2025-01-22T14:00:00.000Z",
            "updatedAt": "2025-01-22T16:00:00.000Z",
            "qrCode": "QR-TR-CITIZEN-20250225",
            "referenceNumber": "GE-2025-TR-005",
            "departmentId": "demo-dept-inland-revenue",
            "status": "confirmed",
            "serviceId": "demo-service-tax-registration",
            "date": "2025-02-25T15:00:00.000Z",
            "notes": "Business tax registration for new consulting firm",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "timeSlot": "15:00-15:35"
          }
        },
        {
          "id": "citizen-apt-006",
          "data": {
            "referenceNumber": "GE-2025-MC-006",
            "createdAt": "2025-01-25T09:00:00.000Z",
            "timeSlot": "13:30-14:00",
            "qrCode": "QR-MC-CITIZEN-20250310",
            "date": "2025-03-10T13:30:00.000Z",
            "notes": "Marriage certificate application - pending officer approval",
            "updatedAt": "2025-01-25T09:00:00.000Z",
            "documents": [],
            "departmentId": "demo-dept-registrar-general",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "serviceId": "demo-service-marriage-certificate",
            "status": "pending",
            "id": "citizen-apt-006"
          }
        },
        {
          "id": "citizen-apt-007",
          "data": {
            "serviceId": "demo-service-passport-renewal",
            "timeSlot": "10:30-10:55",
            "departmentId": "demo-dept-immigration",
            "referenceNumber": "GE-2025-PR-007",
            "qrCode": "QR-PR-CITIZEN-20250315",
            "documents": [],
            "notes": "Passport renewal - submitted for processing",
            "status": "pending",
            "date": "2025-03-15T10:30:00.000Z",
            "createdAt": "2025-01-28T11:30:00.000Z",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "id": "citizen-apt-007",
            "updatedAt": "2025-01-28T11:30:00.000Z"
          }
        },
        {
          "id": "demo-appointment-001",
          "data": {
            "referenceNumber": "GE-2025-001",
            "qrCode": "QR-DL-001-20250120",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-driving-license",
            "timeSlot": "10:00-11:00",
            "status": "confirmed",
            "id": "demo-appointment-001",
            "createdAt": "2025-01-15T12:00:00.000Z",
            "updatedAt": "2025-01-15T14:00:00.000Z",
            "date": "2025-01-20T10:00:00.000Z",
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "First time driving license application"
          }
        },
        {
          "id": "demo-appointment-002",
          "data": {
            "userId": "demo-citizen-002",
            "timeSlot": "09:00-09:45",
            "createdAt": "2025-01-12T08:00:00.000Z",
            "notes": "New car registration",
            "referenceNumber": "GE-2025-002",
            "date": "2025-01-18T09:00:00.000Z",
            "serviceId": "demo-service-vehicle-registration",
            "departmentId": "demo-dept-motor-traffic",
            "status": "completed",
            "documents": [],
            "qrCode": "QR-VR-002-20250118",
            "id": "demo-appointment-002",
            "updatedAt": "2025-01-18T10:00:00.000Z"
          }
        },
        {
          "id": "demo-appointment-003",
          "data": {
            "timeSlot": "11:00-11:20",
            "updatedAt": "2025-01-17T16:00:00.000Z",
            "referenceNumber": "GE-2025-003",
            "serviceId": "demo-service-birth-certificate",
            "date": "2025-01-22T11:00:00.000Z",
            "createdAt": "2025-01-17T14:30:00.000Z",
            "documents": [],
            "status": "confirmed",
            "departmentId": "demo-dept-registrar-general",
            "id": "demo-appointment-003",
            "notes": "Birth certificate for passport application",
            "qrCode": "QR-BC-003-20250122",
            "userId": "demo-citizen-003"
          }
        },
        {
          "id": "demo-appointment-004",
          "data": {
            "referenceNumber": "GE-2025-004",
            "qrCode": "QR-PP-004-20250125",
            "departmentId": "demo-dept-immigration",
            "serviceId": "demo-service-passport-application",
            "timeSlot": "14:00-14:30",
            "status": "pending",
            "id": "demo-appointment-004",
            "createdAt": "2025-01-19T10:15:00.000Z",
            "updatedAt": "2025-01-19T10:15:00.000Z",
            "documents": [],
            "date": "2025-01-25T14:00:00.000Z",
            "userId": "demo-citizen-004",
            "notes": "New passport application"
          }
        },
        {
          "id": "demo-appointment-005",
          "data": {
            "createdAt": "2025-01-19T10:15:00.000Z",
            "timeSlot": "13:30-14:05",
            "id": "demo-appointment-005",
            "qrCode": "QR-TR-005-20250124",
            "departmentId": "demo-dept-inland-revenue",
            "userId": "demo-citizen-005",
            "documents": [],
            "status": "pending",
            "serviceId": "demo-service-tax-registration",
            "notes": "Business tax registration",
            "referenceNumber": "GE-2025-005",
            "updatedAt": "2025-01-19T10:15:00.000Z",
            "date": "2025-01-24T13:30:00.000Z"
          }
        },
        {
          "id": "demo-appointment-011",
          "data": {
            "serviceId": "demo-service-tax-registration",
            "createdAt": "2025-08-12T09:33:04.126Z",
            "referenceNumber": "GE-2025-011",
            "id": "demo-appointment-011",
            "updatedAt": "2025-08-02T18:18:53.512Z",
            "date": "2025-07-22T22:58:23.064Z",
            "userId": "demo-citizen-006",
            "departmentId": "demo-dept-inland-revenue",
            "status": "completed",
            "notes": "Appointment for tax registration",
            "documents": [],
            "qrCode": "QR-REGISTRATION-1-20250723",
            "timeSlot": "13:30-14:07"
          }
        },
        {
          "id": "demo-appointment-012",
          "data": {
            "qrCode": "QR-CERTIFICATE-2-20250809",
            "referenceNumber": "GE-2025-012",
            "updatedAt": "2025-08-02T15:15:10.961Z",
            "timeSlot": "15:30-16:41",
            "id": "demo-appointment-012",
            "documents": [],
            "serviceId": "demo-service-marriage-certificate",
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-007",
            "status": "cancelled",
            "createdAt": "2025-07-13T19:56:50.866Z",
            "date": "2025-08-09T12:01:10.787Z",
            "notes": "Appointment for marriage certificate"
          }
        },
        {
          "id": "demo-appointment-013",
          "data": {
            "referenceNumber": "GE-2025-013",
            "date": "2025-07-25T17:56:30.006Z",
            "updatedAt": "2025-08-07T10:28:33.834Z",
            "notes": "Appointment for birth certificate",
            "serviceId": "demo-service-birth-certificate",
            "timeSlot": "09:30-10:36",
            "documents": [],
            "createdAt": "2025-05-28T12:13:29.193Z",
            "userId": "demo-citizen-008",
            "qrCode": "QR-CERTIFICATE-3-20250725",
            "id": "demo-appointment-013",
            "status": "cancelled",
            "departmentId": "demo-dept-registrar-general"
          }
        },
        {
          "id": "demo-appointment-014",
          "data": {
            "notes": "Appointment for birth certificate",
            "updatedAt": "2025-08-11T22:20:55.429Z",
            "id": "demo-appointment-014",
            "qrCode": "QR-CERTIFICATE-4-20250909",
            "serviceId": "demo-service-birth-certificate",
            "timeSlot": "10:30-11:21",
            "date": "2025-09-09T12:43:43.948Z",
            "status": "confirmed",
            "createdAt": "2025-06-16T12:21:08.562Z",
            "departmentId": "demo-dept-inland-revenue",
            "referenceNumber": "GE-2025-014",
            "userId": "demo-citizen-009",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-015",
          "data": {
            "status": "pending",
            "id": "demo-appointment-015",
            "referenceNumber": "GE-2025-015",
            "qrCode": "QR-EXTENSION-5-20250914",
            "documents": [],
            "serviceId": "demo-service-visa-extension",
            "notes": "Appointment for visa extension",
            "userId": "demo-citizen-010",
            "createdAt": "2025-08-07T07:20:47.024Z",
            "departmentId": "demo-dept-inland-revenue",
            "updatedAt": "2025-08-05T12:24:55.582Z",
            "date": "2025-09-13T22:42:19.988Z",
            "timeSlot": "14:30-15:21"
          }
        },
        {
          "id": "demo-appointment-016",
          "data": {
            "documents": [],
            "qrCode": "QR-CERTIFICATE-6-20250720",
            "referenceNumber": "GE-2025-016",
            "timeSlot": "15:30-16:42",
            "departmentId": "demo-dept-immigration",
            "serviceId": "demo-service-death-certificate",
            "updatedAt": "2025-08-14T01:37:53.455Z",
            "userId": "demo-citizen-011",
            "status": "no-show",
            "date": "2025-07-20T06:42:15.788Z",
            "createdAt": "2025-07-25T15:03:24.067Z",
            "id": "demo-appointment-016",
            "notes": "Appointment for death certificate"
          }
        },
        {
          "id": "demo-appointment-017",
          "data": {
            "departmentId": "demo-dept-registrar-general",
            "status": "pending",
            "userId": "demo-citizen-012",
            "serviceId": "demo-service-driving-license",
            "date": "2025-09-08T17:02:14.178Z",
            "referenceNumber": "GE-2025-017",
            "timeSlot": "08:30-09:54",
            "qrCode": "QR-LICENSE-7-20250908",
            "id": "demo-appointment-017",
            "documents": [],
            "updatedAt": "2025-08-07T05:21:55.450Z",
            "createdAt": "2025-08-10T04:10:03.114Z",
            "notes": "Appointment for driving license"
          }
        },
        {
          "id": "demo-appointment-018",
          "data": {
            "qrCode": "QR-REGISTRATION-8-20250908",
            "referenceNumber": "GE-2025-018",
            "updatedAt": "2025-07-20T06:45:53.271Z",
            "timeSlot": "09:30-10:00",
            "id": "demo-appointment-018",
            "documents": [],
            "serviceId": "demo-service-vehicle-registration",
            "departmentId": "demo-dept-immigration",
            "userId": "demo-citizen-013",
            "status": "confirmed",
            "createdAt": "2025-05-26T17:22:04.114Z",
            "date": "2025-09-08T08:43:18.693Z",
            "notes": "Appointment for vehicle registration"
          }
        },
        {
          "id": "demo-appointment-019",
          "data": {
            "documents": [],
            "timeSlot": "14:30-15:35",
            "id": "demo-appointment-019",
            "notes": "Appointment for vehicle registration",
            "userId": "demo-citizen-014",
            "referenceNumber": "GE-2025-019",
            "departmentId": "demo-dept-inland-revenue",
            "status": "confirmed",
            "date": "2025-08-21T03:33:36.827Z",
            "serviceId": "demo-service-vehicle-registration",
            "updatedAt": "2025-07-29T07:47:06.990Z",
            "qrCode": "QR-REGISTRATION-9-20250821",
            "createdAt": "2025-05-30T03:48:37.829Z"
          }
        },
        {
          "id": "demo-appointment-020",
          "data": {
            "serviceId": "demo-service-death-certificate",
            "userId": "demo-citizen-015",
            "date": "2025-08-11T22:07:42.592Z",
            "id": "demo-appointment-020",
            "departmentId": "demo-dept-immigration",
            "status": "completed",
            "notes": "Appointment for death certificate",
            "qrCode": "QR-CERTIFICATE-10-20250812",
            "updatedAt": "2025-07-24T20:14:27.100Z",
            "documents": [],
            "createdAt": "2025-08-15T03:27:30.471Z",
            "timeSlot": "14:30-15:22",
            "referenceNumber": "GE-2025-020"
          }
        },
        {
          "id": "demo-appointment-021",
          "data": {
            "date": "2025-07-25T20:47:12.143Z",
            "createdAt": "2025-06-07T21:48:23.303Z",
            "referenceNumber": "GE-2025-021",
            "departmentId": "demo-dept-immigration",
            "id": "demo-appointment-021",
            "serviceId": "demo-service-tax-filing",
            "documents": [],
            "qrCode": "QR-FILING-11-20250726",
            "status": "cancelled",
            "updatedAt": "2025-08-01T04:12:21.081Z",
            "notes": "Appointment for tax filing",
            "userId": "demo-citizen-016",
            "timeSlot": "10:00-10:42"
          }
        },
        {
          "id": "demo-appointment-022",
          "data": {
            "date": "2025-09-13T18:51:47.533Z",
            "timeSlot": "09:00-09:56",
            "documents": [],
            "id": "demo-appointment-022",
            "notes": "Appointment for visa extension",
            "referenceNumber": "GE-2025-022",
            "departmentId": "demo-dept-inland-revenue",
            "userId": "demo-citizen-017",
            "serviceId": "demo-service-visa-extension",
            "updatedAt": "2025-07-17T20:01:48.109Z",
            "status": "confirmed",
            "qrCode": "QR-EXTENSION-12-20250914",
            "createdAt": "2025-05-27T09:36:20.368Z"
          }
        },
        {
          "id": "demo-appointment-023",
          "data": {
            "createdAt": "2025-08-02T18:13:08.576Z",
            "date": "2025-09-15T16:29:21.389Z",
            "referenceNumber": "GE-2025-023",
            "documents": [],
            "userId": "demo-citizen-018",
            "serviceId": "demo-service-driving-license",
            "notes": "Appointment for driving license",
            "timeSlot": "14:00-15:14",
            "status": "confirmed",
            "updatedAt": "2025-07-20T08:27:03.472Z",
            "qrCode": "QR-LICENSE-13-20250915",
            "departmentId": "demo-dept-immigration",
            "id": "demo-appointment-023"
          }
        },
        {
          "id": "demo-appointment-024",
          "data": {
            "date": "2025-07-19T21:55:54.480Z",
            "serviceId": "demo-service-vehicle-registration",
            "referenceNumber": "GE-2025-024",
            "userId": "demo-citizen-019",
            "departmentId": "demo-dept-inland-revenue",
            "documents": [],
            "timeSlot": "14:00-14:40",
            "status": "completed",
            "createdAt": "2025-06-13T07:02:40.895Z",
            "updatedAt": "2025-07-18T04:00:50.035Z",
            "id": "demo-appointment-024",
            "qrCode": "QR-REGISTRATION-14-20250720",
            "notes": "Appointment for vehicle registration"
          }
        },
        {
          "id": "demo-appointment-025",
          "data": {
            "id": "demo-appointment-025",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-driving-license",
            "documents": [],
            "status": "completed",
            "notes": "Appointment for driving license",
            "date": "2025-07-09T16:53:50.112Z",
            "qrCode": "QR-LICENSE-15-20250709",
            "timeSlot": "08:30-09:17",
            "createdAt": "2025-06-21T21:00:56.220Z",
            "referenceNumber": "GE-2025-025",
            "updatedAt": "2025-07-30T13:25:56.661Z",
            "userId": "demo-citizen-020"
          }
        },
        {
          "id": "demo-appointment-026",
          "data": {
            "date": "2025-08-06T08:31:32.974Z",
            "timeSlot": "08:00-08:31",
            "departmentId": "demo-dept-immigration",
            "createdAt": "2025-07-31T02:27:36.560Z",
            "documents": [],
            "id": "demo-appointment-026",
            "notes": "Appointment for tax clearance",
            "serviceId": "demo-service-tax-clearance",
            "userId": "demo-citizen-021",
            "status": "cancelled",
            "updatedAt": "2025-07-22T15:48:09.394Z",
            "qrCode": "QR-CLEARANCE-16-20250806",
            "referenceNumber": "GE-2025-026"
          }
        },
        {
          "id": "demo-appointment-027",
          "data": {
            "createdAt": "2025-06-16T00:16:27.824Z",
            "notes": "Appointment for license renewal",
            "timeSlot": "11:30-12:57",
            "id": "demo-appointment-027",
            "updatedAt": "2025-08-06T09:03:57.963Z",
            "documents": [],
            "serviceId": "demo-service-license-renewal",
            "date": "2025-07-20T01:03:53.355Z",
            "departmentId": "demo-dept-motor-traffic",
            "qrCode": "QR-RENEWAL-17-20250720",
            "userId": "demo-citizen-022",
            "status": "no-show",
            "referenceNumber": "GE-2025-027"
          }
        },
        {
          "id": "demo-appointment-028",
          "data": {
            "serviceId": "demo-service-passport-application",
            "documents": [],
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-023",
            "date": "2025-08-28T18:30:32.719Z",
            "id": "demo-appointment-028",
            "referenceNumber": "GE-2025-028",
            "qrCode": "QR-APPLICATION-18-20250829",
            "notes": "Appointment for passport application",
            "updatedAt": "2025-08-06T07:57:38.091Z",
            "timeSlot": "11:00-11:56",
            "status": "confirmed",
            "createdAt": "2025-05-25T19:47:34.269Z"
          }
        },
        {
          "id": "demo-appointment-029",
          "data": {
            "timeSlot": "10:30-11:34",
            "createdAt": "2025-07-11T21:33:31.578Z",
            "referenceNumber": "GE-2025-029",
            "qrCode": "QR-RENEWAL-19-20250725",
            "documents": [],
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for passport renewal",
            "serviceId": "demo-service-passport-renewal",
            "updatedAt": "2025-08-15T04:54:44.231Z",
            "date": "2025-07-25T16:44:08.671Z",
            "status": "completed",
            "id": "demo-appointment-029",
            "userId": "demo-citizen-024"
          }
        },
        {
          "id": "demo-appointment-030",
          "data": {
            "status": "completed",
            "date": "2025-07-09T19:46:07.623Z",
            "serviceId": "demo-service-birth-certificate",
            "updatedAt": "2025-08-16T07:23:25.927Z",
            "id": "demo-appointment-030",
            "departmentId": "demo-dept-registrar-general",
            "qrCode": "QR-CERTIFICATE-20-20250710",
            "referenceNumber": "GE-2025-030",
            "userId": "demo-citizen-025",
            "documents": [],
            "createdAt": "2025-07-16T17:14:21.066Z",
            "notes": "Appointment for birth certificate",
            "timeSlot": "10:00-11:09"
          }
        },
        {
          "id": "demo-appointment-031",
          "data": {
            "userId": "demo-citizen-026",
            "documents": [],
            "qrCode": "QR-RENEWAL-21-20250913",
            "status": "confirmed",
            "referenceNumber": "GE-2025-031",
            "notes": "Appointment for passport renewal",
            "departmentId": "demo-dept-motor-traffic",
            "date": "2025-09-13T02:13:45.808Z",
            "updatedAt": "2025-08-16T18:01:17.655Z",
            "id": "demo-appointment-031",
            "createdAt": "2025-07-06T02:07:33.336Z",
            "timeSlot": "14:00-14:55",
            "serviceId": "demo-service-passport-renewal"
          }
        },
        {
          "id": "demo-appointment-032",
          "data": {
            "qrCode": "QR-EXTENSION-22-20250910",
            "serviceId": "demo-service-visa-extension",
            "documents": [],
            "date": "2025-09-10T07:21:38.966Z",
            "status": "pending",
            "notes": "Appointment for visa extension",
            "id": "demo-appointment-032",
            "departmentId": "demo-dept-inland-revenue",
            "userId": "demo-citizen-027",
            "referenceNumber": "GE-2025-032",
            "createdAt": "2025-07-10T23:29:45.746Z",
            "updatedAt": "2025-08-04T23:10:13.110Z",
            "timeSlot": "10:30-11:33"
          }
        },
        {
          "id": "demo-appointment-033",
          "data": {
            "departmentId": "demo-dept-registrar-general",
            "serviceId": "demo-service-passport-application",
            "userId": "demo-citizen-028",
            "createdAt": "2025-08-05T13:45:26.890Z",
            "status": "confirmed",
            "date": "2025-08-17T02:48:03.352Z",
            "qrCode": "QR-APPLICATION-23-20250817",
            "id": "demo-appointment-033",
            "documents": [],
            "timeSlot": "13:30-14:44",
            "updatedAt": "2025-08-07T19:48:41.565Z",
            "referenceNumber": "GE-2025-033",
            "notes": "Appointment for passport application"
          }
        },
        {
          "id": "demo-appointment-034",
          "data": {
            "createdAt": "2025-07-23T02:37:19.236Z",
            "notes": "Appointment for passport renewal",
            "userId": "demo-citizen-029",
            "departmentId": "demo-dept-immigration",
            "qrCode": "QR-RENEWAL-24-20250821",
            "documents": [],
            "id": "demo-appointment-034",
            "date": "2025-08-21T05:23:50.890Z",
            "serviceId": "demo-service-passport-renewal",
            "referenceNumber": "GE-2025-034",
            "timeSlot": "14:00-15:18",
            "status": "confirmed",
            "updatedAt": "2025-08-06T06:56:51.056Z"
          }
        },
        {
          "id": "demo-appointment-035",
          "data": {
            "userId": "demo-citizen-030",
            "createdAt": "2025-07-18T03:59:05.690Z",
            "updatedAt": "2025-07-19T14:44:44.835Z",
            "qrCode": "QR-FILING-25-20250915",
            "notes": "Appointment for tax filing",
            "date": "2025-09-14T19:13:58.120Z",
            "departmentId": "demo-dept-inland-revenue",
            "documents": [],
            "referenceNumber": "GE-2025-035",
            "status": "confirmed",
            "id": "demo-appointment-035",
            "serviceId": "demo-service-tax-filing",
            "timeSlot": "15:00-16:19"
          }
        },
        {
          "id": "demo-appointment-036",
          "data": {
            "referenceNumber": "GE-2025-036",
            "updatedAt": "2025-07-20T04:41:09.937Z",
            "date": "2025-08-08T17:34:42.554Z",
            "timeSlot": "10:00-11:20",
            "notes": "Appointment for tax clearance",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-tax-clearance",
            "qrCode": "QR-CLEARANCE-26-20250808",
            "documents": [],
            "createdAt": "2025-05-27T18:29:27.998Z",
            "id": "demo-appointment-036",
            "status": "cancelled",
            "userId": "demo-citizen-031"
          }
        },
        {
          "id": "demo-appointment-037",
          "data": {
            "userId": "demo-citizen-032",
            "referenceNumber": "GE-2025-037",
            "notes": "Appointment for birth certificate",
            "departmentId": "demo-dept-inland-revenue",
            "qrCode": "QR-CERTIFICATE-27-20250909",
            "timeSlot": "16:00-16:37",
            "documents": [],
            "id": "demo-appointment-037",
            "date": "2025-09-09T09:18:17.217Z",
            "createdAt": "2025-05-18T19:25:19.434Z",
            "updatedAt": "2025-07-30T07:29:19.316Z",
            "serviceId": "demo-service-birth-certificate",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-038",
          "data": {
            "referenceNumber": "GE-2025-038",
            "date": "2025-09-02T22:22:54.808Z",
            "serviceId": "demo-service-vehicle-registration",
            "departmentId": "demo-dept-motor-traffic",
            "userId": "demo-citizen-033",
            "status": "pending",
            "timeSlot": "11:30-12:55",
            "updatedAt": "2025-07-30T09:19:25.368Z",
            "createdAt": "2025-06-12T03:34:48.809Z",
            "qrCode": "QR-REGISTRATION-28-20250903",
            "documents": [],
            "notes": "Appointment for vehicle registration",
            "id": "demo-appointment-038"
          }
        },
        {
          "id": "demo-appointment-039",
          "data": {
            "date": "2025-07-21T22:45:31.660Z",
            "timeSlot": "14:00-15:21",
            "serviceId": "demo-service-birth-certificate",
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for birth certificate",
            "referenceNumber": "GE-2025-039",
            "status": "no-show",
            "updatedAt": "2025-08-15T15:43:38.329Z",
            "qrCode": "QR-CERTIFICATE-29-20250722",
            "userId": "demo-citizen-034",
            "id": "demo-appointment-039",
            "documents": [],
            "createdAt": "2025-06-16T19:43:35.202Z"
          }
        },
        {
          "id": "demo-appointment-040",
          "data": {
            "timeSlot": "09:00-09:45",
            "updatedAt": "2025-08-09T09:40:41.980Z",
            "serviceId": "demo-service-visa-extension",
            "userId": "demo-citizen-035",
            "documents": [],
            "date": "2025-08-02T17:20:36.143Z",
            "id": "demo-appointment-040",
            "createdAt": "2025-07-14T10:52:54.393Z",
            "departmentId": "demo-dept-motor-traffic",
            "notes": "Appointment for visa extension",
            "status": "cancelled",
            "referenceNumber": "GE-2025-040",
            "qrCode": "QR-EXTENSION-30-20250802"
          }
        },
        {
          "id": "demo-appointment-041",
          "data": {
            "notes": "Appointment for driving license",
            "serviceId": "demo-service-driving-license",
            "documents": [],
            "referenceNumber": "GE-2025-041",
            "updatedAt": "2025-08-09T09:28:02.972Z",
            "date": "2025-08-04T13:31:24.119Z",
            "status": "no-show",
            "userId": "demo-citizen-036",
            "createdAt": "2025-08-15T16:30:10.364Z",
            "timeSlot": "15:00-16:26",
            "qrCode": "QR-LICENSE-31-20250804",
            "departmentId": "demo-dept-registrar-general",
            "id": "demo-appointment-041"
          }
        },
        {
          "id": "demo-appointment-042",
          "data": {
            "serviceId": "demo-service-license-renewal",
            "documents": [],
            "userId": "demo-citizen-037",
            "departmentId": "demo-dept-inland-revenue",
            "date": "2025-08-04T05:45:39.465Z",
            "id": "demo-appointment-042",
            "referenceNumber": "GE-2025-042",
            "qrCode": "QR-RENEWAL-32-20250804",
            "notes": "Appointment for license renewal",
            "updatedAt": "2025-08-14T17:44:56.846Z",
            "timeSlot": "10:30-11:27",
            "status": "completed",
            "createdAt": "2025-07-18T09:06:35.276Z"
          }
        },
        {
          "id": "demo-appointment-043",
          "data": {
            "userId": "demo-citizen-038",
            "documents": [],
            "qrCode": "QR-CERTIFICATE-33-20250831",
            "departmentId": "demo-dept-motor-traffic",
            "referenceNumber": "GE-2025-043",
            "serviceId": "demo-service-birth-certificate",
            "status": "confirmed",
            "notes": "Appointment for birth certificate",
            "createdAt": "2025-07-14T10:40:32.739Z",
            "timeSlot": "11:00-11:32",
            "updatedAt": "2025-07-29T02:57:51.028Z",
            "date": "2025-08-31T10:33:26.369Z",
            "id": "demo-appointment-043"
          }
        },
        {
          "id": "demo-appointment-044",
          "data": {
            "userId": "demo-citizen-039",
            "date": "2025-08-26T18:07:12.071Z",
            "status": "pending",
            "createdAt": "2025-06-26T20:10:28.556Z",
            "serviceId": "demo-service-birth-certificate",
            "referenceNumber": "GE-2025-044",
            "documents": [],
            "qrCode": "QR-CERTIFICATE-34-20250826",
            "timeSlot": "09:30-10:57",
            "notes": "Appointment for birth certificate",
            "departmentId": "demo-dept-inland-revenue",
            "updatedAt": "2025-08-02T04:37:57.268Z",
            "id": "demo-appointment-044"
          }
        },
        {
          "id": "demo-appointment-045",
          "data": {
            "qrCode": "QR-RENEWAL-35-20250902",
            "documents": [],
            "serviceId": "demo-service-passport-renewal",
            "userId": "demo-citizen-040",
            "date": "2025-09-01T20:00:15.054Z",
            "timeSlot": "10:00-10:55",
            "notes": "Appointment for passport renewal",
            "referenceNumber": "GE-2025-045",
            "createdAt": "2025-08-14T23:48:55.453Z",
            "updatedAt": "2025-08-13T07:25:37.186Z",
            "departmentId": "demo-dept-inland-revenue",
            "id": "demo-appointment-045",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-046",
          "data": {
            "qrCode": "QR-RENEWAL-36-20250702",
            "referenceNumber": "GE-2025-046",
            "createdAt": "2025-07-22T01:33:08.794Z",
            "serviceId": "demo-service-passport-renewal",
            "departmentId": "demo-dept-inland-revenue",
            "date": "2025-07-01T21:36:14.341Z",
            "userId": "demo-citizen-041",
            "id": "demo-appointment-046",
            "status": "completed",
            "timeSlot": "09:30-10:52",
            "documents": [],
            "updatedAt": "2025-07-19T09:10:42.286Z",
            "notes": "Appointment for passport renewal"
          }
        },
        {
          "id": "demo-appointment-047",
          "data": {
            "createdAt": "2025-07-25T22:31:24.751Z",
            "departmentId": "demo-dept-motor-traffic",
            "notes": "Appointment for vehicle registration",
            "referenceNumber": "GE-2025-047",
            "updatedAt": "2025-08-01T19:34:34.944Z",
            "serviceId": "demo-service-vehicle-registration",
            "documents": [],
            "status": "pending",
            "qrCode": "QR-REGISTRATION-37-20250822",
            "date": "2025-08-22T03:44:39.685Z",
            "id": "demo-appointment-047",
            "userId": "demo-citizen-042",
            "timeSlot": "14:00-15:05"
          }
        },
        {
          "id": "demo-appointment-048",
          "data": {
            "userId": "demo-citizen-043",
            "status": "confirmed",
            "qrCode": "QR-LICENSE-38-20250904",
            "referenceNumber": "GE-2025-048",
            "createdAt": "2025-08-06T03:09:51.443Z",
            "date": "2025-09-04T08:26:29.924Z",
            "timeSlot": "15:00-16:28",
            "serviceId": "demo-service-driving-license",
            "notes": "Appointment for driving license",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-08-01T02:08:07.324Z",
            "documents": [],
            "id": "demo-appointment-048"
          }
        },
        {
          "id": "demo-appointment-049",
          "data": {
            "documents": [],
            "userId": "demo-citizen-044",
            "referenceNumber": "GE-2025-049",
            "updatedAt": "2025-07-18T16:57:27.165Z",
            "id": "demo-appointment-049",
            "qrCode": "QR-CERTIFICATE-39-20250712",
            "notes": "Appointment for birth certificate",
            "departmentId": "demo-dept-inland-revenue",
            "date": "2025-07-12T17:52:14.833Z",
            "status": "completed",
            "serviceId": "demo-service-birth-certificate",
            "timeSlot": "14:00-14:51",
            "createdAt": "2025-08-03T22:41:34.778Z"
          }
        },
        {
          "id": "demo-appointment-050",
          "data": {
            "createdAt": "2025-06-26T12:26:28.006Z",
            "referenceNumber": "GE-2025-050",
            "departmentId": "demo-dept-registrar-general",
            "documents": [],
            "timeSlot": "09:30-10:31",
            "qrCode": "QR-FILING-40-20250718",
            "id": "demo-appointment-050",
            "date": "2025-07-18T09:47:48.623Z",
            "serviceId": "demo-service-tax-filing",
            "notes": "Appointment for tax filing",
            "status": "no-show",
            "userId": "demo-citizen-045",
            "updatedAt": "2025-08-10T19:47:44.048Z"
          }
        },
        {
          "id": "demo-appointment-051",
          "data": {
            "departmentId": "demo-dept-inland-revenue",
            "referenceNumber": "GE-2025-051",
            "serviceId": "demo-service-vehicle-registration",
            "date": "2025-08-12T02:48:24.980Z",
            "id": "demo-appointment-051",
            "createdAt": "2025-07-12T16:49:25.700Z",
            "updatedAt": "2025-08-11T02:10:39.805Z",
            "notes": "Appointment for vehicle registration",
            "status": "no-show",
            "timeSlot": "09:00-10:29",
            "qrCode": "QR-REGISTRATION-41-20250812",
            "userId": "demo-citizen-046",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-052",
          "data": {
            "serviceId": "demo-service-passport-renewal",
            "createdAt": "2025-07-13T20:05:54.460Z",
            "documents": [],
            "date": "2025-07-18T16:44:48.961Z",
            "notes": "Appointment for passport renewal",
            "qrCode": "QR-RENEWAL-42-20250718",
            "updatedAt": "2025-07-23T18:32:57.523Z",
            "userId": "demo-citizen-047",
            "status": "completed",
            "referenceNumber": "GE-2025-052",
            "departmentId": "demo-dept-registrar-general",
            "timeSlot": "11:00-12:15",
            "id": "demo-appointment-052"
          }
        },
        {
          "id": "demo-appointment-053",
          "data": {
            "departmentId": "demo-dept-registrar-general",
            "serviceId": "demo-service-passport-application",
            "date": "2025-08-15T13:04:28.992Z",
            "qrCode": "QR-APPLICATION-43-20250815",
            "id": "demo-appointment-053",
            "notes": "Appointment for passport application",
            "timeSlot": "14:00-15:03",
            "updatedAt": "2025-08-01T19:19:04.322Z",
            "userId": "demo-citizen-048",
            "documents": [],
            "createdAt": "2025-06-09T23:43:52.083Z",
            "referenceNumber": "GE-2025-053",
            "status": "cancelled"
          }
        },
        {
          "id": "demo-appointment-054",
          "data": {
            "referenceNumber": "GE-2025-054",
            "timeSlot": "15:30-16:06",
            "notes": "Appointment for passport application",
            "documents": [],
            "qrCode": "QR-APPLICATION-44-20250718",
            "id": "demo-appointment-054",
            "date": "2025-07-17T20:20:51.813Z",
            "createdAt": "2025-05-25T13:39:08.963Z",
            "serviceId": "demo-service-passport-application",
            "updatedAt": "2025-08-07T00:02:29.315Z",
            "status": "completed",
            "userId": "demo-citizen-049",
            "departmentId": "demo-dept-registrar-general"
          }
        },
        {
          "id": "demo-appointment-055",
          "data": {
            "serviceId": "demo-service-death-certificate",
            "updatedAt": "2025-08-04T02:29:41.529Z",
            "date": "2025-08-28T02:02:11.229Z",
            "status": "pending",
            "timeSlot": "13:00-13:51",
            "userId": "demo-citizen-050",
            "createdAt": "2025-06-08T00:25:42.322Z",
            "documents": [],
            "referenceNumber": "GE-2025-055",
            "qrCode": "QR-CERTIFICATE-45-20250828",
            "departmentId": "demo-dept-motor-traffic",
            "notes": "Appointment for death certificate",
            "id": "demo-appointment-055"
          }
        },
        {
          "id": "demo-appointment-056",
          "data": {
            "updatedAt": "2025-07-28T11:24:07.669Z",
            "notes": "Appointment for tax filing",
            "status": "no-show",
            "qrCode": "QR-FILING-46-20250811",
            "timeSlot": "08:00-09:10",
            "documents": [],
            "serviceId": "demo-service-tax-filing",
            "date": "2025-08-11T13:11:15.696Z",
            "userId": "demo-citizen-051",
            "referenceNumber": "GE-2025-056",
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2025-07-28T13:21:32.969Z",
            "id": "demo-appointment-056"
          }
        },
        {
          "id": "demo-appointment-057",
          "data": {
            "referenceNumber": "GE-2025-057",
            "date": "2025-08-27T14:43:20.495Z",
            "status": "confirmed",
            "qrCode": "QR-RENEWAL-47-20250827",
            "timeSlot": "15:00-15:55",
            "notes": "Appointment for passport renewal",
            "updatedAt": "2025-08-07T17:26:17.521Z",
            "userId": "demo-citizen-052",
            "createdAt": "2025-08-08T08:03:54.383Z",
            "departmentId": "demo-dept-registrar-general",
            "documents": [],
            "serviceId": "demo-service-passport-renewal",
            "id": "demo-appointment-057"
          }
        },
        {
          "id": "demo-appointment-058",
          "data": {
            "status": "completed",
            "documents": [],
            "qrCode": "QR-REGISTRATION-48-20250712",
            "referenceNumber": "GE-2025-058",
            "createdAt": "2025-06-22T23:57:09.560Z",
            "serviceId": "demo-service-vehicle-registration",
            "date": "2025-07-11T19:08:19.502Z",
            "userId": "demo-citizen-053",
            "timeSlot": "13:30-14:23",
            "id": "demo-appointment-058",
            "departmentId": "demo-dept-inland-revenue",
            "updatedAt": "2025-07-20T13:24:44.825Z",
            "notes": "Appointment for vehicle registration"
          }
        },
        {
          "id": "demo-appointment-059",
          "data": {
            "notes": "Appointment for tax registration",
            "qrCode": "QR-REGISTRATION-49-20250830",
            "referenceNumber": "GE-2025-059",
            "userId": "demo-citizen-054",
            "serviceId": "demo-service-tax-registration",
            "documents": [],
            "createdAt": "2025-07-05T16:36:40.498Z",
            "departmentId": "demo-dept-registrar-general",
            "id": "demo-appointment-059",
            "status": "pending",
            "updatedAt": "2025-08-14T17:27:17.084Z",
            "timeSlot": "15:30-16:36",
            "date": "2025-08-29T23:11:04.002Z"
          }
        },
        {
          "id": "demo-appointment-060",
          "data": {
            "date": "2025-08-24T07:57:15.246Z",
            "status": "pending",
            "qrCode": "QR-LICENSE-50-20250824",
            "departmentId": "demo-dept-inland-revenue",
            "userId": "demo-citizen-055",
            "notes": "Appointment for driving license",
            "createdAt": "2025-08-05T13:34:51.142Z",
            "timeSlot": "16:00-16:38",
            "serviceId": "demo-service-driving-license",
            "documents": [],
            "referenceNumber": "GE-2025-060",
            "updatedAt": "2025-08-06T18:36:08.149Z",
            "id": "demo-appointment-060"
          }
        },
        {
          "id": "demo-appointment-061",
          "data": {
            "serviceId": "demo-service-visa-extension",
            "updatedAt": "2025-08-15T04:24:41.363Z",
            "createdAt": "2025-05-21T16:07:27.744Z",
            "notes": "Appointment for visa extension",
            "documents": [],
            "status": "no-show",
            "date": "2025-07-29T14:41:16.864Z",
            "referenceNumber": "GE-2025-061",
            "id": "demo-appointment-061",
            "timeSlot": "14:30-15:41",
            "qrCode": "QR-EXTENSION-51-20250729",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-immigration"
          }
        },
        {
          "id": "demo-appointment-062",
          "data": {
            "serviceId": "demo-service-visa-extension",
            "userId": "demo-citizen-001",
            "timeSlot": "14:30-15:12",
            "createdAt": "2025-08-14T02:46:10.991Z",
            "referenceNumber": "GE-2025-062",
            "qrCode": "QR-EXTENSION-52-20250727",
            "notes": "Appointment for visa extension",
            "id": "demo-appointment-062",
            "updatedAt": "2025-08-07T15:32:03.832Z",
            "status": "no-show",
            "date": "2025-07-26T22:27:18.349Z",
            "departmentId": "demo-dept-inland-revenue",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-063",
          "data": {
            "departmentId": "demo-dept-motor-traffic",
            "qrCode": "QR-LICENSE-53-20250714",
            "notes": "Appointment for driving license",
            "referenceNumber": "GE-2025-063",
            "date": "2025-07-14T02:20:23.330Z",
            "documents": [],
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-driving-license",
            "id": "demo-appointment-063",
            "status": "completed",
            "updatedAt": "2025-07-23T07:36:42.407Z",
            "timeSlot": "09:00-10:13",
            "createdAt": "2025-07-26T07:41:40.237Z"
          }
        },
        {
          "id": "demo-appointment-064",
          "data": {
            "date": "2025-07-18T05:20:09.141Z",
            "createdAt": "2025-07-31T16:46:23.820Z",
            "referenceNumber": "GE-2025-064",
            "departmentId": "demo-dept-immigration",
            "id": "demo-appointment-064",
            "serviceId": "demo-service-tax-clearance",
            "documents": [],
            "qrCode": "QR-CLEARANCE-54-20250718",
            "status": "cancelled",
            "notes": "Appointment for tax clearance",
            "updatedAt": "2025-07-25T22:06:19.265Z",
            "userId": "demo-citizen-001",
            "timeSlot": "10:00-11:22"
          }
        },
        {
          "id": "demo-appointment-065",
          "data": {
            "updatedAt": "2025-08-14T09:58:43.675Z",
            "serviceId": "demo-service-vehicle-registration",
            "date": "2025-06-20T14:57:15.449Z",
            "status": "completed",
            "timeSlot": "08:00-08:48",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-20T08:19:19.049Z",
            "documents": [],
            "referenceNumber": "GE-2025-065",
            "departmentId": "demo-dept-inland-revenue",
            "qrCode": "QR-REGISTRATION-55-20250620",
            "notes": "Appointment for vehicle registration",
            "id": "demo-appointment-065"
          }
        },
        {
          "id": "demo-appointment-066",
          "data": {
            "updatedAt": "2025-08-08T03:28:02.335Z",
            "status": "cancelled",
            "serviceId": "demo-service-death-certificate",
            "documents": [],
            "userId": "demo-citizen-001",
            "qrCode": "QR-CERTIFICATE-56-20250816",
            "date": "2025-08-16T11:35:41.832Z",
            "id": "demo-appointment-066",
            "notes": "Appointment for death certificate",
            "timeSlot": "14:00-15:02",
            "createdAt": "2025-07-02T03:06:21.597Z",
            "referenceNumber": "GE-2025-066",
            "departmentId": "demo-dept-immigration"
          }
        },
        {
          "id": "demo-appointment-067",
          "data": {
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-07-17T09:47:15.060Z",
            "id": "demo-appointment-067",
            "updatedAt": "2025-08-15T19:57:32.131Z",
            "date": "2025-07-20T14:04:47.967Z",
            "notes": "Appointment for passport application",
            "status": "cancelled",
            "documents": [],
            "serviceId": "demo-service-passport-application",
            "referenceNumber": "GE-2025-067",
            "qrCode": "QR-APPLICATION-57-20250720",
            "timeSlot": "09:00-09:41"
          }
        },
        {
          "id": "demo-appointment-068",
          "data": {
            "notes": "Appointment for passport application",
            "timeSlot": "09:00-10:03",
            "documents": [],
            "updatedAt": "2025-07-18T10:16:56.929Z",
            "departmentId": "demo-dept-immigration",
            "date": "2025-08-05T10:10:22.174Z",
            "serviceId": "demo-service-passport-application",
            "userId": "demo-citizen-001",
            "qrCode": "QR-APPLICATION-58-20250805",
            "referenceNumber": "GE-2025-068",
            "createdAt": "2025-07-24T16:20:49.116Z",
            "status": "cancelled",
            "id": "demo-appointment-068"
          }
        },
        {
          "id": "demo-appointment-069",
          "data": {
            "date": "2025-07-31T01:14:45.859Z",
            "createdAt": "2025-05-27T15:06:56.803Z",
            "referenceNumber": "GE-2025-069",
            "departmentId": "demo-dept-immigration",
            "id": "demo-appointment-069",
            "serviceId": "demo-service-marriage-certificate",
            "documents": [],
            "qrCode": "QR-CERTIFICATE-59-20250731",
            "status": "no-show",
            "notes": "Appointment for marriage certificate",
            "updatedAt": "2025-08-10T06:33:46.402Z",
            "userId": "demo-citizen-001",
            "timeSlot": "14:30-15:49"
          }
        },
        {
          "id": "demo-appointment-070",
          "data": {
            "qrCode": "QR-REGISTRATION-60-20250730",
            "timeSlot": "15:30-16:26",
            "status": "cancelled",
            "serviceId": "demo-service-tax-registration",
            "id": "demo-appointment-070",
            "departmentId": "demo-dept-immigration",
            "date": "2025-07-30T00:14:09.962Z",
            "notes": "Appointment for tax registration",
            "referenceNumber": "GE-2025-070",
            "userId": "demo-citizen-001",
            "createdAt": "2025-05-18T23:13:43.217Z",
            "documents": [],
            "updatedAt": "2025-07-17T19:24:53.646Z"
          }
        },
        {
          "id": "demo-appointment-071",
          "data": {
            "referenceNumber": "GE-2025-071",
            "createdAt": "2025-08-02T18:39:18.247Z",
            "timeSlot": "13:30-14:48",
            "documents": [],
            "departmentId": "demo-dept-immigration",
            "notes": "Appointment for tax registration",
            "status": "cancelled",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-tax-registration",
            "id": "demo-appointment-071",
            "date": "2025-07-19T20:25:37.225Z",
            "qrCode": "QR-REGISTRATION-61-20250720",
            "updatedAt": "2025-07-28T21:02:01.774Z"
          }
        },
        {
          "id": "demo-appointment-072",
          "data": {
            "date": "2025-07-28T14:10:08.215Z",
            "notes": "Appointment for license renewal",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-07-19T06:19:32.463Z",
            "status": "cancelled",
            "referenceNumber": "GE-2025-072",
            "createdAt": "2025-05-28T17:19:10.094Z",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-license-renewal",
            "timeSlot": "09:00-10:14",
            "qrCode": "QR-RENEWAL-62-20250728",
            "id": "demo-appointment-072",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-073",
          "data": {
            "status": "no-show",
            "departmentId": "demo-dept-inland-revenue",
            "timeSlot": "09:00-10:22",
            "id": "demo-appointment-073",
            "notes": "Appointment for license renewal",
            "userId": "demo-citizen-001",
            "createdAt": "2025-08-02T20:00:36.991Z",
            "referenceNumber": "GE-2025-073",
            "updatedAt": "2025-07-23T02:50:49.512Z",
            "date": "2025-08-10T20:36:40.635Z",
            "documents": [],
            "qrCode": "QR-RENEWAL-63-20250811",
            "serviceId": "demo-service-license-renewal"
          }
        },
        {
          "id": "demo-appointment-074",
          "data": {
            "serviceId": "demo-service-passport-application",
            "updatedAt": "2025-08-13T15:20:57.480Z",
            "referenceNumber": "GE-2025-074",
            "id": "demo-appointment-074",
            "documents": [],
            "notes": "Appointment for passport application",
            "date": "2025-09-07T11:37:45.576Z",
            "createdAt": "2025-07-20T11:43:44.629Z",
            "qrCode": "QR-APPLICATION-64-20250907",
            "status": "confirmed",
            "departmentId": "demo-dept-inland-revenue",
            "timeSlot": "09:00-09:54",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-075",
          "data": {
            "qrCode": "QR-CERTIFICATE-65-20250823",
            "updatedAt": "2025-08-13T07:49:09.071Z",
            "date": "2025-08-22T20:26:51.244Z",
            "createdAt": "2025-05-23T18:12:40.589Z",
            "referenceNumber": "GE-2025-075",
            "timeSlot": "14:00-15:22",
            "serviceId": "demo-service-death-certificate",
            "status": "pending",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-inland-revenue",
            "documents": [],
            "id": "demo-appointment-075",
            "notes": "Appointment for death certificate"
          }
        },
        {
          "id": "demo-appointment-076",
          "data": {
            "status": "pending",
            "departmentId": "demo-dept-inland-revenue",
            "timeSlot": "09:00-10:06",
            "id": "demo-appointment-076",
            "notes": "Appointment for passport renewal",
            "createdAt": "2025-07-09T14:05:52.847Z",
            "userId": "demo-citizen-001",
            "updatedAt": "2025-07-23T22:50:49.814Z",
            "referenceNumber": "GE-2025-076",
            "date": "2025-09-10T04:40:06.213Z",
            "documents": [],
            "qrCode": "QR-RENEWAL-66-20250910",
            "serviceId": "demo-service-passport-renewal"
          }
        },
        {
          "id": "demo-appointment-077",
          "data": {
            "qrCode": "QR-REGISTRATION-67-20250827",
            "departmentId": "demo-dept-motor-traffic",
            "notes": "Appointment for tax registration",
            "id": "demo-appointment-077",
            "serviceId": "demo-service-tax-registration",
            "referenceNumber": "GE-2025-077",
            "date": "2025-08-26T18:46:22.035Z",
            "documents": [],
            "timeSlot": "11:00-11:40",
            "updatedAt": "2025-07-27T14:22:22.597Z",
            "userId": "demo-citizen-001",
            "createdAt": "2025-05-22T19:16:18.254Z",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-078",
          "data": {
            "departmentId": "demo-dept-motor-traffic",
            "date": "2025-09-08T22:43:44.914Z",
            "qrCode": "QR-RENEWAL-68-20250909",
            "userId": "demo-citizen-001",
            "notes": "Appointment for license renewal",
            "status": "confirmed",
            "createdAt": "2025-05-24T04:59:59.929Z",
            "timeSlot": "08:00-08:59",
            "id": "demo-appointment-078",
            "referenceNumber": "GE-2025-078",
            "serviceId": "demo-service-license-renewal",
            "documents": [],
            "updatedAt": "2025-07-31T00:05:58.854Z"
          }
        },
        {
          "id": "demo-appointment-079",
          "data": {
            "status": "completed",
            "createdAt": "2025-07-08T11:51:53.853Z",
            "updatedAt": "2025-08-10T23:41:58.962Z",
            "timeSlot": "15:00-15:52",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-motor-traffic",
            "qrCode": "QR-CERTIFICATE-69-20250809",
            "date": "2025-08-09T00:56:43.048Z",
            "documents": [],
            "serviceId": "demo-service-birth-certificate",
            "id": "demo-appointment-079",
            "notes": "Appointment for birth certificate",
            "referenceNumber": "GE-2025-079"
          }
        },
        {
          "id": "demo-appointment-080",
          "data": {
            "timeSlot": "08:30-09:14",
            "serviceId": "demo-service-birth-certificate",
            "referenceNumber": "GE-2025-080",
            "status": "cancelled",
            "createdAt": "2025-07-18T13:40:53.818Z",
            "qrCode": "QR-CERTIFICATE-70-20250809",
            "departmentId": "demo-dept-immigration",
            "documents": [],
            "userId": "demo-citizen-001",
            "id": "demo-appointment-080",
            "date": "2025-08-09T10:00:19.366Z",
            "notes": "Appointment for birth certificate",
            "updatedAt": "2025-07-21T21:59:29.415Z"
          }
        },
        {
          "id": "demo-appointment-081",
          "data": {
            "updatedAt": "2025-07-22T05:00:20.238Z",
            "status": "no-show",
            "referenceNumber": "GE-2025-081",
            "serviceId": "demo-service-tax-clearance",
            "date": "2025-08-03T02:03:34.762Z",
            "timeSlot": "10:00-11:00",
            "id": "demo-appointment-081",
            "notes": "Appointment for tax clearance",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-motor-traffic",
            "documents": [],
            "createdAt": "2025-07-22T13:44:47.633Z",
            "qrCode": "QR-CLEARANCE-71-20250803"
          }
        },
        {
          "id": "demo-appointment-082",
          "data": {
            "notes": "Appointment for passport application",
            "status": "completed",
            "id": "demo-appointment-082",
            "referenceNumber": "GE-2025-082",
            "qrCode": "QR-APPLICATION-72-20250628",
            "serviceId": "demo-service-passport-application",
            "updatedAt": "2025-07-31T23:49:08.435Z",
            "documents": [],
            "date": "2025-06-28T17:51:57.299Z",
            "timeSlot": "14:30-15:07",
            "userId": "demo-citizen-001",
            "createdAt": "2025-06-03T20:39:41.086Z",
            "departmentId": "demo-dept-registrar-general"
          }
        },
        {
          "id": "demo-appointment-083",
          "data": {
            "qrCode": "QR-CERTIFICATE-73-20250810",
            "timeSlot": "11:00-12:08",
            "status": "no-show",
            "serviceId": "demo-service-birth-certificate",
            "id": "demo-appointment-083",
            "departmentId": "demo-dept-immigration",
            "date": "2025-08-10T12:06:25.179Z",
            "notes": "Appointment for birth certificate",
            "referenceNumber": "GE-2025-083",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-13T12:36:32.486Z",
            "updatedAt": "2025-07-18T10:06:30.967Z",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-084",
          "data": {
            "status": "cancelled",
            "documents": [],
            "notes": "Appointment for tax registration",
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-001",
            "qrCode": "QR-REGISTRATION-74-20250812",
            "referenceNumber": "GE-2025-084",
            "serviceId": "demo-service-tax-registration",
            "createdAt": "2025-06-27T01:32:18.428Z",
            "updatedAt": "2025-08-11T23:25:41.700Z",
            "id": "demo-appointment-084",
            "timeSlot": "08:30-09:23",
            "date": "2025-08-12T06:42:14.824Z"
          }
        },
        {
          "id": "demo-appointment-085",
          "data": {
            "serviceId": "demo-service-tax-clearance",
            "id": "demo-appointment-085",
            "departmentId": "demo-dept-registrar-general",
            "referenceNumber": "GE-2025-085",
            "date": "2025-07-30T16:21:43.608Z",
            "userId": "demo-citizen-001",
            "qrCode": "QR-CLEARANCE-75-20250730",
            "notes": "Appointment for tax clearance",
            "documents": [],
            "createdAt": "2025-08-07T06:33:11.388Z",
            "updatedAt": "2025-08-05T00:32:28.651Z",
            "timeSlot": "13:30-14:37",
            "status": "no-show"
          }
        },
        {
          "id": "demo-appointment-086",
          "data": {
            "createdAt": "2025-07-17T21:35:05.089Z",
            "id": "demo-appointment-086",
            "userId": "demo-citizen-001",
            "date": "2025-08-25T06:41:28.376Z",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-07-27T10:36:29.812Z",
            "timeSlot": "13:00-14:00",
            "qrCode": "QR-RENEWAL-76-20250825",
            "notes": "Appointment for passport renewal",
            "serviceId": "demo-service-passport-renewal",
            "referenceNumber": "GE-2025-086",
            "status": "pending",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-087",
          "data": {
            "qrCode": "QR-LICENSE-77-20250731",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-driving-license",
            "updatedAt": "2025-08-07T14:41:41.481Z",
            "departmentId": "demo-dept-registrar-general",
            "date": "2025-07-30T23:50:25.292Z",
            "status": "cancelled",
            "createdAt": "2025-07-02T04:00:50.486Z",
            "notes": "Appointment for driving license",
            "documents": [],
            "referenceNumber": "GE-2025-087",
            "id": "demo-appointment-087",
            "timeSlot": "14:30-15:42"
          }
        },
        {
          "id": "demo-appointment-088",
          "data": {
            "qrCode": "QR-RENEWAL-78-20250910",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-passport-renewal",
            "notes": "Appointment for passport renewal",
            "id": "demo-appointment-088",
            "referenceNumber": "GE-2025-088",
            "date": "2025-09-10T05:38:00.899Z",
            "updatedAt": "2025-07-27T04:02:33.516Z",
            "documents": [],
            "timeSlot": "15:30-16:33",
            "createdAt": "2025-07-08T05:34:19.305Z",
            "userId": "demo-citizen-001",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-089",
          "data": {
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-08-01T11:02:28.608Z",
            "serviceId": "demo-service-tax-clearance",
            "timeSlot": "16:00-16:36",
            "date": "2025-08-08T21:23:39.820Z",
            "referenceNumber": "GE-2025-089",
            "status": "cancelled",
            "userId": "demo-citizen-001",
            "qrCode": "QR-CLEARANCE-79-20250809",
            "id": "demo-appointment-089",
            "documents": [],
            "updatedAt": "2025-07-23T22:23:03.155Z",
            "notes": "Appointment for tax clearance"
          }
        },
        {
          "id": "demo-appointment-090",
          "data": {
            "notes": "Appointment for marriage certificate",
            "qrCode": "QR-CERTIFICATE-80-20250716",
            "createdAt": "2025-06-22T23:04:12.259Z",
            "id": "demo-appointment-090",
            "serviceId": "demo-service-marriage-certificate",
            "referenceNumber": "GE-2025-090",
            "updatedAt": "2025-08-02T16:48:43.664Z",
            "documents": [],
            "userId": "demo-citizen-001",
            "status": "completed",
            "departmentId": "demo-dept-inland-revenue",
            "date": "2025-07-16T08:17:11.749Z",
            "timeSlot": "09:00-10:08"
          }
        },
        {
          "id": "demo-appointment-091",
          "data": {
            "createdAt": "2025-05-31T03:31:52.440Z",
            "notes": "Appointment for tax registration",
            "timeSlot": "09:00-10:07",
            "id": "demo-appointment-091",
            "updatedAt": "2025-08-13T00:49:27.116Z",
            "qrCode": "QR-REGISTRATION-81-20250710",
            "departmentId": "demo-dept-motor-traffic",
            "status": "completed",
            "referenceNumber": "GE-2025-091",
            "date": "2025-07-09T19:17:57.765Z",
            "documents": [],
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-tax-registration"
          }
        },
        {
          "id": "demo-appointment-092",
          "data": {
            "qrCode": "QR-APPLICATION-82-20250908",
            "documents": [],
            "id": "demo-appointment-092",
            "status": "confirmed",
            "departmentId": "demo-dept-motor-traffic",
            "notes": "Appointment for passport application",
            "timeSlot": "14:00-15:25",
            "serviceId": "demo-service-passport-application",
            "createdAt": "2025-07-15T09:38:58.794Z",
            "updatedAt": "2025-07-24T11:19:48.269Z",
            "referenceNumber": "GE-2025-092",
            "userId": "demo-citizen-001",
            "date": "2025-09-08T10:40:09.916Z"
          }
        },
        {
          "id": "demo-appointment-093",
          "data": {
            "notes": "Appointment for birth certificate",
            "updatedAt": "2025-08-05T08:26:45.870Z",
            "departmentId": "demo-dept-motor-traffic",
            "timeSlot": "11:30-12:16",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-093",
            "createdAt": "2025-06-30T16:46:29.432Z",
            "id": "demo-appointment-093",
            "date": "2025-07-20T14:48:58.619Z",
            "status": "cancelled",
            "documents": [],
            "qrCode": "QR-CERTIFICATE-83-20250720",
            "serviceId": "demo-service-birth-certificate"
          }
        },
        {
          "id": "demo-appointment-094",
          "data": {
            "departmentId": "demo-dept-registrar-general",
            "documents": [],
            "date": "2025-07-04T08:24:09.955Z",
            "serviceId": "demo-service-vehicle-registration",
            "createdAt": "2025-06-05T08:18:38.221Z",
            "userId": "demo-citizen-001",
            "status": "completed",
            "referenceNumber": "GE-2025-094",
            "updatedAt": "2025-08-09T22:18:29.577Z",
            "timeSlot": "09:00-10:10",
            "id": "demo-appointment-094",
            "qrCode": "QR-REGISTRATION-84-20250704",
            "notes": "Appointment for vehicle registration"
          }
        },
        {
          "id": "demo-appointment-095",
          "data": {
            "date": "2025-07-25T05:52:39.057Z",
            "createdAt": "2025-07-24T03:28:11.692Z",
            "notes": "Appointment for vehicle registration",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-vehicle-registration",
            "updatedAt": "2025-08-12T04:44:47.511Z",
            "departmentId": "demo-dept-motor-traffic",
            "referenceNumber": "GE-2025-095",
            "id": "demo-appointment-095",
            "timeSlot": "13:30-14:51",
            "status": "cancelled",
            "qrCode": "QR-REGISTRATION-85-20250725",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-096",
          "data": {
            "referenceNumber": "GE-2025-096",
            "date": "2025-07-26T06:32:51.994Z",
            "status": "cancelled",
            "qrCode": "QR-FILING-86-20250726",
            "timeSlot": "16:00-17:08",
            "notes": "Appointment for tax filing",
            "updatedAt": "2025-08-10T13:43:50.498Z",
            "userId": "demo-citizen-001",
            "createdAt": "2025-06-09T02:52:46.840Z",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-tax-filing",
            "documents": [],
            "id": "demo-appointment-096"
          }
        },
        {
          "id": "demo-appointment-097",
          "data": {
            "referenceNumber": "GE-2025-097",
            "updatedAt": "2025-07-18T06:36:48.703Z",
            "serviceId": "demo-service-vehicle-registration",
            "departmentId": "demo-dept-immigration",
            "createdAt": "2025-06-25T20:08:39.290Z",
            "status": "confirmed",
            "notes": "Appointment for vehicle registration",
            "documents": [],
            "timeSlot": "11:00-11:38",
            "id": "demo-appointment-097",
            "date": "2025-09-11T10:31:00.627Z",
            "userId": "demo-citizen-001",
            "qrCode": "QR-REGISTRATION-87-20250911"
          }
        },
        {
          "id": "demo-appointment-098",
          "data": {
            "updatedAt": "2025-08-03T08:35:38.034Z",
            "status": "completed",
            "serviceId": "demo-service-vehicle-registration",
            "documents": [],
            "userId": "demo-citizen-001",
            "qrCode": "QR-REGISTRATION-88-20250719",
            "date": "2025-07-18T23:22:07.316Z",
            "notes": "Appointment for vehicle registration",
            "id": "demo-appointment-098",
            "timeSlot": "09:00-10:05",
            "createdAt": "2025-07-02T23:06:29.713Z",
            "referenceNumber": "GE-2025-098",
            "departmentId": "demo-dept-motor-traffic"
          }
        },
        {
          "id": "demo-appointment-099",
          "data": {
            "qrCode": "QR-REGISTRATION-89-20250705",
            "serviceId": "demo-service-tax-registration",
            "referenceNumber": "GE-2025-099",
            "notes": "Appointment for tax registration",
            "createdAt": "2025-08-15T08:31:18.256Z",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-08-08T10:56:50.519Z",
            "timeSlot": "15:30-16:39",
            "status": "completed",
            "id": "demo-appointment-099",
            "date": "2025-07-05T10:31:39.591Z",
            "documents": [],
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-100",
          "data": {
            "qrCode": "QR-RENEWAL-90-20250729",
            "documents": [],
            "id": "demo-appointment-100",
            "status": "completed",
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for license renewal",
            "serviceId": "demo-service-license-renewal",
            "timeSlot": "13:30-14:27",
            "createdAt": "2025-05-24T00:07:51.238Z",
            "updatedAt": "2025-07-25T18:38:33.380Z",
            "referenceNumber": "GE-2025-100",
            "userId": "demo-citizen-001",
            "date": "2025-07-29T10:37:38.784Z"
          }
        },
        {
          "id": "demo-appointment-101",
          "data": {
            "departmentId": "demo-dept-inland-revenue",
            "timeSlot": "08:30-09:42",
            "documents": [],
            "status": "cancelled",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-birth-certificate",
            "notes": "Appointment for birth certificate",
            "qrCode": "QR-CERTIFICATE-91-20250812",
            "id": "demo-appointment-101",
            "date": "2025-08-12T05:51:01.054Z",
            "referenceNumber": "GE-2025-101",
            "updatedAt": "2025-08-16T12:22:34.696Z",
            "createdAt": "2025-05-31T13:14:14.698Z"
          }
        },
        {
          "id": "demo-appointment-102",
          "data": {
            "createdAt": "2025-06-26T16:31:29.690Z",
            "documents": [],
            "updatedAt": "2025-08-14T22:30:41.318Z",
            "status": "cancelled",
            "qrCode": "QR-CERTIFICATE-92-20250813",
            "notes": "Appointment for birth certificate",
            "departmentId": "demo-dept-motor-traffic",
            "id": "demo-appointment-102",
            "serviceId": "demo-service-birth-certificate",
            "timeSlot": "16:00-17:08",
            "date": "2025-08-13T06:17:27.224Z",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-102"
          }
        },
        {
          "id": "demo-appointment-103",
          "data": {
            "departmentId": "demo-dept-registrar-general",
            "documents": [],
            "status": "cancelled",
            "timeSlot": "13:30-14:41",
            "createdAt": "2025-07-03T18:35:00.351Z",
            "qrCode": "QR-EXTENSION-93-20250804",
            "updatedAt": "2025-08-01T05:55:03.087Z",
            "id": "demo-appointment-103",
            "notes": "Appointment for visa extension",
            "referenceNumber": "GE-2025-103",
            "date": "2025-08-04T05:38:45.697Z",
            "serviceId": "demo-service-visa-extension",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-104",
          "data": {
            "qrCode": "QR-RENEWAL-94-20250715",
            "status": "completed",
            "timeSlot": "13:00-13:33",
            "date": "2025-07-15T08:58:52.317Z",
            "serviceId": "demo-service-license-renewal",
            "createdAt": "2025-07-08T19:58:02.760Z",
            "id": "demo-appointment-104",
            "departmentId": "demo-dept-inland-revenue",
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "Appointment for license renewal",
            "updatedAt": "2025-07-30T00:30:02.161Z",
            "referenceNumber": "GE-2025-104"
          }
        },
        {
          "id": "demo-appointment-105",
          "data": {
            "qrCode": "QR-EXTENSION-95-20250905",
            "referenceNumber": "GE-2025-105",
            "updatedAt": "2025-07-24T18:49:18.932Z",
            "timeSlot": "13:30-14:53",
            "id": "demo-appointment-105",
            "documents": [],
            "serviceId": "demo-service-visa-extension",
            "departmentId": "demo-dept-motor-traffic",
            "userId": "demo-citizen-001",
            "status": "pending",
            "createdAt": "2025-07-03T00:29:13.695Z",
            "date": "2025-09-05T09:00:23.991Z",
            "notes": "Appointment for visa extension"
          }
        },
        {
          "id": "demo-appointment-106",
          "data": {
            "date": "2025-09-11T05:29:04.833Z",
            "notes": "Appointment for passport renewal",
            "departmentId": "demo-dept-registrar-general",
            "updatedAt": "2025-07-18T20:21:30.353Z",
            "status": "confirmed",
            "referenceNumber": "GE-2025-106",
            "userId": "demo-citizen-001",
            "createdAt": "2025-08-08T17:21:23.823Z",
            "serviceId": "demo-service-passport-renewal",
            "timeSlot": "08:30-09:30",
            "qrCode": "QR-RENEWAL-96-20250911",
            "id": "demo-appointment-106",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-107",
          "data": {
            "qrCode": "QR-LICENSE-97-20250909",
            "serviceId": "demo-service-driving-license",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-immigration",
            "createdAt": "2025-06-25T19:51:30.082Z",
            "documents": [],
            "id": "demo-appointment-107",
            "notes": "Appointment for driving license",
            "timeSlot": "10:30-11:36",
            "updatedAt": "2025-08-08T10:29:21.778Z",
            "referenceNumber": "GE-2025-107",
            "date": "2025-09-09T17:28:08.515Z",
            "status": "confirmed"
          }
        },
        {
          "id": "demo-appointment-108",
          "data": {
            "date": "2025-07-30T05:04:43.458Z",
            "timeSlot": "11:30-12:30",
            "documents": [],
            "id": "demo-appointment-108",
            "notes": "Appointment for birth certificate",
            "referenceNumber": "GE-2025-108",
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-birth-certificate",
            "updatedAt": "2025-08-16T02:09:43.531Z",
            "status": "cancelled",
            "qrCode": "QR-CERTIFICATE-98-20250730",
            "createdAt": "2025-08-11T16:38:23.941Z"
          }
        },
        {
          "id": "demo-appointment-109",
          "data": {
            "id": "demo-appointment-109",
            "notes": "Appointment for tax filing",
            "updatedAt": "2025-08-10T06:02:27.106Z",
            "documents": [],
            "referenceNumber": "GE-2025-109",
            "userId": "demo-citizen-001",
            "qrCode": "QR-FILING-99-20250723",
            "createdAt": "2025-05-20T05:52:33.124Z",
            "date": "2025-07-23T08:11:49.717Z",
            "status": "no-show",
            "serviceId": "demo-service-tax-filing",
            "departmentId": "demo-dept-immigration",
            "timeSlot": "11:00-11:42"
          }
        },
        {
          "id": "demo-appointment-110",
          "data": {
            "timeSlot": "10:30-11:28",
            "status": "confirmed",
            "date": "2025-08-31T22:35:34.904Z",
            "referenceNumber": "GE-2025-110",
            "createdAt": "2025-06-05T03:04:37.039Z",
            "userId": "demo-citizen-001",
            "qrCode": "QR-CERTIFICATE-100-20250901",
            "serviceId": "demo-service-death-certificate",
            "updatedAt": "2025-08-08T16:28:51.010Z",
            "id": "demo-appointment-110",
            "notes": "Appointment for death certificate",
            "departmentId": "demo-dept-registrar-general",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-111",
          "data": {
            "referenceNumber": "GE-2025-111",
            "userId": "demo-citizen-001",
            "status": "no-show",
            "updatedAt": "2025-07-23T17:12:51.637Z",
            "documents": [],
            "date": "2025-08-16T02:54:58.477Z",
            "timeSlot": "15:30-16:29",
            "notes": "Appointment for visa extension",
            "qrCode": "QR-EXTENSION-101-20250816",
            "id": "demo-appointment-111",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-visa-extension",
            "createdAt": "2025-08-09T05:06:50.840Z"
          }
        },
        {
          "id": "demo-appointment-112",
          "data": {
            "qrCode": "QR-CERTIFICATE-102-20250811",
            "departmentId": "demo-dept-registrar-general",
            "timeSlot": "09:30-10:13",
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "Appointment for marriage certificate",
            "referenceNumber": "GE-2025-112",
            "serviceId": "demo-service-marriage-certificate",
            "updatedAt": "2025-08-10T18:37:25.081Z",
            "date": "2025-08-11T05:04:32.078Z",
            "id": "demo-appointment-112",
            "createdAt": "2025-05-27T01:07:06.292Z",
            "status": "completed"
          }
        },
        {
          "id": "demo-appointment-113",
          "data": {
            "userId": "demo-citizen-001",
            "updatedAt": "2025-08-14T04:39:07.287Z",
            "referenceNumber": "GE-2025-113",
            "date": "2025-08-13T09:43:28.623Z",
            "qrCode": "QR-CERTIFICATE-103-20250813",
            "timeSlot": "14:00-14:51",
            "serviceId": "demo-service-death-certificate",
            "notes": "Appointment for death certificate",
            "createdAt": "2025-06-19T07:55:59.680Z",
            "departmentId": "demo-dept-registrar-general",
            "documents": [],
            "status": "no-show",
            "id": "demo-appointment-113"
          }
        },
        {
          "id": "demo-appointment-114",
          "data": {
            "referenceNumber": "GE-2025-114",
            "serviceId": "demo-service-driving-license",
            "userId": "demo-citizen-001",
            "timeSlot": "11:30-12:54",
            "id": "demo-appointment-114",
            "status": "no-show",
            "qrCode": "QR-LICENSE-104-20250806",
            "updatedAt": "2025-08-05T05:19:04.125Z",
            "documents": [],
            "createdAt": "2025-08-07T21:25:27.524Z",
            "notes": "Appointment for driving license",
            "date": "2025-08-06T16:10:33.363Z",
            "departmentId": "demo-dept-immigration"
          }
        },
        {
          "id": "demo-appointment-115",
          "data": {
            "date": "2025-08-25T00:41:20.984Z",
            "serviceId": "demo-service-birth-certificate",
            "documents": [],
            "notes": "Appointment for birth certificate",
            "createdAt": "2025-05-23T06:51:29.597Z",
            "updatedAt": "2025-08-08T17:25:10.322Z",
            "referenceNumber": "GE-2025-115",
            "status": "confirmed",
            "id": "demo-appointment-115",
            "userId": "demo-citizen-001",
            "timeSlot": "14:00-14:31",
            "qrCode": "QR-CERTIFICATE-105-20250825",
            "departmentId": "demo-dept-immigration"
          }
        },
        {
          "id": "demo-appointment-116",
          "data": {
            "departmentId": "demo-dept-motor-traffic",
            "date": "2025-07-22T19:37:29.705Z",
            "documents": [],
            "timeSlot": "10:00-11:21",
            "id": "demo-appointment-116",
            "serviceId": "demo-service-tax-registration",
            "qrCode": "QR-REGISTRATION-106-20250723",
            "updatedAt": "2025-08-16T00:31:14.169Z",
            "notes": "Appointment for tax registration",
            "createdAt": "2025-06-03T16:20:39.295Z",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-116",
            "status": "no-show"
          }
        },
        {
          "id": "demo-appointment-117",
          "data": {
            "status": "confirmed",
            "id": "demo-appointment-117",
            "date": "2025-08-31T03:17:00.375Z",
            "documents": [],
            "timeSlot": "15:30-16:45",
            "referenceNumber": "GE-2025-117",
            "notes": "Appointment for vehicle registration",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-06-20T18:41:11.203Z",
            "updatedAt": "2025-07-24T22:36:01.546Z",
            "serviceId": "demo-service-vehicle-registration",
            "qrCode": "QR-REGISTRATION-107-20250831"
          }
        },
        {
          "id": "demo-appointment-118",
          "data": {
            "departmentId": "demo-dept-inland-revenue",
            "timeSlot": "10:00-11:17",
            "userId": "demo-citizen-001",
            "updatedAt": "2025-07-25T06:56:15.237Z",
            "serviceId": "demo-service-death-certificate",
            "id": "demo-appointment-118",
            "qrCode": "QR-CERTIFICATE-108-20250822",
            "notes": "Appointment for death certificate",
            "documents": [],
            "date": "2025-08-22T11:15:09.454Z",
            "referenceNumber": "GE-2025-118",
            "createdAt": "2025-08-02T02:08:38.612Z",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-119",
          "data": {
            "departmentId": "demo-dept-immigration",
            "notes": "Appointment for marriage certificate",
            "updatedAt": "2025-07-26T12:47:22.996Z",
            "id": "demo-appointment-119",
            "documents": [],
            "status": "cancelled",
            "qrCode": "QR-CERTIFICATE-109-20250808",
            "date": "2025-08-08T02:54:27.199Z",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-119",
            "serviceId": "demo-service-marriage-certificate",
            "timeSlot": "14:00-15:10",
            "createdAt": "2025-08-01T06:18:57.892Z"
          }
        },
        {
          "id": "demo-appointment-120",
          "data": {
            "documents": [],
            "status": "no-show",
            "id": "demo-appointment-120",
            "serviceId": "demo-service-visa-extension",
            "userId": "demo-citizen-001",
            "qrCode": "QR-EXTENSION-110-20250721",
            "notes": "Appointment for visa extension",
            "updatedAt": "2025-08-06T11:59:24.369Z",
            "createdAt": "2025-07-19T02:13:35.523Z",
            "referenceNumber": "GE-2025-120",
            "timeSlot": "08:30-09:59",
            "date": "2025-07-21T08:52:12.197Z",
            "departmentId": "demo-dept-registrar-general"
          }
        },
        {
          "id": "demo-appointment-121",
          "data": {
            "id": "demo-appointment-121",
            "status": "confirmed",
            "departmentId": "demo-dept-registrar-general",
            "updatedAt": "2025-07-25T16:58:54.264Z",
            "date": "2025-08-19T11:52:07.166Z",
            "documents": [],
            "referenceNumber": "GE-2025-121",
            "serviceId": "demo-service-vehicle-registration",
            "timeSlot": "08:30-09:48",
            "createdAt": "2025-05-23T02:42:47.230Z",
            "qrCode": "QR-REGISTRATION-111-20250819",
            "userId": "demo-citizen-001",
            "notes": "Appointment for vehicle registration"
          }
        },
        {
          "id": "demo-appointment-122",
          "data": {
            "id": "demo-appointment-122",
            "date": "2025-07-30T14:17:48.393Z",
            "referenceNumber": "GE-2025-122",
            "updatedAt": "2025-08-11T07:50:38.952Z",
            "timeSlot": "08:30-09:18",
            "documents": [],
            "serviceId": "demo-service-visa-extension",
            "qrCode": "QR-EXTENSION-112-20250730",
            "userId": "demo-citizen-001",
            "createdAt": "2025-05-21T07:51:46.076Z",
            "status": "completed",
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for visa extension"
          }
        },
        {
          "id": "demo-appointment-123",
          "data": {
            "qrCode": "QR-RENEWAL-113-20250626",
            "timeSlot": "08:30-09:46",
            "date": "2025-06-25T19:10:47.137Z",
            "id": "demo-appointment-123",
            "updatedAt": "2025-08-13T11:45:45.438Z",
            "referenceNumber": "GE-2025-123",
            "documents": [],
            "serviceId": "demo-service-passport-renewal",
            "notes": "Appointment for passport renewal",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-07-18T08:54:32.959Z",
            "userId": "demo-citizen-001",
            "status": "completed"
          }
        },
        {
          "id": "demo-appointment-124",
          "data": {
            "date": "2025-08-22T17:21:41.734Z",
            "referenceNumber": "GE-2025-124",
            "serviceId": "demo-service-passport-renewal",
            "documents": [],
            "status": "pending",
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-001",
            "id": "demo-appointment-124",
            "createdAt": "2025-06-24T02:15:00.000Z",
            "qrCode": "QR-RENEWAL-114-20250822",
            "timeSlot": "08:30-09:06",
            "notes": "Appointment for passport renewal",
            "updatedAt": "2025-08-06T06:49:55.215Z"
          }
        },
        {
          "id": "demo-appointment-125",
          "data": {
            "date": "2025-08-13T21:14:04.475Z",
            "userId": "demo-citizen-001",
            "id": "demo-appointment-125",
            "departmentId": "demo-dept-inland-revenue",
            "qrCode": "QR-REGISTRATION-115-20250814",
            "referenceNumber": "GE-2025-125",
            "updatedAt": "2025-07-20T13:20:59.675Z",
            "serviceId": "demo-service-tax-registration",
            "createdAt": "2025-06-10T13:05:24.855Z",
            "notes": "Appointment for tax registration",
            "timeSlot": "13:30-14:09",
            "documents": [],
            "status": "cancelled"
          }
        },
        {
          "id": "demo-appointment-126",
          "data": {
            "documents": [],
            "qrCode": "QR-REGISTRATION-116-20250724",
            "createdAt": "2025-07-05T11:29:49.792Z",
            "date": "2025-07-24T02:22:34.640Z",
            "notes": "Appointment for vehicle registration",
            "referenceNumber": "GE-2025-126",
            "timeSlot": "13:30-14:21",
            "serviceId": "demo-service-vehicle-registration",
            "updatedAt": "2025-07-31T10:22:47.124Z",
            "userId": "demo-citizen-001",
            "status": "completed",
            "id": "demo-appointment-126",
            "departmentId": "demo-dept-inland-revenue"
          }
        },
        {
          "id": "demo-appointment-127",
          "data": {
            "documents": [],
            "date": "2025-08-21T12:37:01.208Z",
            "id": "demo-appointment-127",
            "qrCode": "QR-REGISTRATION-117-20250821",
            "timeSlot": "08:30-09:06",
            "notes": "Appointment for vehicle registration",
            "departmentId": "demo-dept-motor-traffic",
            "referenceNumber": "GE-2025-127",
            "status": "pending",
            "updatedAt": "2025-08-04T04:15:24.078Z",
            "serviceId": "demo-service-vehicle-registration",
            "userId": "demo-citizen-001",
            "createdAt": "2025-06-17T15:38:50.499Z"
          }
        },
        {
          "id": "demo-appointment-128",
          "data": {
            "date": "2025-07-02T18:18:21.384Z",
            "timeSlot": "11:00-11:50",
            "documents": [],
            "createdAt": "2025-06-05T04:16:37.377Z",
            "serviceId": "demo-service-passport-renewal",
            "updatedAt": "2025-07-30T14:47:48.254Z",
            "userId": "demo-citizen-001",
            "id": "demo-appointment-128",
            "status": "completed",
            "qrCode": "QR-RENEWAL-118-20250702",
            "departmentId": "demo-dept-inland-revenue",
            "notes": "Appointment for passport renewal",
            "referenceNumber": "GE-2025-128"
          }
        },
        {
          "id": "demo-appointment-129",
          "data": {
            "createdAt": "2025-05-25T01:26:33.360Z",
            "userId": "demo-citizen-001",
            "qrCode": "QR-RENEWAL-119-20250725",
            "departmentId": "demo-dept-registrar-general",
            "date": "2025-07-25T08:29:34.478Z",
            "status": "completed",
            "referenceNumber": "GE-2025-129",
            "id": "demo-appointment-129",
            "notes": "Appointment for passport renewal",
            "timeSlot": "15:00-15:47",
            "documents": [],
            "serviceId": "demo-service-passport-renewal",
            "updatedAt": "2025-08-08T17:15:04.885Z"
          }
        },
        {
          "id": "demo-appointment-130",
          "data": {
            "date": "2025-08-23T14:48:21.518Z",
            "referenceNumber": "GE-2025-130",
            "createdAt": "2025-07-15T23:24:53.924Z",
            "id": "demo-appointment-130",
            "serviceId": "demo-service-tax-filing",
            "userId": "demo-citizen-001",
            "timeSlot": "10:30-11:00",
            "departmentId": "demo-dept-motor-traffic",
            "qrCode": "QR-FILING-120-20250823",
            "updatedAt": "2025-07-30T13:57:28.679Z",
            "notes": "Appointment for tax filing",
            "status": "pending",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-131",
          "data": {
            "documents": [],
            "notes": "Appointment for visa extension",
            "referenceNumber": "GE-2025-131",
            "qrCode": "QR-EXTENSION-121-20250808",
            "timeSlot": "16:00-16:38",
            "date": "2025-08-08T09:30:12.601Z",
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2025-08-09T22:43:54.377Z",
            "updatedAt": "2025-08-14T11:48:25.169Z",
            "serviceId": "demo-service-visa-extension",
            "id": "demo-appointment-131",
            "status": "no-show",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-132",
          "data": {
            "createdAt": "2025-07-24T21:38:06.109Z",
            "userId": "demo-citizen-001",
            "status": "completed",
            "departmentId": "demo-dept-inland-revenue",
            "updatedAt": "2025-08-07T16:39:26.968Z",
            "documents": [],
            "referenceNumber": "GE-2025-132",
            "date": "2025-07-16T01:24:30.640Z",
            "qrCode": "QR-RENEWAL-122-20250716",
            "timeSlot": "16:00-17:16",
            "id": "demo-appointment-132",
            "serviceId": "demo-service-passport-renewal",
            "notes": "Appointment for passport renewal"
          }
        },
        {
          "id": "demo-appointment-133",
          "data": {
            "userId": "demo-citizen-001",
            "notes": "Appointment for tax registration",
            "createdAt": "2025-07-09T23:42:50.056Z",
            "timeSlot": "16:00-16:33",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-07-21T16:39:02.078Z",
            "serviceId": "demo-service-tax-registration",
            "date": "2025-07-29T06:22:03.760Z",
            "referenceNumber": "GE-2025-133",
            "status": "no-show",
            "documents": [],
            "qrCode": "QR-REGISTRATION-123-20250729",
            "id": "demo-appointment-133"
          }
        },
        {
          "id": "demo-appointment-134",
          "data": {
            "referenceNumber": "GE-2025-134",
            "qrCode": "QR-CERTIFICATE-124-20250802",
            "userId": "demo-citizen-001",
            "createdAt": "2025-08-07T15:16:06.305Z",
            "departmentId": "demo-dept-motor-traffic",
            "updatedAt": "2025-08-04T13:59:07.751Z",
            "date": "2025-08-02T09:04:47.356Z",
            "id": "demo-appointment-134",
            "notes": "Appointment for birth certificate",
            "status": "no-show",
            "serviceId": "demo-service-birth-certificate",
            "documents": [],
            "timeSlot": "13:00-14:03"
          }
        },
        {
          "id": "demo-appointment-135",
          "data": {
            "qrCode": "QR-REGISTRATION-125-20250911",
            "timeSlot": "13:00-13:35",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-vehicle-registration",
            "departmentId": "demo-dept-inland-revenue",
            "updatedAt": "2025-08-14T21:58:31.960Z",
            "date": "2025-09-11T06:06:31.106Z",
            "notes": "Appointment for vehicle registration",
            "documents": [],
            "id": "demo-appointment-135",
            "referenceNumber": "GE-2025-135",
            "createdAt": "2025-07-02T05:19:38.233Z",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-136",
          "data": {
            "date": "2025-09-13T21:52:29.803Z",
            "documents": [],
            "id": "demo-appointment-136",
            "departmentId": "demo-dept-immigration",
            "qrCode": "QR-FILING-126-20250914",
            "timeSlot": "10:00-10:55",
            "referenceNumber": "GE-2025-136",
            "status": "confirmed",
            "updatedAt": "2025-07-27T19:21:20.669Z",
            "notes": "Appointment for tax filing",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-tax-filing",
            "createdAt": "2025-08-02T22:44:21.731Z"
          }
        },
        {
          "id": "demo-appointment-137",
          "data": {
            "referenceNumber": "GE-2025-137",
            "qrCode": "QR-CERTIFICATE-127-20250729",
            "updatedAt": "2025-07-31T17:07:57.936Z",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-12T15:47:28.822Z",
            "status": "no-show",
            "id": "demo-appointment-137",
            "departmentId": "demo-dept-immigration",
            "notes": "Appointment for marriage certificate",
            "date": "2025-07-29T17:35:27.354Z",
            "serviceId": "demo-service-marriage-certificate",
            "timeSlot": "09:00-10:02",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-138",
          "data": {
            "notes": "Appointment for driving license",
            "date": "2025-09-08T22:40:33.464Z",
            "status": "pending",
            "id": "demo-appointment-138",
            "departmentId": "demo-dept-motor-traffic",
            "serviceId": "demo-service-driving-license",
            "userId": "demo-citizen-001",
            "qrCode": "QR-LICENSE-128-20250909",
            "createdAt": "2025-07-29T12:45:01.974Z",
            "documents": [],
            "referenceNumber": "GE-2025-138",
            "timeSlot": "09:00-10:01",
            "updatedAt": "2025-07-28T00:12:56.985Z"
          }
        },
        {
          "id": "demo-appointment-139",
          "data": {
            "serviceId": "demo-service-tax-filing",
            "date": "2025-08-24T15:37:56.139Z",
            "userId": "demo-citizen-001",
            "status": "confirmed",
            "qrCode": "QR-FILING-129-20250824",
            "id": "demo-appointment-139",
            "notes": "Appointment for tax filing",
            "departmentId": "demo-dept-inland-revenue",
            "referenceNumber": "GE-2025-139",
            "timeSlot": "10:00-11:12",
            "updatedAt": "2025-08-13T13:03:23.549Z",
            "createdAt": "2025-07-31T19:48:15.003Z",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-140",
          "data": {
            "documents": [],
            "updatedAt": "2025-08-13T17:00:53.908Z",
            "referenceNumber": "GE-2025-140",
            "status": "completed",
            "departmentId": "demo-dept-immigration",
            "date": "2025-08-10T08:47:53.210Z",
            "userId": "demo-citizen-001",
            "timeSlot": "09:00-09:32",
            "serviceId": "demo-service-marriage-certificate",
            "id": "demo-appointment-140",
            "qrCode": "QR-CERTIFICATE-130-20250810",
            "createdAt": "2025-06-28T11:57:30.589Z",
            "notes": "Appointment for marriage certificate"
          }
        },
        {
          "id": "demo-appointment-141",
          "data": {
            "id": "demo-appointment-141",
            "date": "2025-07-10T01:54:15.230Z",
            "timeSlot": "16:00-17:09",
            "referenceNumber": "GE-2025-141",
            "departmentId": "demo-dept-inland-revenue",
            "status": "completed",
            "documents": [],
            "notes": "Appointment for license renewal",
            "updatedAt": "2025-08-03T00:19:35.996Z",
            "serviceId": "demo-service-license-renewal",
            "qrCode": "QR-RENEWAL-131-20250710",
            "userId": "demo-citizen-001",
            "createdAt": "2025-05-23T10:25:18.889Z"
          }
        },
        {
          "id": "demo-appointment-142",
          "data": {
            "referenceNumber": "GE-2025-142",
            "qrCode": "QR-APPLICATION-132-20250718",
            "date": "2025-07-18T01:01:35.336Z",
            "timeSlot": "14:30-15:32",
            "serviceId": "demo-service-passport-application",
            "documents": [],
            "id": "demo-appointment-142",
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2025-07-29T12:57:38.689Z",
            "updatedAt": "2025-07-22T06:27:17.418Z",
            "status": "no-show",
            "userId": "demo-citizen-001",
            "notes": "Appointment for passport application"
          }
        },
        {
          "id": "demo-appointment-143",
          "data": {
            "referenceNumber": "GE-2025-143",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-08-13T19:39:10.206Z",
            "userId": "demo-citizen-001",
            "qrCode": "QR-REGISTRATION-133-20250908",
            "timeSlot": "08:30-09:44",
            "documents": [],
            "date": "2025-09-07T23:01:55.807Z",
            "id": "demo-appointment-143",
            "notes": "Appointment for tax registration",
            "status": "pending",
            "createdAt": "2025-07-02T17:39:20.164Z",
            "serviceId": "demo-service-tax-registration"
          }
        },
        {
          "id": "demo-appointment-144",
          "data": {
            "serviceId": "demo-service-tax-registration",
            "status": "completed",
            "documents": [],
            "departmentId": "demo-dept-inland-revenue",
            "notes": "Appointment for tax registration",
            "createdAt": "2025-07-12T17:27:26.711Z",
            "qrCode": "QR-REGISTRATION-134-20250801",
            "referenceNumber": "GE-2025-144",
            "updatedAt": "2025-08-08T20:16:43.472Z",
            "timeSlot": "15:30-16:05",
            "userId": "demo-citizen-001",
            "date": "2025-08-01T11:48:52.295Z",
            "id": "demo-appointment-144"
          }
        },
        {
          "id": "demo-appointment-145",
          "data": {
            "departmentId": "demo-dept-inland-revenue",
            "createdAt": "2025-07-19T17:00:26.366Z",
            "qrCode": "QR-EXTENSION-135-20250804",
            "referenceNumber": "GE-2025-145",
            "id": "demo-appointment-145",
            "updatedAt": "2025-07-21T01:46:54.964Z",
            "serviceId": "demo-service-visa-extension",
            "userId": "demo-citizen-001",
            "date": "2025-08-04T00:31:08.471Z",
            "status": "no-show",
            "documents": [],
            "timeSlot": "09:30-10:40",
            "notes": "Appointment for visa extension"
          }
        },
        {
          "id": "demo-appointment-146",
          "data": {
            "serviceId": "demo-service-passport-renewal",
            "status": "no-show",
            "documents": [],
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-08-08T04:12:20.364Z",
            "notes": "Appointment for passport renewal",
            "qrCode": "QR-RENEWAL-136-20250805",
            "referenceNumber": "GE-2025-146",
            "updatedAt": "2025-08-03T14:32:28.231Z",
            "timeSlot": "13:00-13:35",
            "userId": "demo-citizen-001",
            "date": "2025-08-05T18:13:04.612Z",
            "id": "demo-appointment-146"
          }
        },
        {
          "id": "demo-appointment-147",
          "data": {
            "createdAt": "2025-06-25T07:58:06.433Z",
            "serviceId": "demo-service-marriage-certificate",
            "updatedAt": "2025-08-06T19:07:22.115Z",
            "departmentId": "demo-dept-motor-traffic",
            "referenceNumber": "GE-2025-147",
            "id": "demo-appointment-147",
            "notes": "Appointment for marriage certificate",
            "date": "2025-07-04T16:44:16.086Z",
            "status": "completed",
            "qrCode": "QR-CERTIFICATE-137-20250704",
            "timeSlot": "13:30-14:54",
            "documents": [],
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-148",
          "data": {
            "id": "demo-appointment-148",
            "notes": "Appointment for passport renewal",
            "updatedAt": "2025-08-14T17:10:53.812Z",
            "documents": [],
            "referenceNumber": "GE-2025-148",
            "userId": "demo-citizen-001",
            "qrCode": "QR-RENEWAL-138-20250911",
            "createdAt": "2025-06-11T08:43:10.987Z",
            "status": "confirmed",
            "date": "2025-09-11T01:05:06.137Z",
            "serviceId": "demo-service-passport-renewal",
            "departmentId": "demo-dept-motor-traffic",
            "timeSlot": "16:00-16:53"
          }
        },
        {
          "id": "demo-appointment-149",
          "data": {
            "createdAt": "2025-06-18T20:02:25.201Z",
            "userId": "demo-citizen-001",
            "qrCode": "QR-APPLICATION-139-20250828",
            "departmentId": "demo-dept-inland-revenue",
            "date": "2025-08-27T23:22:37.473Z",
            "status": "pending",
            "referenceNumber": "GE-2025-149",
            "id": "demo-appointment-149",
            "notes": "Appointment for passport application",
            "timeSlot": "14:30-15:19",
            "documents": [],
            "serviceId": "demo-service-passport-application",
            "updatedAt": "2025-08-06T09:21:25.935Z"
          }
        },
        {
          "id": "demo-appointment-150",
          "data": {
            "createdAt": "2025-07-20T11:56:59.403Z",
            "date": "2025-07-19T15:48:34.394Z",
            "status": "cancelled",
            "serviceId": "demo-service-license-renewal",
            "updatedAt": "2025-07-30T09:44:51.658Z",
            "notes": "Appointment for license renewal",
            "documents": [],
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-registrar-general",
            "referenceNumber": "GE-2025-150",
            "qrCode": "QR-RENEWAL-140-20250719",
            "timeSlot": "11:30-12:53",
            "id": "demo-appointment-150"
          }
        },
        {
          "id": "demo-appointment-151",
          "data": {
            "updatedAt": "2025-08-03T20:11:06.110Z",
            "departmentId": "demo-dept-inland-revenue",
            "documents": [],
            "referenceNumber": "GE-2025-151",
            "id": "demo-appointment-151",
            "serviceId": "demo-service-license-renewal",
            "timeSlot": "08:30-09:03",
            "userId": "demo-citizen-001",
            "date": "2025-08-16T05:59:50.648Z",
            "status": "no-show",
            "notes": "Appointment for license renewal",
            "createdAt": "2025-07-14T00:33:28.708Z",
            "qrCode": "QR-RENEWAL-141-20250816"
          }
        },
        {
          "id": "demo-appointment-152",
          "data": {
            "updatedAt": "2025-08-16T04:11:01.588Z",
            "departmentId": "demo-dept-immigration",
            "timeSlot": "08:00-09:21",
            "date": "2025-08-25T05:02:47.603Z",
            "userId": "demo-citizen-001",
            "notes": "Appointment for death certificate",
            "createdAt": "2025-07-21T17:07:23.308Z",
            "documents": [],
            "id": "demo-appointment-152",
            "status": "confirmed",
            "qrCode": "QR-CERTIFICATE-142-20250825",
            "serviceId": "demo-service-death-certificate",
            "referenceNumber": "GE-2025-152"
          }
        },
        {
          "id": "demo-appointment-153",
          "data": {
            "date": "2025-07-26T12:42:39.177Z",
            "serviceId": "demo-service-driving-license",
            "notes": "Appointment for driving license",
            "id": "demo-appointment-153",
            "updatedAt": "2025-07-17T18:52:04.934Z",
            "departmentId": "demo-dept-immigration",
            "referenceNumber": "GE-2025-153",
            "status": "no-show",
            "qrCode": "QR-LICENSE-143-20250726",
            "timeSlot": "13:00-14:15",
            "userId": "demo-citizen-001",
            "createdAt": "2025-06-12T01:04:41.373Z",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-154",
          "data": {
            "referenceNumber": "GE-2025-154",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-20T21:13:44.434Z",
            "documents": [],
            "departmentId": "demo-dept-motor-traffic",
            "date": "2025-08-11T06:30:19.385Z",
            "notes": "Appointment for visa extension",
            "updatedAt": "2025-08-01T04:56:47.939Z",
            "id": "demo-appointment-154",
            "qrCode": "QR-EXTENSION-144-20250811",
            "status": "completed",
            "serviceId": "demo-service-visa-extension",
            "timeSlot": "11:00-11:49"
          }
        },
        {
          "id": "demo-appointment-155",
          "data": {
            "status": "no-show",
            "date": "2025-07-22T02:31:03.711Z",
            "notes": "Appointment for license renewal",
            "updatedAt": "2025-07-26T12:28:33.251Z",
            "documents": [],
            "serviceId": "demo-service-license-renewal",
            "referenceNumber": "GE-2025-155",
            "departmentId": "demo-dept-immigration",
            "createdAt": "2025-06-26T07:05:41.473Z",
            "qrCode": "QR-RENEWAL-145-20250722",
            "timeSlot": "08:00-08:34",
            "userId": "demo-citizen-001",
            "id": "demo-appointment-155"
          }
        },
        {
          "id": "demo-appointment-156",
          "data": {
            "qrCode": "QR-RENEWAL-146-20250806",
            "departmentId": "demo-dept-inland-revenue",
            "status": "completed",
            "referenceNumber": "GE-2025-156",
            "id": "demo-appointment-156",
            "userId": "demo-citizen-001",
            "documents": [],
            "createdAt": "2025-06-11T17:39:01.764Z",
            "notes": "Appointment for license renewal",
            "timeSlot": "15:00-15:45",
            "updatedAt": "2025-08-09T04:08:48.420Z",
            "date": "2025-08-06T00:11:17.982Z",
            "serviceId": "demo-service-license-renewal"
          }
        },
        {
          "id": "demo-appointment-157",
          "data": {
            "date": "2025-08-17T06:45:16.467Z",
            "serviceId": "demo-service-tax-filing",
            "status": "confirmed",
            "documents": [],
            "id": "demo-appointment-157",
            "timeSlot": "10:30-11:58",
            "referenceNumber": "GE-2025-157",
            "qrCode": "QR-FILING-147-20250817",
            "createdAt": "2025-08-16T13:09:01.964Z",
            "notes": "Appointment for tax filing",
            "userId": "demo-citizen-001",
            "updatedAt": "2025-08-03T11:09:34.291Z",
            "departmentId": "demo-dept-registrar-general"
          }
        },
        {
          "id": "demo-appointment-158",
          "data": {
            "date": "2025-08-21T19:06:25.308Z",
            "qrCode": "QR-REGISTRATION-148-20250822",
            "timeSlot": "10:30-11:59",
            "userId": "demo-citizen-001",
            "documents": [],
            "id": "demo-appointment-158",
            "departmentId": "demo-dept-motor-traffic",
            "status": "confirmed",
            "serviceId": "demo-service-tax-registration",
            "updatedAt": "2025-07-23T08:14:38.685Z",
            "referenceNumber": "GE-2025-158",
            "createdAt": "2025-08-16T07:43:17.108Z",
            "notes": "Appointment for tax registration"
          }
        },
        {
          "id": "demo-appointment-159",
          "data": {
            "createdAt": "2025-06-18T18:31:24.014Z",
            "userId": "demo-citizen-001",
            "status": "cancelled",
            "referenceNumber": "GE-2025-159",
            "timeSlot": "09:00-10:02",
            "date": "2025-07-18T15:34:27.549Z",
            "id": "demo-appointment-159",
            "departmentId": "demo-dept-inland-revenue",
            "updatedAt": "2025-07-30T23:38:45.327Z",
            "notes": "Appointment for birth certificate",
            "documents": [],
            "serviceId": "demo-service-birth-certificate",
            "qrCode": "QR-CERTIFICATE-149-20250718"
          }
        },
        {
          "id": "demo-appointment-160",
          "data": {
            "documents": [],
            "referenceNumber": "GE-2025-160",
            "updatedAt": "2025-08-03T01:48:53.056Z",
            "serviceId": "demo-service-driving-license",
            "userId": "demo-citizen-001",
            "timeSlot": "09:30-10:34",
            "status": "cancelled",
            "createdAt": "2025-05-28T22:53:42.065Z",
            "notes": "Appointment for driving license",
            "date": "2025-08-05T02:48:58.398Z",
            "qrCode": "QR-LICENSE-150-20250805",
            "departmentId": "demo-dept-inland-revenue",
            "id": "demo-appointment-160"
          }
        },
        {
          "id": "demo-appointment-161",
          "data": {
            "documents": [],
            "timeSlot": "15:30-16:34",
            "referenceNumber": "GE-2025-161",
            "date": "2025-07-29T16:24:01.087Z",
            "id": "demo-appointment-161",
            "status": "completed",
            "userId": "demo-citizen-001",
            "updatedAt": "2025-07-19T03:54:01.256Z",
            "departmentId": "demo-dept-immigration",
            "createdAt": "2025-07-15T12:14:12.053Z",
            "notes": "Appointment for passport renewal",
            "serviceId": "demo-service-passport-renewal",
            "qrCode": "QR-RENEWAL-151-20250729"
          }
        },
        {
          "id": "demo-appointment-162",
          "data": {
            "referenceNumber": "GE-2025-162",
            "qrCode": "QR-CERTIFICATE-152-20250708",
            "date": "2025-07-08T16:46:50.221Z",
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2025-07-20T21:27:58.149Z",
            "serviceId": "demo-service-death-certificate",
            "userId": "demo-citizen-001",
            "timeSlot": "11:30-12:48",
            "notes": "Appointment for death certificate",
            "status": "completed",
            "id": "demo-appointment-162",
            "updatedAt": "2025-08-13T08:21:44.974Z",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-163",
          "data": {
            "timeSlot": "13:30-14:41",
            "date": "2025-07-01T11:29:10.524Z",
            "qrCode": "QR-APPLICATION-153-20250701",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-07-14T08:44:26.866Z",
            "notes": "Appointment for passport application",
            "status": "completed",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-passport-application",
            "id": "demo-appointment-163",
            "documents": [],
            "updatedAt": "2025-07-17T23:19:00.276Z",
            "referenceNumber": "GE-2025-163"
          }
        },
        {
          "id": "demo-appointment-164",
          "data": {
            "referenceNumber": "GE-2025-164",
            "documents": [],
            "qrCode": "QR-CERTIFICATE-154-20250801",
            "timeSlot": "14:00-14:55",
            "notes": "Appointment for death certificate",
            "date": "2025-08-01T01:24:33.085Z",
            "updatedAt": "2025-07-29T21:46:05.588Z",
            "id": "demo-appointment-164",
            "departmentId": "demo-dept-motor-traffic",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-death-certificate",
            "createdAt": "2025-07-23T10:41:28.841Z",
            "status": "no-show"
          }
        },
        {
          "id": "demo-appointment-165",
          "data": {
            "updatedAt": "2025-08-14T05:13:13.129Z",
            "departmentId": "demo-dept-registrar-general",
            "timeSlot": "15:30-16:41",
            "date": "2025-07-25T12:18:44.841Z",
            "userId": "demo-citizen-001",
            "notes": "Appointment for tax filing",
            "createdAt": "2025-07-20T11:09:25.826Z",
            "documents": [],
            "id": "demo-appointment-165",
            "status": "no-show",
            "qrCode": "QR-FILING-155-20250725",
            "serviceId": "demo-service-tax-filing",
            "referenceNumber": "GE-2025-165"
          }
        },
        {
          "id": "demo-appointment-166",
          "data": {
            "status": "cancelled",
            "referenceNumber": "GE-2025-166",
            "updatedAt": "2025-07-27T11:20:56.694Z",
            "serviceId": "demo-service-tax-filing",
            "timeSlot": "11:00-12:26",
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "Appointment for tax filing",
            "date": "2025-08-13T17:14:30.829Z",
            "id": "demo-appointment-166",
            "qrCode": "QR-FILING-156-20250813",
            "departmentId": "demo-dept-immigration",
            "createdAt": "2025-07-30T02:17:42.439Z"
          }
        },
        {
          "id": "demo-appointment-167",
          "data": {
            "id": "demo-appointment-167",
            "referenceNumber": "GE-2025-167",
            "date": "2025-07-05T08:43:19.149Z",
            "updatedAt": "2025-07-25T03:43:51.911Z",
            "notes": "Appointment for driving license",
            "departmentId": "demo-dept-motor-traffic",
            "timeSlot": "11:00-11:40",
            "qrCode": "QR-LICENSE-157-20250705",
            "documents": [],
            "serviceId": "demo-service-driving-license",
            "createdAt": "2025-07-29T15:41:50.673Z",
            "userId": "demo-citizen-001",
            "status": "completed"
          }
        },
        {
          "id": "demo-appointment-168",
          "data": {
            "id": "demo-appointment-168",
            "referenceNumber": "GE-2025-168",
            "qrCode": "QR-EXTENSION-158-20250801",
            "timeSlot": "08:00-09:23",
            "notes": "Appointment for visa extension",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-visa-extension",
            "updatedAt": "2025-08-12T05:19:20.997Z",
            "status": "cancelled",
            "date": "2025-08-01T07:17:04.293Z",
            "createdAt": "2025-06-07T09:54:37.772Z",
            "departmentId": "demo-dept-motor-traffic",
            "documents": []
          }
        },
        {
          "id": "demo-appointment-169",
          "data": {
            "documents": [],
            "referenceNumber": "GE-2025-169",
            "serviceId": "demo-service-tax-clearance",
            "departmentId": "demo-dept-registrar-general",
            "qrCode": "QR-CLEARANCE-159-20250731",
            "notes": "Appointment for tax clearance",
            "timeSlot": "13:00-14:18",
            "status": "no-show",
            "userId": "demo-citizen-001",
            "date": "2025-07-30T18:48:20.794Z",
            "updatedAt": "2025-08-08T03:25:23.945Z",
            "id": "demo-appointment-169",
            "createdAt": "2025-07-07T05:01:42.076Z"
          }
        },
        {
          "id": "demo-appointment-170",
          "data": {
            "referenceNumber": "GE-2025-170",
            "qrCode": "QR-REGISTRATION-160-20250831",
            "date": "2025-08-31T01:52:38.505Z",
            "serviceId": "demo-service-tax-registration",
            "timeSlot": "08:30-09:53",
            "updatedAt": "2025-08-12T20:43:20.874Z",
            "notes": "Appointment for tax registration",
            "userId": "demo-citizen-001",
            "status": "confirmed",
            "id": "demo-appointment-170",
            "createdAt": "2025-07-07T23:53:39.240Z",
            "documents": [],
            "departmentId": "demo-dept-immigration"
          }
        },
        {
          "id": "demo-appointment-171",
          "data": {
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "Appointment for tax clearance",
            "updatedAt": "2025-07-30T00:52:24.118Z",
            "status": "pending",
            "date": "2025-09-10T13:19:15.644Z",
            "referenceNumber": "GE-2025-171",
            "serviceId": "demo-service-tax-clearance",
            "departmentId": "demo-dept-registrar-general",
            "qrCode": "QR-CLEARANCE-161-20250910",
            "id": "demo-appointment-171",
            "timeSlot": "15:00-15:47",
            "createdAt": "2025-07-16T11:48:54.499Z"
          }
        },
        {
          "id": "demo-appointment-172",
          "data": {
            "qrCode": "QR-RENEWAL-162-20250802",
            "departmentId": "demo-dept-registrar-general",
            "status": "no-show",
            "referenceNumber": "GE-2025-172",
            "id": "demo-appointment-172",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-09T20:30:29.465Z",
            "documents": [],
            "notes": "Appointment for passport renewal",
            "timeSlot": "08:00-09:02",
            "updatedAt": "2025-07-24T20:31:23.827Z",
            "date": "2025-08-02T17:42:27.488Z",
            "serviceId": "demo-service-passport-renewal"
          }
        },
        {
          "id": "demo-appointment-173",
          "data": {
            "referenceNumber": "GE-2025-173",
            "updatedAt": "2025-07-30T12:20:56.663Z",
            "status": "cancelled",
            "timeSlot": "15:30-16:29",
            "id": "demo-appointment-173",
            "createdAt": "2025-06-19T07:47:38.511Z",
            "notes": "Appointment for tax filing",
            "qrCode": "QR-FILING-163-20250808",
            "documents": [],
            "serviceId": "demo-service-tax-filing",
            "date": "2025-08-07T21:12:59.740Z",
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-174",
          "data": {
            "referenceNumber": "GE-2025-174",
            "updatedAt": "2025-08-05T13:11:50.849Z",
            "id": "demo-appointment-174",
            "documents": [],
            "createdAt": "2025-07-23T04:49:10.926Z",
            "qrCode": "QR-LICENSE-164-20250724",
            "timeSlot": "08:00-08:48",
            "status": "completed",
            "notes": "Appointment for driving license",
            "serviceId": "demo-service-driving-license",
            "date": "2025-07-24T06:03:52.443Z",
            "departmentId": "demo-dept-registrar-general",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-175",
          "data": {
            "status": "completed",
            "id": "demo-appointment-175",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-175",
            "updatedAt": "2025-08-04T14:11:18.098Z",
            "notes": "Appointment for tax registration",
            "documents": [],
            "departmentId": "demo-dept-inland-revenue",
            "createdAt": "2025-06-30T11:53:37.360Z",
            "timeSlot": "14:00-14:42",
            "qrCode": "QR-REGISTRATION-165-20250709",
            "serviceId": "demo-service-tax-registration",
            "date": "2025-07-09T15:19:56.042Z"
          }
        },
        {
          "id": "demo-appointment-176",
          "data": {
            "status": "cancelled",
            "id": "demo-appointment-176",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-176",
            "updatedAt": "2025-08-15T14:07:05.377Z",
            "notes": "Appointment for visa extension",
            "documents": [],
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2025-06-20T22:13:06.671Z",
            "timeSlot": "14:00-14:51",
            "qrCode": "QR-EXTENSION-166-20250812",
            "serviceId": "demo-service-visa-extension",
            "date": "2025-08-12T17:05:47.122Z"
          }
        },
        {
          "id": "demo-appointment-177",
          "data": {
            "userId": "demo-citizen-001",
            "status": "no-show",
            "departmentId": "demo-dept-registrar-general",
            "serviceId": "demo-service-tax-filing",
            "notes": "Appointment for tax filing",
            "id": "demo-appointment-177",
            "documents": [],
            "qrCode": "QR-FILING-167-20250725",
            "createdAt": "2025-07-31T11:05:56.610Z",
            "date": "2025-07-25T11:35:20.549Z",
            "updatedAt": "2025-07-27T05:24:11.135Z",
            "referenceNumber": "GE-2025-177",
            "timeSlot": "16:00-17:01"
          }
        },
        {
          "id": "demo-appointment-178",
          "data": {
            "departmentId": "demo-dept-registrar-general",
            "date": "2025-09-13T01:37:25.824Z",
            "qrCode": "QR-EXTENSION-168-20250913",
            "timeSlot": "11:00-12:23",
            "status": "confirmed",
            "notes": "Appointment for visa extension",
            "createdAt": "2025-08-05T01:28:27.584Z",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-visa-extension",
            "documents": [],
            "referenceNumber": "GE-2025-178",
            "id": "demo-appointment-178",
            "updatedAt": "2025-08-02T02:39:02.435Z"
          }
        },
        {
          "id": "demo-appointment-179",
          "data": {
            "documents": [],
            "id": "demo-appointment-179",
            "departmentId": "demo-dept-immigration",
            "referenceNumber": "GE-2025-179",
            "updatedAt": "2025-08-12T03:18:51.329Z",
            "qrCode": "QR-REGISTRATION-169-20250815",
            "serviceId": "demo-service-tax-registration",
            "status": "cancelled",
            "date": "2025-08-14T22:21:30.486Z",
            "createdAt": "2025-08-15T14:27:57.980Z",
            "notes": "Appointment for tax registration",
            "userId": "demo-citizen-001",
            "timeSlot": "14:30-15:41"
          }
        },
        {
          "id": "demo-appointment-180",
          "data": {
            "serviceId": "demo-service-vehicle-registration",
            "documents": [],
            "id": "demo-appointment-180",
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for vehicle registration",
            "status": "confirmed",
            "updatedAt": "2025-07-26T21:48:05.312Z",
            "userId": "demo-citizen-001",
            "date": "2025-09-09T23:12:22.659Z",
            "referenceNumber": "GE-2025-180",
            "timeSlot": "09:00-10:06",
            "qrCode": "QR-REGISTRATION-170-20250910",
            "createdAt": "2025-05-29T14:13:41.789Z"
          }
        },
        {
          "id": "demo-appointment-181",
          "data": {
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "Appointment for visa extension",
            "updatedAt": "2025-08-11T16:51:39.366Z",
            "status": "no-show",
            "date": "2025-07-23T15:13:17.318Z",
            "serviceId": "demo-service-visa-extension",
            "referenceNumber": "GE-2025-181",
            "departmentId": "demo-dept-registrar-general",
            "qrCode": "QR-EXTENSION-171-20250723",
            "id": "demo-appointment-181",
            "timeSlot": "10:00-11:13",
            "createdAt": "2025-08-11T19:57:18.329Z"
          }
        },
        {
          "id": "demo-appointment-182",
          "data": {
            "departmentId": "demo-dept-inland-revenue",
            "createdAt": "2025-08-04T23:39:43.686Z",
            "qrCode": "QR-CERTIFICATE-172-20250821",
            "date": "2025-08-20T21:52:33.030Z",
            "id": "demo-appointment-182",
            "referenceNumber": "GE-2025-182",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-death-certificate",
            "timeSlot": "10:00-11:14",
            "notes": "Appointment for death certificate",
            "documents": [],
            "updatedAt": "2025-07-30T09:29:53.741Z",
            "status": "pending"
          }
        },
        {
          "id": "demo-appointment-183",
          "data": {
            "date": "2025-06-24T16:32:45.094Z",
            "timeSlot": "13:00-14:14",
            "documents": [],
            "notes": "Appointment for passport renewal",
            "id": "demo-appointment-183",
            "referenceNumber": "GE-2025-183",
            "departmentId": "demo-dept-immigration",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-passport-renewal",
            "updatedAt": "2025-08-15T13:49:03.177Z",
            "status": "completed",
            "qrCode": "QR-RENEWAL-173-20250624",
            "createdAt": "2025-08-15T05:16:29.286Z"
          }
        },
        {
          "id": "demo-appointment-184",
          "data": {
            "notes": "Appointment for marriage certificate",
            "id": "demo-appointment-184",
            "departmentId": "demo-dept-registrar-general",
            "qrCode": "QR-CERTIFICATE-174-20250719",
            "createdAt": "2025-08-08T07:06:32.262Z",
            "documents": [],
            "referenceNumber": "GE-2025-184",
            "timeSlot": "11:30-12:57",
            "updatedAt": "2025-07-30T14:30:32.714Z",
            "status": "cancelled",
            "date": "2025-07-19T14:10:39.995Z",
            "serviceId": "demo-service-marriage-certificate",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-185",
          "data": {
            "serviceId": "demo-service-birth-certificate",
            "departmentId": "demo-dept-motor-traffic",
            "updatedAt": "2025-08-11T19:35:10.116Z",
            "notes": "Appointment for birth certificate",
            "documents": [],
            "qrCode": "QR-CERTIFICATE-175-20250907",
            "referenceNumber": "GE-2025-185",
            "status": "pending",
            "timeSlot": "09:00-09:56",
            "createdAt": "2025-06-22T23:37:39.935Z",
            "id": "demo-appointment-185",
            "userId": "demo-citizen-001",
            "date": "2025-09-07T11:41:03.402Z"
          }
        },
        {
          "id": "demo-appointment-186",
          "data": {
            "createdAt": "2025-06-19T13:50:47.504Z",
            "id": "demo-appointment-186",
            "serviceId": "demo-service-marriage-certificate",
            "updatedAt": "2025-08-12T10:32:14.653Z",
            "documents": [],
            "status": "confirmed",
            "timeSlot": "10:30-11:04",
            "qrCode": "QR-CERTIFICATE-176-20250905",
            "notes": "Appointment for marriage certificate",
            "referenceNumber": "GE-2025-186",
            "date": "2025-09-05T18:23:13.010Z",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-motor-traffic"
          }
        },
        {
          "id": "demo-appointment-187",
          "data": {
            "id": "demo-appointment-187",
            "referenceNumber": "GE-2025-187",
            "date": "2025-09-04T05:53:28.541Z",
            "updatedAt": "2025-08-12T10:27:28.283Z",
            "notes": "Appointment for marriage certificate",
            "departmentId": "demo-dept-inland-revenue",
            "qrCode": "QR-CERTIFICATE-177-20250904",
            "timeSlot": "14:30-15:42",
            "serviceId": "demo-service-marriage-certificate",
            "documents": [],
            "createdAt": "2025-07-15T17:47:03.915Z",
            "userId": "demo-citizen-001",
            "status": "confirmed"
          }
        },
        {
          "id": "demo-appointment-188",
          "data": {
            "documents": [],
            "userId": "demo-citizen-001",
            "notes": "Appointment for visa extension",
            "updatedAt": "2025-07-29T00:46:21.579Z",
            "status": "cancelled",
            "date": "2025-07-28T17:08:42.895Z",
            "referenceNumber": "GE-2025-188",
            "serviceId": "demo-service-visa-extension",
            "departmentId": "demo-dept-immigration",
            "qrCode": "QR-EXTENSION-178-20250728",
            "id": "demo-appointment-188",
            "timeSlot": "16:00-16:30",
            "createdAt": "2025-05-20T19:45:52.272Z"
          }
        },
        {
          "id": "demo-appointment-189",
          "data": {
            "qrCode": "QR-FILING-179-20250715",
            "date": "2025-07-15T06:58:28.490Z",
            "notes": "Appointment for tax filing",
            "referenceNumber": "GE-2025-189",
            "updatedAt": "2025-08-01T11:30:58.412Z",
            "timeSlot": "15:00-16:02",
            "id": "demo-appointment-189",
            "serviceId": "demo-service-tax-filing",
            "createdAt": "2025-05-26T11:41:50.303Z",
            "documents": [],
            "departmentId": "demo-dept-inland-revenue",
            "status": "completed",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-190",
          "data": {
            "qrCode": "QR-LICENSE-180-20250710",
            "timeSlot": "15:00-16:16",
            "createdAt": "2025-06-29T19:39:58.095Z",
            "departmentId": "demo-dept-inland-revenue",
            "notes": "Appointment for driving license",
            "status": "completed",
            "updatedAt": "2025-08-13T18:32:43.559Z",
            "id": "demo-appointment-190",
            "date": "2025-07-09T22:51:32.839Z",
            "documents": [],
            "referenceNumber": "GE-2025-190",
            "userId": "demo-citizen-001",
            "serviceId": "demo-service-driving-license"
          }
        },
        {
          "id": "demo-appointment-191",
          "data": {
            "createdAt": "2025-07-07T14:38:42.980Z",
            "status": "confirmed",
            "updatedAt": "2025-07-27T11:54:19.295Z",
            "serviceId": "demo-service-license-renewal",
            "timeSlot": "08:30-09:42",
            "userId": "demo-citizen-001",
            "documents": [],
            "referenceNumber": "GE-2025-191",
            "departmentId": "demo-dept-immigration",
            "date": "2025-09-01T23:05:28.340Z",
            "qrCode": "QR-RENEWAL-181-20250902",
            "id": "demo-appointment-191",
            "notes": "Appointment for license renewal"
          }
        },
        {
          "id": "demo-appointment-192",
          "data": {
            "date": "2025-08-02T23:19:54.400Z",
            "userId": "demo-citizen-001",
            "notes": "Appointment for passport renewal",
            "createdAt": "2025-06-30T21:42:15.720Z",
            "documents": [],
            "id": "demo-appointment-192",
            "qrCode": "QR-RENEWAL-182-20250803",
            "departmentId": "demo-dept-motor-traffic",
            "timeSlot": "14:00-15:01",
            "updatedAt": "2025-08-09T21:14:30.748Z",
            "status": "cancelled",
            "referenceNumber": "GE-2025-192",
            "serviceId": "demo-service-passport-renewal"
          }
        },
        {
          "id": "demo-appointment-193",
          "data": {
            "date": "2025-09-05T21:31:34.049Z",
            "status": "confirmed",
            "notes": "Appointment for license renewal",
            "updatedAt": "2025-08-14T06:24:44.571Z",
            "documents": [],
            "serviceId": "demo-service-license-renewal",
            "referenceNumber": "GE-2025-193",
            "departmentId": "demo-dept-registrar-general",
            "createdAt": "2025-06-15T00:03:48.775Z",
            "qrCode": "QR-RENEWAL-183-20250906",
            "timeSlot": "11:30-12:08",
            "userId": "demo-citizen-001",
            "id": "demo-appointment-193"
          }
        },
        {
          "id": "demo-appointment-194",
          "data": {
            "departmentId": "demo-dept-motor-traffic",
            "notes": "Appointment for driving license",
            "qrCode": "QR-LICENSE-184-20250728",
            "updatedAt": "2025-08-09T22:58:11.092Z",
            "serviceId": "demo-service-driving-license",
            "createdAt": "2025-05-27T09:48:03.573Z",
            "id": "demo-appointment-194",
            "documents": [],
            "userId": "demo-citizen-001",
            "status": "no-show",
            "date": "2025-07-28T05:35:54.294Z",
            "timeSlot": "13:30-14:21",
            "referenceNumber": "GE-2025-194"
          }
        },
        {
          "id": "demo-appointment-195",
          "data": {
            "documents": [],
            "id": "demo-appointment-195",
            "date": "2025-07-29T22:42:53.316Z",
            "departmentId": "demo-dept-registrar-general",
            "serviceId": "demo-service-passport-application",
            "notes": "Appointment for passport application",
            "createdAt": "2025-08-02T13:53:11.850Z",
            "status": "cancelled",
            "updatedAt": "2025-07-28T18:14:30.944Z",
            "referenceNumber": "GE-2025-195",
            "qrCode": "QR-APPLICATION-185-20250730",
            "userId": "demo-citizen-001",
            "timeSlot": "09:30-10:43"
          }
        },
        {
          "id": "demo-appointment-196",
          "data": {
            "documents": [],
            "status": "completed",
            "userId": "demo-citizen-001",
            "createdAt": "2025-05-29T16:51:05.349Z",
            "qrCode": "QR-EXTENSION-186-20250703",
            "serviceId": "demo-service-visa-extension",
            "date": "2025-07-03T02:40:52.990Z",
            "notes": "Appointment for visa extension",
            "referenceNumber": "GE-2025-196",
            "timeSlot": "09:30-10:15",
            "id": "demo-appointment-196",
            "departmentId": "demo-dept-immigration",
            "updatedAt": "2025-08-10T19:22:33.294Z"
          }
        },
        {
          "id": "demo-appointment-197",
          "data": {
            "qrCode": "QR-EXTENSION-187-20250817",
            "documents": [],
            "notes": "Appointment for visa extension",
            "serviceId": "demo-service-visa-extension",
            "userId": "demo-citizen-001",
            "date": "2025-08-16T23:06:18.144Z",
            "updatedAt": "2025-07-22T06:43:24.004Z",
            "createdAt": "2025-08-15T07:50:05.396Z",
            "referenceNumber": "GE-2025-197",
            "departmentId": "demo-dept-registrar-general",
            "id": "demo-appointment-197",
            "status": "pending",
            "timeSlot": "15:30-16:37"
          }
        },
        {
          "id": "demo-appointment-198",
          "data": {
            "id": "demo-appointment-198",
            "updatedAt": "2025-08-02T04:29:19.707Z",
            "createdAt": "2025-06-06T16:50:24.496Z",
            "userId": "demo-citizen-001",
            "notes": "Appointment for passport application",
            "referenceNumber": "GE-2025-198",
            "timeSlot": "16:00-17:08",
            "status": "confirmed",
            "qrCode": "QR-APPLICATION-188-20250818",
            "departmentId": "demo-dept-immigration",
            "documents": [],
            "serviceId": "demo-service-passport-application",
            "date": "2025-08-17T23:58:43.751Z"
          }
        },
        {
          "id": "demo-appointment-199",
          "data": {
            "documents": [],
            "date": "2025-08-19T23:54:43.465Z",
            "status": "pending",
            "qrCode": "QR-CERTIFICATE-189-20250820",
            "createdAt": "2025-08-13T03:34:08.663Z",
            "userId": "demo-citizen-001",
            "notes": "Appointment for birth certificate",
            "serviceId": "demo-service-birth-certificate",
            "updatedAt": "2025-07-24T04:50:04.176Z",
            "timeSlot": "14:30-15:59",
            "id": "demo-appointment-199",
            "referenceNumber": "GE-2025-199",
            "departmentId": "demo-dept-motor-traffic"
          }
        },
        {
          "id": "demo-appointment-200",
          "data": {
            "userId": "demo-citizen-001",
            "qrCode": "QR-APPLICATION-190-20250810",
            "notes": "Appointment for passport application",
            "referenceNumber": "GE-2025-200",
            "status": "no-show",
            "updatedAt": "2025-07-31T13:23:56.601Z",
            "timeSlot": "11:00-11:32",
            "id": "demo-appointment-200",
            "date": "2025-08-09T19:37:08.315Z",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-08-15T04:15:19.544Z",
            "documents": [],
            "serviceId": "demo-service-passport-application"
          }
        },
        {
          "id": "demo-appointment-201",
          "data": {
            "qrCode": "QR-REGISTRATION-191-20250817",
            "updatedAt": "2025-08-09T10:49:36.346Z",
            "status": "pending",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-registrar-general",
            "referenceNumber": "GE-2025-201",
            "timeSlot": "08:00-09:10",
            "createdAt": "2025-08-14T00:23:33.024Z",
            "serviceId": "demo-service-tax-registration",
            "documents": [],
            "id": "demo-appointment-201",
            "notes": "Appointment for tax registration",
            "date": "2025-08-16T18:54:45.463Z"
          }
        },
        {
          "id": "demo-appointment-202",
          "data": {
            "serviceId": "demo-service-license-renewal",
            "timeSlot": "11:30-12:15",
            "createdAt": "2025-07-15T06:24:53.270Z",
            "userId": "demo-citizen-001",
            "referenceNumber": "GE-2025-202",
            "qrCode": "QR-RENEWAL-192-20250806",
            "notes": "Appointment for license renewal",
            "updatedAt": "2025-07-18T11:16:59.912Z",
            "id": "demo-appointment-202",
            "status": "no-show",
            "date": "2025-08-05T20:09:07.021Z",
            "documents": [],
            "departmentId": "demo-dept-registrar-general"
          }
        },
        {
          "id": "demo-appointment-203",
          "data": {
            "qrCode": "QR-RENEWAL-193-20250913",
            "serviceId": "demo-service-passport-renewal",
            "date": "2025-09-13T11:52:16.850Z",
            "updatedAt": "2025-07-17T20:56:05.328Z",
            "referenceNumber": "GE-2025-203",
            "documents": [],
            "timeSlot": "09:00-10:13",
            "id": "demo-appointment-203",
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for passport renewal",
            "status": "pending",
            "createdAt": "2025-06-20T22:08:03.347Z",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-204",
          "data": {
            "createdAt": "2025-05-28T08:22:59.127Z",
            "referenceNumber": "GE-2025-204",
            "notes": "Appointment for tax clearance",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-inland-revenue",
            "documents": [],
            "timeSlot": "11:00-12:14",
            "updatedAt": "2025-07-27T18:22:16.817Z",
            "date": "2025-09-14T20:45:36.431Z",
            "qrCode": "QR-CLEARANCE-194-20250915",
            "id": "demo-appointment-204",
            "status": "confirmed",
            "serviceId": "demo-service-tax-clearance"
          }
        },
        {
          "id": "demo-appointment-205",
          "data": {
            "date": "2025-08-23T11:56:43.281Z",
            "timeSlot": "09:30-10:22",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-06-24T18:41:18.489Z",
            "documents": [],
            "id": "demo-appointment-205",
            "serviceId": "demo-service-vehicle-registration",
            "userId": "demo-citizen-001",
            "notes": "Appointment for vehicle registration",
            "status": "pending",
            "updatedAt": "2025-07-30T21:15:22.449Z",
            "referenceNumber": "GE-2025-205",
            "qrCode": "QR-REGISTRATION-195-20250823"
          }
        },
        {
          "id": "demo-appointment-206",
          "data": {
            "serviceId": "demo-service-tax-filing",
            "status": "no-show",
            "createdAt": "2025-07-24T23:41:07.041Z",
            "updatedAt": "2025-07-22T17:16:16.091Z",
            "referenceNumber": "GE-2025-206",
            "documents": [],
            "notes": "Appointment for tax filing",
            "date": "2025-07-24T06:59:33.001Z",
            "timeSlot": "10:30-11:59",
            "qrCode": "QR-FILING-196-20250724",
            "id": "demo-appointment-206",
            "departmentId": "demo-dept-inland-revenue",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-appointment-207",
          "data": {
            "date": "2025-08-17T09:27:45.277Z",
            "timeSlot": "15:30-16:13",
            "departmentId": "demo-dept-motor-traffic",
            "createdAt": "2025-08-07T20:28:10.908Z",
            "documents": [],
            "id": "demo-appointment-207",
            "serviceId": "demo-service-birth-certificate",
            "notes": "Appointment for birth certificate",
            "userId": "demo-citizen-001",
            "status": "pending",
            "updatedAt": "2025-08-15T18:00:40.600Z",
            "referenceNumber": "GE-2025-207",
            "qrCode": "QR-CERTIFICATE-197-20250817"
          }
        },
        {
          "id": "demo-appointment-208",
          "data": {
            "referenceNumber": "GE-2025-208",
            "status": "cancelled",
            "id": "demo-appointment-208",
            "updatedAt": "2025-08-13T01:48:55.918Z",
            "documents": [],
            "createdAt": "2025-08-12T06:02:55.639Z",
            "date": "2025-07-28T17:52:58.398Z",
            "notes": "Appointment for birth certificate",
            "timeSlot": "08:00-09:04",
            "userId": "demo-citizen-001",
            "departmentId": "demo-dept-immigration",
            "serviceId": "demo-service-birth-certificate",
            "qrCode": "QR-CERTIFICATE-198-20250728"
          }
        },
        {
          "id": "demo-appointment-209",
          "data": {
            "id": "demo-appointment-209",
            "notes": "Appointment for passport renewal",
            "updatedAt": "2025-08-07T16:53:48.240Z",
            "documents": [],
            "referenceNumber": "GE-2025-209",
            "userId": "demo-citizen-001",
            "qrCode": "QR-RENEWAL-199-20250901",
            "createdAt": "2025-08-09T16:50:28.927Z",
            "date": "2025-09-01T01:29:23.346Z",
            "status": "confirmed",
            "serviceId": "demo-service-passport-renewal",
            "departmentId": "demo-dept-motor-traffic",
            "timeSlot": "08:30-09:52"
          }
        },
        {
          "id": "demo-appointment-210",
          "data": {
            "date": "2025-08-10T05:55:16.732Z",
            "timeSlot": "13:30-14:00",
            "serviceId": "demo-service-vehicle-registration",
            "departmentId": "demo-dept-registrar-general",
            "notes": "Appointment for vehicle registration",
            "status": "cancelled",
            "referenceNumber": "GE-2025-210",
            "updatedAt": "2025-07-26T17:59:32.309Z",
            "qrCode": "QR-REGISTRATION-200-20250810",
            "userId": "demo-citizen-001",
            "id": "demo-appointment-210",
            "documents": [],
            "createdAt": "2025-07-20T16:13:02.384Z"
          }
        }
      ]
    },
    "notifications": {
      "count": 59,
      "documents": [
        {
          "id": "citizen-notif-001",
          "data": {
            "createdAt": "2025-01-20T15:30:00.000Z",
            "title": "Vehicle Registration Confirmed",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "type": "appointment_confirmation",
            "id": "citizen-notif-001",
            "read": false,
            "message": "Your vehicle registration appointment has been confirmed for February 18, 2025 at 11:00 AM. Please bring all required documents."
          }
        },
        {
          "id": "citizen-notif-002",
          "data": {
            "read": false,
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "type": "appointment_confirmation",
            "title": "Tax Registration Confirmed",
            "createdAt": "2025-01-22T16:00:00.000Z",
            "id": "citizen-notif-002",
            "message": "Your business tax registration appointment has been confirmed for February 25, 2025 at 3:00 PM."
          }
        },
        {
          "id": "citizen-notif-003",
          "data": {
            "title": "Upcoming Appointment Reminder",
            "message": "Reminder: You have a vehicle registration appointment tomorrow at 11:00 AM. Reference: GE-2025-VR-004",
            "createdAt": "2025-02-17T09:00:00.000Z",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "id": "citizen-notif-003",
            "read": false,
            "type": "reminder"
          }
        },
        {
          "id": "citizen-notif-004",
          "data": {
            "createdAt": "2025-01-26T10:00:00.000Z",
            "title": "Marriage Certificate Under Review",
            "read": true,
            "type": "status_update",
            "id": "citizen-notif-004",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "message": "Your marriage certificate application (GE-2025-MC-006) is currently under review. We will notify you once approved."
          }
        },
        {
          "id": "citizen-notif-005",
          "data": {
            "message": "Great news! Your passport application has been completed successfully. You can collect it from the office.",
            "createdAt": "2024-12-20T11:30:00.000Z",
            "read": true,
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "title": "Passport Application Completed",
            "type": "status_update",
            "id": "citizen-notif-005"
          }
        },
        {
          "id": "citizen-notif-006",
          "data": {
            "title": "Document Verification Required",
            "createdAt": "2025-01-29T14:00:00.000Z",
            "type": "document_review",
            "message": "Please verify your submitted documents for passport renewal application. Log in to check details.",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "id": "citizen-notif-006",
            "read": false
          }
        },
        {
          "id": "citizen-notif-007",
          "data": {
            "read": true,
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "type": "appointment_confirmation",
            "createdAt": "2024-12-05T15:00:00.000Z",
            "id": "citizen-notif-007",
            "title": "Birth Certificate Completed",
            "message": "Your birth certificate has been processed and is ready for collection. Thank you for using GovEase!"
          }
        },
        {
          "id": "citizen-notif-008",
          "data": {
            "title": "Driving License Collection",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "read": true,
            "message": "Your driving license is ready for collection. Please visit the DMT office with your receipt.",
            "createdAt": "2024-11-16T10:00:00.000Z",
            "id": "citizen-notif-008",
            "type": "reminder"
          }
        },
        {
          "id": "demo-notif-001",
          "data": {
            "read": false,
            "type": "appointment_confirmation",
            "createdAt": "2025-01-15T14:00:00.000Z",
            "title": "Appointment Confirmed",
            "userId": "demo-citizen-001",
            "message": "Your driving license appointment has been confirmed for Jan 20, 2025 at 10:00 AM.",
            "id": "demo-notif-001"
          }
        },
        {
          "id": "demo-notif-002",
          "data": {
            "message": "Your vehicle registration appointment was completed successfully.",
            "userId": "demo-citizen-002",
            "read": true,
            "title": "Appointment Complete",
            "id": "demo-notif-002",
            "type": "reminder",
            "createdAt": "2025-01-18T10:00:00.000Z"
          }
        },
        {
          "id": "demo-notif-008",
          "data": {
            "read": true,
            "createdAt": "2025-06-02T15:41:15.332Z",
            "userId": "demo-citizen-030",
            "title": "Status Update",
            "id": "demo-notif-008",
            "type": "status_update",
            "message": "Your appointment status has been updated to confirmed."
          }
        },
        {
          "id": "demo-notif-009",
          "data": {
            "type": "appointment_confirmation",
            "userId": "demo-citizen-001",
            "message": "Your appointment has been confirmed for 9/10/2025.",
            "title": "Appointment Confirmed",
            "id": "demo-notif-009",
            "createdAt": "2025-07-22T22:27:43.182Z",
            "read": true
          }
        },
        {
          "id": "demo-notif-010",
          "data": {
            "id": "demo-notif-010",
            "type": "appointment_confirmation",
            "title": "Appointment Confirmed",
            "userId": "demo-citizen-001",
            "message": "Your appointment has been confirmed for 7/30/2025.",
            "read": true,
            "createdAt": "2025-06-17T10:47:56.643Z"
          }
        },
        {
          "id": "demo-notif-011",
          "data": {
            "message": "Your appointment has been confirmed for 8/28/2025.",
            "title": "Appointment Confirmed",
            "id": "demo-notif-011",
            "userId": "demo-citizen-050",
            "type": "appointment_confirmation",
            "createdAt": "2025-06-09T22:30:09.123Z",
            "read": false
          }
        },
        {
          "id": "demo-notif-012",
          "data": {
            "title": "Appointment Reminder",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 15:30.",
            "userId": "demo-citizen-001",
            "read": true,
            "id": "demo-notif-012",
            "type": "reminder",
            "createdAt": "2025-05-20T11:44:53.747Z"
          }
        },
        {
          "id": "demo-notif-013",
          "data": {
            "read": true,
            "message": "Please review and update your submitted documents.",
            "id": "demo-notif-013",
            "createdAt": "2025-08-12T23:00:49.259Z",
            "type": "document_review",
            "userId": "demo-citizen-001",
            "title": "Document Review"
          }
        },
        {
          "id": "demo-notif-014",
          "data": {
            "message": "Your appointment status has been updated to no-show.",
            "title": "Status Update",
            "createdAt": "2025-06-28T00:37:10.503Z",
            "type": "status_update",
            "id": "demo-notif-014",
            "userId": "demo-citizen-001",
            "read": true
          }
        },
        {
          "id": "demo-notif-015",
          "data": {
            "id": "demo-notif-015",
            "type": "document_review",
            "title": "Document Review",
            "createdAt": "2025-07-28T18:39:23.064Z",
            "read": true,
            "message": "Please review and update your submitted documents.",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-016",
          "data": {
            "userId": "demo-citizen-001",
            "id": "demo-notif-016",
            "title": "Document Review",
            "read": true,
            "message": "Please review and update your submitted documents.",
            "createdAt": "2025-08-12T05:37:01.006Z",
            "type": "document_review"
          }
        },
        {
          "id": "demo-notif-017",
          "data": {
            "type": "document_review",
            "message": "Please review and update your submitted documents.",
            "createdAt": "2025-06-20T06:35:39.539Z",
            "read": true,
            "id": "demo-notif-017",
            "title": "Document Review",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-018",
          "data": {
            "type": "reminder",
            "title": "Appointment Reminder",
            "userId": "demo-citizen-001",
            "read": true,
            "message": "Reminder: Your appointment is scheduled for tomorrow at 10:00.",
            "createdAt": "2025-07-29T21:55:33.731Z",
            "id": "demo-notif-018"
          }
        },
        {
          "id": "demo-notif-019",
          "data": {
            "type": "document_review",
            "userId": "demo-citizen-001",
            "title": "Document Review",
            "message": "Please review and update your submitted documents.",
            "createdAt": "2025-06-02T15:55:39.621Z",
            "read": false,
            "id": "demo-notif-019"
          }
        },
        {
          "id": "demo-notif-020",
          "data": {
            "read": false,
            "title": "Appointment Confirmed",
            "id": "demo-notif-020",
            "message": "Your appointment has been confirmed for 8/21/2025.",
            "createdAt": "2025-06-21T05:05:07.936Z",
            "userId": "demo-citizen-029",
            "type": "appointment_confirmation"
          }
        },
        {
          "id": "demo-notif-021",
          "data": {
            "type": "reminder",
            "id": "demo-notif-021",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 15:00.",
            "read": false,
            "createdAt": "2025-08-02T19:34:36.868Z",
            "title": "Appointment Reminder",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-022",
          "data": {
            "message": "Your appointment status has been updated to completed.",
            "title": "Status Update",
            "createdAt": "2025-07-04T17:45:59.805Z",
            "type": "status_update",
            "id": "demo-notif-022",
            "userId": "demo-citizen-015",
            "read": true
          }
        },
        {
          "id": "demo-notif-023",
          "data": {
            "title": "Status Update",
            "read": true,
            "createdAt": "2025-05-20T01:26:16.281Z",
            "message": "Your appointment status has been updated to cancelled.",
            "id": "demo-notif-023",
            "userId": "demo-citizen-001",
            "type": "status_update"
          }
        },
        {
          "id": "demo-notif-024",
          "data": {
            "title": "Document Review",
            "message": "Please review and update your submitted documents.",
            "read": true,
            "id": "demo-notif-024",
            "type": "document_review",
            "createdAt": "2025-07-20T03:39:49.066Z",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-025",
          "data": {
            "message": "Reminder: Your appointment is scheduled for tomorrow at 10:30.",
            "userId": "demo-citizen-037",
            "createdAt": "2025-06-05T11:15:45.696Z",
            "read": false,
            "id": "demo-notif-025",
            "title": "Appointment Reminder",
            "type": "reminder"
          }
        },
        {
          "id": "demo-notif-026",
          "data": {
            "id": "demo-notif-026",
            "userId": "demo-citizen-001",
            "message": "Your appointment has been confirmed for 8/13/2025.",
            "read": false,
            "type": "appointment_confirmation",
            "createdAt": "2025-08-06T12:10:42.983Z",
            "title": "Appointment Confirmed"
          }
        },
        {
          "id": "demo-notif-027",
          "data": {
            "id": "demo-notif-027",
            "title": "Document Review",
            "type": "document_review",
            "createdAt": "2025-07-06T22:32:20.143Z",
            "message": "Please review and update your submitted documents.",
            "read": true,
            "userId": "demo-citizen-046"
          }
        },
        {
          "id": "demo-notif-028",
          "data": {
            "type": "reminder",
            "id": "demo-notif-028",
            "read": true,
            "userId": "demo-citizen-023",
            "title": "Appointment Reminder",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 11:00.",
            "createdAt": "2025-08-07T07:44:03.236Z"
          }
        },
        {
          "id": "demo-notif-029",
          "data": {
            "type": "status_update",
            "title": "Status Update",
            "id": "demo-notif-029",
            "message": "Your appointment status has been updated to cancelled.",
            "createdAt": "2025-07-31T23:40:06.211Z",
            "userId": "demo-citizen-001",
            "read": false
          }
        },
        {
          "id": "demo-notif-030",
          "data": {
            "createdAt": "2025-06-29T19:03:45.141Z",
            "title": "Appointment Reminder",
            "type": "reminder",
            "id": "demo-notif-030",
            "read": true,
            "message": "Reminder: Your appointment is scheduled for tomorrow at 09:00.",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-031",
          "data": {
            "createdAt": "2025-08-13T04:49:37.625Z",
            "read": false,
            "message": "Please review and update your submitted documents.",
            "userId": "demo-citizen-001",
            "title": "Document Review",
            "id": "demo-notif-031",
            "type": "document_review"
          }
        },
        {
          "id": "demo-notif-032",
          "data": {
            "id": "demo-notif-032",
            "message": "Your appointment has been confirmed for 7/26/2025.",
            "type": "appointment_confirmation",
            "userId": "demo-citizen-001",
            "read": false,
            "createdAt": "2025-06-29T23:42:09.737Z",
            "title": "Appointment Confirmed"
          }
        },
        {
          "id": "demo-notif-033",
          "data": {
            "userId": "demo-citizen-001",
            "type": "reminder",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 10:30.",
            "title": "Appointment Reminder",
            "id": "demo-notif-033",
            "read": true,
            "createdAt": "2025-08-06T21:13:05.903Z"
          }
        },
        {
          "id": "demo-notif-034",
          "data": {
            "userId": "demo-citizen-001",
            "title": "Appointment Confirmed",
            "createdAt": "2025-06-05T22:46:35.365Z",
            "read": true,
            "id": "demo-notif-034",
            "message": "Your appointment has been confirmed for 8/2/2025.",
            "type": "appointment_confirmation"
          }
        },
        {
          "id": "demo-notif-035",
          "data": {
            "read": true,
            "message": "Reminder: Your appointment is scheduled for tomorrow at 14:30.",
            "title": "Appointment Reminder",
            "createdAt": "2025-07-07T19:21:16.090Z",
            "userId": "demo-citizen-001",
            "type": "reminder",
            "id": "demo-notif-035"
          }
        },
        {
          "id": "demo-notif-036",
          "data": {
            "title": "Status Update",
            "read": false,
            "id": "demo-notif-036",
            "createdAt": "2025-06-17T13:38:41.175Z",
            "type": "status_update",
            "userId": "demo-citizen-001",
            "message": "Your appointment status has been updated to confirmed."
          }
        },
        {
          "id": "demo-notif-037",
          "data": {
            "createdAt": "2025-08-14T17:25:10.556Z",
            "read": true,
            "message": "Your appointment has been confirmed for 7/14/2025.",
            "type": "appointment_confirmation",
            "userId": "demo-citizen-001",
            "id": "demo-notif-037",
            "title": "Appointment Confirmed"
          }
        },
        {
          "id": "demo-notif-038",
          "data": {
            "id": "demo-notif-038",
            "userId": "demo-citizen-001",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 11:30.",
            "type": "reminder",
            "read": false,
            "title": "Appointment Reminder",
            "createdAt": "2025-06-02T13:03:48.350Z"
          }
        },
        {
          "id": "demo-notif-039",
          "data": {
            "message": "Please review and update your submitted documents.",
            "read": true,
            "type": "document_review",
            "userId": "demo-citizen-001",
            "id": "demo-notif-039",
            "createdAt": "2025-07-24T18:24:53.151Z",
            "title": "Document Review"
          }
        },
        {
          "id": "demo-notif-040",
          "data": {
            "userId": "demo-citizen-001",
            "type": "document_review",
            "title": "Document Review",
            "createdAt": "2025-08-03T12:27:35.097Z",
            "id": "demo-notif-040",
            "read": false,
            "message": "Please review and update your submitted documents."
          }
        },
        {
          "id": "demo-notif-041",
          "data": {
            "type": "document_review",
            "createdAt": "2025-07-22T14:05:52.523Z",
            "message": "Please review and update your submitted documents.",
            "read": true,
            "title": "Document Review",
            "userId": "demo-citizen-001",
            "id": "demo-notif-041"
          }
        },
        {
          "id": "demo-notif-042",
          "data": {
            "read": true,
            "message": "Your appointment has been confirmed for 7/29/2025.",
            "type": "appointment_confirmation",
            "id": "demo-notif-042",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-20T17:10:27.520Z",
            "title": "Appointment Confirmed"
          }
        },
        {
          "id": "demo-notif-043",
          "data": {
            "title": "Status Update",
            "read": false,
            "userId": "demo-citizen-035",
            "type": "status_update",
            "createdAt": "2025-07-24T23:38:15.484Z",
            "id": "demo-notif-043",
            "message": "Your appointment status has been updated to cancelled."
          }
        },
        {
          "id": "demo-notif-044",
          "data": {
            "id": "demo-notif-044",
            "read": true,
            "createdAt": "2025-06-23T13:16:23.956Z",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 14:00.",
            "userId": "demo-citizen-048",
            "title": "Appointment Reminder",
            "type": "reminder"
          }
        },
        {
          "id": "demo-notif-045",
          "data": {
            "type": "status_update",
            "read": true,
            "message": "Your appointment status has been updated to pending.",
            "id": "demo-notif-045",
            "userId": "demo-citizen-001",
            "title": "Status Update",
            "createdAt": "2025-05-21T22:59:45.207Z"
          }
        },
        {
          "id": "demo-notif-046",
          "data": {
            "title": "Appointment Reminder",
            "userId": "demo-citizen-001",
            "id": "demo-notif-046",
            "read": false,
            "createdAt": "2025-05-25T12:12:40.931Z",
            "type": "reminder",
            "message": "Reminder: Your appointment is scheduled for tomorrow at 10:00."
          }
        },
        {
          "id": "demo-notif-047",
          "data": {
            "message": "Your appointment status has been updated to completed.",
            "title": "Status Update",
            "type": "status_update",
            "createdAt": "2025-07-19T19:34:27.919Z",
            "id": "demo-notif-047",
            "userId": "demo-citizen-001",
            "read": false
          }
        },
        {
          "id": "demo-notif-048",
          "data": {
            "id": "demo-notif-048",
            "title": "Status Update",
            "type": "status_update",
            "createdAt": "2025-06-21T17:28:08.014Z",
            "read": true,
            "message": "Your appointment status has been updated to confirmed.",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-049",
          "data": {
            "read": true,
            "id": "demo-notif-049",
            "userId": "demo-citizen-001",
            "type": "document_review",
            "message": "Please review and update your submitted documents.",
            "createdAt": "2025-05-29T22:41:39.334Z",
            "title": "Document Review"
          }
        },
        {
          "id": "demo-notif-050",
          "data": {
            "message": "Reminder: Your appointment is scheduled for tomorrow at 13:30.",
            "title": "Appointment Reminder",
            "userId": "demo-citizen-001",
            "read": true,
            "type": "reminder",
            "createdAt": "2025-08-09T08:52:59.318Z",
            "id": "demo-notif-050"
          }
        },
        {
          "id": "demo-notif-051",
          "data": {
            "read": true,
            "message": "Reminder: Your appointment is scheduled for tomorrow at 11:00.",
            "type": "reminder",
            "userId": "demo-citizen-001",
            "id": "demo-notif-051",
            "title": "Appointment Reminder",
            "createdAt": "2025-06-02T13:24:33.892Z"
          }
        },
        {
          "id": "demo-notif-052",
          "data": {
            "createdAt": "2025-05-21T22:52:49.857Z",
            "type": "document_review",
            "title": "Document Review",
            "message": "Please review and update your submitted documents.",
            "read": true,
            "userId": "demo-citizen-001",
            "id": "demo-notif-052"
          }
        },
        {
          "id": "demo-notif-053",
          "data": {
            "message": "Reminder: Your appointment is scheduled for tomorrow at 14:00.",
            "type": "reminder",
            "title": "Appointment Reminder",
            "read": true,
            "createdAt": "2025-06-04T02:43:31.139Z",
            "id": "demo-notif-053",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-notif-054",
          "data": {
            "type": "status_update",
            "title": "Status Update",
            "userId": "demo-citizen-001",
            "createdAt": "2025-05-26T10:39:55.829Z",
            "id": "demo-notif-054",
            "message": "Your appointment status has been updated to pending.",
            "read": true
          }
        },
        {
          "id": "demo-notif-055",
          "data": {
            "type": "document_review",
            "userId": "demo-citizen-001",
            "id": "demo-notif-055",
            "createdAt": "2025-06-13T13:36:51.992Z",
            "message": "Please review and update your submitted documents.",
            "title": "Document Review",
            "read": true
          }
        },
        {
          "id": "demo-notif-056",
          "data": {
            "title": "Document Review",
            "createdAt": "2025-05-26T03:34:24.457Z",
            "message": "Please review and update your submitted documents.",
            "read": false,
            "type": "document_review",
            "id": "demo-notif-056",
            "userId": "demo-citizen-014"
          }
        }
      ]
    },
    "feedback": {
      "count": 106,
      "documents": [
        {
          "id": "IqXl23vHkXtyaBMWCO79",
          "data": {
            "appointmentId": "citizen-apt-003",
            "status": "active",
            "serviceName": "Passport Application",
            "suggestions": "rge",
            "departmentName": "Department of Immigration & Emigration",
            "wouldRecommend": true,
            "rating": 5,
            "experience": "gre",
            "createdAt": "2025-08-16T18:10:02.480Z",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2"
          }
        },
        {
          "id": "citizen-feedback-001",
          "data": {
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "appointmentId": "citizen-apt-001",
            "createdAt": "2024-11-15T12:00:00.000Z",
            "id": "citizen-feedback-001",
            "rating": 5,
            "comment": "Excellent service! The driving license process was smooth and the staff was very helpful. Highly recommend the digital booking system."
          }
        },
        {
          "id": "citizen-feedback-002",
          "data": {
            "createdAt": "2024-12-05T15:30:00.000Z",
            "id": "citizen-feedback-002",
            "rating": 4,
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "comment": "Good experience getting my birth certificate. Quick process but had to wait a bit longer than expected.",
            "appointmentId": "citizen-apt-002"
          }
        },
        {
          "id": "citizen-feedback-003",
          "data": {
            "comment": "Outstanding passport service! Very professional staff and the online appointment system made everything so convenient.",
            "rating": 5,
            "appointmentId": "citizen-apt-003",
            "createdAt": "2024-12-20T16:00:00.000Z",
            "id": "citizen-feedback-003",
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2"
          }
        },
        {
          "id": "demo-feedback-001",
          "data": {
            "createdAt": "2025-01-18T11:00:00.000Z",
            "appointmentId": "demo-appointment-002",
            "userId": "demo-citizen-002",
            "rating": 5,
            "id": "demo-feedback-001",
            "comment": "Excellent service! The process was smooth and efficient."
          }
        },
        {
          "id": "demo-feedback-002",
          "data": {
            "id": "demo-feedback-002",
            "createdAt": "2025-01-20T12:00:00.000Z",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-001",
            "rating": 4,
            "comment": "Good service, but had to wait a bit longer than expected."
          }
        },
        {
          "id": "demo-feedback-003",
          "data": {
            "appointmentId": "demo-appointment-100",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-003",
            "createdAt": "2025-08-12T15:57:29.272Z",
            "comment": "Good experience overall, staff was helpful.",
            "rating": 4
          }
        },
        {
          "id": "demo-feedback-004",
          "data": {
            "comment": "Average service, met expectations.",
            "rating": 1,
            "appointmentId": "demo-appointment-090",
            "id": "demo-feedback-004",
            "createdAt": "2025-07-08T08:15:59.877Z",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-005",
          "data": {
            "appointmentId": "demo-appointment-156",
            "id": "demo-feedback-005",
            "comment": "Process was smooth and well organized.",
            "rating": 3,
            "createdAt": "2025-08-06T13:12:37.178Z",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-006",
          "data": {
            "userId": "demo-citizen-001",
            "rating": 3,
            "appointmentId": "demo-appointment-196",
            "comment": "Impressed with the digital system and ease of use.",
            "createdAt": "2025-07-30T10:32:01.338Z",
            "id": "demo-feedback-006"
          }
        },
        {
          "id": "demo-feedback-007",
          "data": {
            "userId": "demo-citizen-001",
            "id": "demo-feedback-007",
            "comment": "Impressed with the digital system and ease of use.",
            "rating": 2,
            "createdAt": "2025-08-07T05:47:48.230Z",
            "appointmentId": "demo-appointment-079"
          }
        },
        {
          "id": "demo-feedback-008",
          "data": {
            "userId": "demo-citizen-047",
            "appointmentId": "demo-appointment-052",
            "comment": "Quick and hassle-free experience.",
            "createdAt": "2025-08-09T22:44:24.002Z",
            "id": "demo-feedback-008",
            "rating": 4
          }
        },
        {
          "id": "demo-feedback-009",
          "data": {
            "id": "demo-feedback-009",
            "createdAt": "2025-08-11T21:49:30.234Z",
            "appointmentId": "demo-appointment-099",
            "rating": 3,
            "userId": "demo-citizen-001",
            "comment": "Quick and hassle-free experience."
          }
        },
        {
          "id": "demo-feedback-010",
          "data": {
            "comment": "Process was smooth and well organized.",
            "appointmentId": "demo-appointment-189",
            "rating": 2,
            "id": "demo-feedback-010",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-14T16:18:11.662Z"
          }
        },
        {
          "id": "demo-feedback-011",
          "data": {
            "appointmentId": "demo-appointment-128",
            "rating": 1,
            "userId": "demo-citizen-001",
            "createdAt": "2025-08-16T07:01:27.473Z",
            "comment": "Could be improved but generally satisfied.",
            "id": "demo-feedback-011"
          }
        },
        {
          "id": "demo-feedback-012",
          "data": {
            "rating": 1,
            "createdAt": "2025-08-02T08:18:23.137Z",
            "userId": "demo-citizen-001",
            "comment": "Quick and hassle-free experience.",
            "id": "demo-feedback-012",
            "appointmentId": "demo-appointment-161"
          }
        },
        {
          "id": "demo-feedback-013",
          "data": {
            "appointmentId": "demo-appointment-122",
            "createdAt": "2025-08-15T21:47:53.878Z",
            "comment": "Outstanding service quality and quick processing.",
            "rating": 1,
            "userId": "demo-citizen-001",
            "id": "demo-feedback-013"
          }
        },
        {
          "id": "demo-feedback-014",
          "data": {
            "userId": "demo-citizen-001",
            "comment": "Process was smooth and well organized.",
            "createdAt": "2025-08-08T03:57:36.261Z",
            "rating": 1,
            "appointmentId": "demo-appointment-123",
            "id": "demo-feedback-014"
          }
        },
        {
          "id": "demo-feedback-015",
          "data": {
            "id": "demo-feedback-015",
            "appointmentId": "demo-appointment-082",
            "userId": "demo-citizen-001",
            "comment": "Average service, met expectations.",
            "rating": 3,
            "createdAt": "2025-06-17T20:33:05.854Z"
          }
        },
        {
          "id": "demo-feedback-016",
          "data": {
            "appointmentId": "demo-appointment-156",
            "createdAt": "2025-08-04T04:47:22.473Z",
            "rating": 1,
            "id": "demo-feedback-016",
            "comment": "Impressed with the digital system and ease of use.",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-017",
          "data": {
            "id": "demo-feedback-017",
            "appointmentId": "demo-appointment-065",
            "createdAt": "2025-08-03T08:11:32.576Z",
            "comment": "Good experience overall, staff was helpful.",
            "rating": 3,
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-018",
          "data": {
            "createdAt": "2025-07-09T19:06:52.940Z",
            "comment": "Process was smooth and well organized.",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-018",
            "rating": 5,
            "appointmentId": "demo-appointment-141"
          }
        },
        {
          "id": "demo-feedback-019",
          "data": {
            "comment": "Professional handling of my requirements.",
            "userId": "demo-citizen-025",
            "createdAt": "2025-06-21T06:24:20.769Z",
            "appointmentId": "demo-appointment-030",
            "rating": 5,
            "id": "demo-feedback-019"
          }
        },
        {
          "id": "demo-feedback-020",
          "data": {
            "rating": 3,
            "id": "demo-feedback-020",
            "createdAt": "2025-06-22T18:36:23.828Z",
            "appointmentId": "demo-appointment-104",
            "userId": "demo-citizen-001",
            "comment": "Average service, met expectations."
          }
        },
        {
          "id": "demo-feedback-021",
          "data": {
            "createdAt": "2025-08-15T13:25:49.602Z",
            "appointmentId": "demo-appointment-100",
            "id": "demo-feedback-021",
            "userId": "demo-citizen-001",
            "rating": 3,
            "comment": "Could be improved but generally satisfied."
          }
        },
        {
          "id": "demo-feedback-022",
          "data": {
            "rating": 4,
            "createdAt": "2025-08-14T14:44:23.437Z",
            "id": "demo-feedback-022",
            "comment": "Process was smooth and well organized.",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-100"
          }
        },
        {
          "id": "demo-feedback-023",
          "data": {
            "id": "demo-feedback-023",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-104",
            "createdAt": "2025-06-24T16:09:33.897Z",
            "comment": "Quick and hassle-free experience.",
            "rating": 2
          }
        },
        {
          "id": "demo-feedback-024",
          "data": {
            "id": "demo-feedback-024",
            "userId": "demo-citizen-001",
            "rating": 3,
            "comment": "Could be improved but generally satisfied.",
            "appointmentId": "demo-appointment-129",
            "createdAt": "2025-06-29T17:42:16.973Z"
          }
        },
        {
          "id": "demo-feedback-025",
          "data": {
            "rating": 4,
            "createdAt": "2025-06-20T11:53:31.764Z",
            "id": "demo-feedback-025",
            "appointmentId": "demo-appointment-175",
            "userId": "demo-citizen-001",
            "comment": "Excellent service! Very professional and efficient."
          }
        },
        {
          "id": "demo-feedback-026",
          "data": {
            "comment": "Outstanding service quality and quick processing.",
            "appointmentId": "demo-appointment-011",
            "rating": 3,
            "id": "demo-feedback-026",
            "createdAt": "2025-06-30T05:30:37.843Z",
            "userId": "demo-citizen-006"
          }
        },
        {
          "id": "demo-feedback-027",
          "data": {
            "comment": "Outstanding service quality and quick processing.",
            "userId": "demo-citizen-001",
            "rating": 2,
            "id": "demo-feedback-027",
            "appointmentId": "demo-appointment-112",
            "createdAt": "2025-07-18T13:04:59.465Z"
          }
        },
        {
          "id": "demo-feedback-028",
          "data": {
            "createdAt": "2025-07-16T12:38:29.882Z",
            "id": "demo-feedback-028",
            "userId": "demo-citizen-001",
            "rating": 4,
            "comment": "Outstanding service quality and quick processing.",
            "appointmentId": "demo-appointment-082"
          }
        },
        {
          "id": "demo-feedback-029",
          "data": {
            "id": "demo-feedback-029",
            "createdAt": "2025-06-17T20:59:48.741Z",
            "rating": 2,
            "comment": "Outstanding service quality and quick processing.",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-174"
          }
        },
        {
          "id": "demo-feedback-030",
          "data": {
            "createdAt": "2025-07-29T05:59:29.719Z",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-122",
            "id": "demo-feedback-030",
            "comment": "Excellent service! Very professional and efficient.",
            "rating": 3
          }
        },
        {
          "id": "demo-feedback-031",
          "data": {
            "userId": "demo-citizen-001",
            "id": "demo-feedback-031",
            "rating": 1,
            "createdAt": "2025-07-10T21:54:33.186Z",
            "appointmentId": "demo-appointment-112",
            "comment": "Process was smooth and well organized."
          }
        },
        {
          "id": "demo-feedback-032",
          "data": {
            "userId": "demo-citizen-049",
            "appointmentId": "demo-appointment-054",
            "comment": "Average service, met expectations.",
            "rating": 3,
            "createdAt": "2025-07-16T20:18:05.233Z",
            "id": "demo-feedback-032"
          }
        },
        {
          "id": "demo-feedback-033",
          "data": {
            "id": "demo-feedback-033",
            "rating": 3,
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-094",
            "comment": "Could be improved but generally satisfied.",
            "createdAt": "2025-07-19T12:25:14.960Z"
          }
        },
        {
          "id": "demo-feedback-034",
          "data": {
            "userId": "demo-citizen-001",
            "id": "demo-feedback-034",
            "rating": 3,
            "comment": "Excellent service! Very professional and efficient.",
            "appointmentId": "demo-appointment-144",
            "createdAt": "2025-08-04T11:16:01.660Z"
          }
        },
        {
          "id": "demo-feedback-035",
          "data": {
            "id": "demo-feedback-035",
            "appointmentId": "demo-appointment-189",
            "rating": 2,
            "userId": "demo-citizen-001",
            "comment": "Professional handling of my requirements.",
            "createdAt": "2025-07-24T05:13:42.135Z"
          }
        },
        {
          "id": "demo-feedback-036",
          "data": {
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-28T23:55:15.218Z",
            "id": "demo-feedback-036",
            "rating": 3,
            "appointmentId": "demo-appointment-122",
            "comment": "Staff was courteous and knowledgeable."
          }
        },
        {
          "id": "demo-feedback-037",
          "data": {
            "comment": "Quick and hassle-free experience.",
            "id": "demo-feedback-037",
            "rating": 4,
            "createdAt": "2025-07-06T14:50:21.324Z",
            "appointmentId": "demo-appointment-144",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-038",
          "data": {
            "createdAt": "2025-07-10T12:22:46.422Z",
            "comment": "Could be improved but generally satisfied.",
            "userId": "demo-citizen-001",
            "rating": 2,
            "id": "demo-feedback-038",
            "appointmentId": "demo-appointment-162"
          }
        },
        {
          "id": "demo-feedback-039",
          "data": {
            "rating": 2,
            "appointmentId": "demo-appointment-128",
            "comment": "Excellent service! Very professional and efficient.",
            "createdAt": "2025-07-04T17:20:51.992Z",
            "id": "demo-feedback-039",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-040",
          "data": {
            "userId": "demo-citizen-001",
            "id": "demo-feedback-040",
            "appointmentId": "demo-appointment-174",
            "rating": 4,
            "comment": "Average service, met expectations.",
            "createdAt": "2025-06-26T03:51:35.291Z"
          }
        },
        {
          "id": "demo-feedback-041",
          "data": {
            "appointmentId": "demo-appointment-098",
            "id": "demo-feedback-041",
            "rating": 2,
            "createdAt": "2025-06-22T14:14:34.548Z",
            "userId": "demo-citizen-001",
            "comment": "Impressed with the digital system and ease of use."
          }
        },
        {
          "id": "demo-feedback-042",
          "data": {
            "appointmentId": "demo-appointment-100",
            "id": "demo-feedback-042",
            "rating": 3,
            "createdAt": "2025-08-06T16:07:46.283Z",
            "userId": "demo-citizen-001",
            "comment": "Good experience overall, staff was helpful."
          }
        },
        {
          "id": "demo-feedback-043",
          "data": {
            "rating": 3,
            "comment": "Quick and hassle-free experience.",
            "userId": "demo-citizen-037",
            "createdAt": "2025-06-20T20:53:39.030Z",
            "appointmentId": "demo-appointment-042",
            "id": "demo-feedback-043"
          }
        },
        {
          "id": "demo-feedback-044",
          "data": {
            "userId": "demo-citizen-001",
            "rating": 1,
            "appointmentId": "demo-appointment-063",
            "comment": "Staff was courteous and knowledgeable.",
            "id": "demo-feedback-044",
            "createdAt": "2025-08-13T15:05:00.339Z"
          }
        },
        {
          "id": "demo-feedback-045",
          "data": {
            "createdAt": "2025-07-13T05:57:42.936Z",
            "appointmentId": "demo-appointment-122",
            "rating": 5,
            "userId": "demo-citizen-001",
            "comment": "Could be improved but generally satisfied.",
            "id": "demo-feedback-045"
          }
        },
        {
          "id": "demo-feedback-046",
          "data": {
            "rating": 2,
            "userId": "demo-citizen-001",
            "id": "demo-feedback-046",
            "comment": "Professional handling of my requirements.",
            "createdAt": "2025-08-12T22:45:48.321Z",
            "appointmentId": "demo-appointment-141"
          }
        },
        {
          "id": "demo-feedback-047",
          "data": {
            "appointmentId": "demo-appointment-011",
            "userId": "demo-citizen-006",
            "comment": "Average service, met expectations.",
            "rating": 2,
            "createdAt": "2025-07-23T01:26:15.882Z",
            "id": "demo-feedback-047"
          }
        },
        {
          "id": "demo-feedback-048",
          "data": {
            "createdAt": "2025-06-19T23:49:29.766Z",
            "appointmentId": "demo-appointment-140",
            "id": "demo-feedback-048",
            "rating": 3,
            "userId": "demo-citizen-001",
            "comment": "Average service, met expectations."
          }
        },
        {
          "id": "demo-feedback-049",
          "data": {
            "userId": "demo-citizen-025",
            "createdAt": "2025-07-19T08:17:23.095Z",
            "appointmentId": "demo-appointment-030",
            "id": "demo-feedback-049",
            "rating": 5,
            "comment": "Quick and hassle-free experience."
          }
        },
        {
          "id": "demo-feedback-050",
          "data": {
            "id": "demo-feedback-050",
            "rating": 1,
            "userId": "demo-citizen-001",
            "comment": "Excellent service! Very professional and efficient.",
            "createdAt": "2025-07-21T00:32:19.493Z",
            "appointmentId": "demo-appointment-147"
          }
        },
        {
          "id": "demo-feedback-051",
          "data": {
            "comment": "Excellent service! Very professional and efficient.",
            "appointmentId": "demo-appointment-098",
            "id": "demo-feedback-051",
            "rating": 5,
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-07T19:59:03.989Z"
          }
        },
        {
          "id": "demo-feedback-052",
          "data": {
            "id": "demo-feedback-052",
            "createdAt": "2025-07-20T06:02:29.386Z",
            "comment": "Could be improved but generally satisfied.",
            "appointmentId": "demo-appointment-189",
            "userId": "demo-citizen-001",
            "rating": 4
          }
        },
        {
          "id": "demo-feedback-053",
          "data": {
            "createdAt": "2025-07-05T04:56:44.494Z",
            "rating": 1,
            "comment": "Excellent service! Very professional and efficient.",
            "appointmentId": "demo-appointment-082",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-053"
          }
        },
        {
          "id": "demo-feedback-054",
          "data": {
            "userId": "demo-citizen-001",
            "id": "demo-feedback-054",
            "appointmentId": "demo-appointment-123",
            "rating": 2,
            "comment": "Quick and hassle-free experience.",
            "createdAt": "2025-07-31T13:15:35.229Z"
          }
        },
        {
          "id": "demo-feedback-055",
          "data": {
            "rating": 5,
            "createdAt": "2025-07-10T11:15:31.576Z",
            "userId": "demo-citizen-001",
            "comment": "Staff was courteous and knowledgeable.",
            "id": "demo-feedback-055",
            "appointmentId": "demo-appointment-156"
          }
        },
        {
          "id": "demo-feedback-056",
          "data": {
            "rating": 4,
            "createdAt": "2025-07-11T12:45:10.165Z",
            "id": "demo-feedback-056",
            "comment": "Impressed with the digital system and ease of use.",
            "userId": "demo-citizen-037",
            "appointmentId": "demo-appointment-042"
          }
        },
        {
          "id": "demo-feedback-057",
          "data": {
            "comment": "Impressed with the digital system and ease of use.",
            "rating": 4,
            "id": "demo-feedback-057",
            "createdAt": "2025-08-05T02:26:18.519Z",
            "appointmentId": "demo-appointment-129",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-058",
          "data": {
            "comment": "Could be improved but generally satisfied.",
            "id": "demo-feedback-058",
            "rating": 1,
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-16T04:50:16.855Z",
            "appointmentId": "demo-appointment-082"
          }
        },
        {
          "id": "demo-feedback-059",
          "data": {
            "appointmentId": "demo-appointment-174",
            "id": "demo-feedback-059",
            "rating": 5,
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-09T09:25:41.487Z",
            "comment": "Professional handling of my requirements."
          }
        },
        {
          "id": "demo-feedback-060",
          "data": {
            "createdAt": "2025-08-02T01:49:50.190Z",
            "rating": 3,
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-189",
            "id": "demo-feedback-060",
            "comment": "Impressed with the digital system and ease of use."
          }
        },
        {
          "id": "demo-feedback-061",
          "data": {
            "comment": "Average service, met expectations.",
            "rating": 2,
            "userId": "demo-citizen-001",
            "id": "demo-feedback-061",
            "createdAt": "2025-07-13T15:01:05.208Z",
            "appointmentId": "demo-appointment-128"
          }
        },
        {
          "id": "demo-feedback-062",
          "data": {
            "createdAt": "2025-07-04T08:52:41.526Z",
            "id": "demo-feedback-062",
            "appointmentId": "demo-appointment-024",
            "rating": 4,
            "userId": "demo-citizen-019",
            "comment": "Impressed with the digital system and ease of use."
          }
        },
        {
          "id": "demo-feedback-063",
          "data": {
            "comment": "Professional handling of my requirements.",
            "appointmentId": "demo-appointment-126",
            "id": "demo-feedback-063",
            "userId": "demo-citizen-001",
            "rating": 4,
            "createdAt": "2025-08-16T09:04:18.121Z"
          }
        },
        {
          "id": "demo-feedback-064",
          "data": {
            "id": "demo-feedback-064",
            "appointmentId": "demo-appointment-196",
            "rating": 2,
            "userId": "demo-citizen-001",
            "createdAt": "2025-08-12T09:01:52.480Z",
            "comment": "Impressed with the digital system and ease of use."
          }
        },
        {
          "id": "demo-feedback-065",
          "data": {
            "userId": "demo-citizen-024",
            "comment": "Staff was courteous and knowledgeable.",
            "createdAt": "2025-07-28T15:55:24.808Z",
            "appointmentId": "demo-appointment-029",
            "id": "demo-feedback-065",
            "rating": 2
          }
        },
        {
          "id": "demo-feedback-066",
          "data": {
            "createdAt": "2025-08-01T01:41:31.313Z",
            "id": "demo-feedback-066",
            "appointmentId": "demo-appointment-123",
            "rating": 5,
            "comment": "Average service, met expectations.",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-067",
          "data": {
            "createdAt": "2025-07-26T11:43:50.027Z",
            "rating": 4,
            "id": "demo-feedback-067",
            "comment": "Process was smooth and well organized.",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-190"
          }
        },
        {
          "id": "demo-feedback-068",
          "data": {
            "id": "demo-feedback-068",
            "rating": 2,
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-129",
            "comment": "Impressed with the digital system and ease of use.",
            "createdAt": "2025-06-23T07:36:32.112Z"
          }
        },
        {
          "id": "demo-feedback-069",
          "data": {
            "createdAt": "2025-07-10T17:25:53.829Z",
            "id": "demo-feedback-069",
            "rating": 1,
            "appointmentId": "demo-appointment-163",
            "comment": "Could be improved but generally satisfied.",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-070",
          "data": {
            "userId": "demo-citizen-001",
            "comment": "Could be improved but generally satisfied.",
            "id": "demo-feedback-070",
            "rating": 4,
            "createdAt": "2025-07-01T04:24:29.593Z",
            "appointmentId": "demo-appointment-100"
          }
        },
        {
          "id": "demo-feedback-071",
          "data": {
            "createdAt": "2025-07-13T09:12:48.530Z",
            "userId": "demo-citizen-001",
            "comment": "Could be improved but generally satisfied.",
            "rating": 2,
            "id": "demo-feedback-071",
            "appointmentId": "demo-appointment-112"
          }
        },
        {
          "id": "demo-feedback-072",
          "data": {
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-129",
            "rating": 3,
            "id": "demo-feedback-072",
            "createdAt": "2025-08-15T00:31:16.148Z",
            "comment": "Could be improved but generally satisfied."
          }
        },
        {
          "id": "demo-feedback-073",
          "data": {
            "rating": 2,
            "comment": "Excellent service! Very professional and efficient.",
            "appointmentId": "demo-appointment-161",
            "id": "demo-feedback-073",
            "createdAt": "2025-07-02T02:42:29.154Z",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-074",
          "data": {
            "id": "demo-feedback-074",
            "comment": "Excellent service! Very professional and efficient.",
            "createdAt": "2025-06-24T22:17:23.237Z",
            "userId": "demo-citizen-001",
            "rating": 3,
            "appointmentId": "demo-appointment-123"
          }
        },
        {
          "id": "demo-feedback-075",
          "data": {
            "appointmentId": "demo-appointment-156",
            "comment": "Outstanding service quality and quick processing.",
            "userId": "demo-citizen-001",
            "rating": 2,
            "id": "demo-feedback-075",
            "createdAt": "2025-06-23T23:57:51.198Z"
          }
        },
        {
          "id": "demo-feedback-076",
          "data": {
            "comment": "Process was smooth and well organized.",
            "createdAt": "2025-08-04T03:50:31.572Z",
            "appointmentId": "demo-appointment-183",
            "id": "demo-feedback-076",
            "userId": "demo-citizen-001",
            "rating": 3
          }
        },
        {
          "id": "demo-feedback-077",
          "data": {
            "createdAt": "2025-06-20T23:49:06.098Z",
            "rating": 1,
            "comment": "Impressed with the digital system and ease of use.",
            "userId": "demo-citizen-041",
            "id": "demo-feedback-077",
            "appointmentId": "demo-appointment-046"
          }
        },
        {
          "id": "demo-feedback-078",
          "data": {
            "id": "demo-feedback-078",
            "appointmentId": "demo-appointment-123",
            "rating": 3,
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-28T11:09:45.144Z",
            "comment": "Excellent service! Very professional and efficient."
          }
        },
        {
          "id": "demo-feedback-079",
          "data": {
            "userId": "demo-citizen-001",
            "comment": "Impressed with the digital system and ease of use.",
            "appointmentId": "demo-appointment-090",
            "rating": 1,
            "createdAt": "2025-06-29T12:21:05.181Z",
            "id": "demo-feedback-079"
          }
        },
        {
          "id": "demo-feedback-080",
          "data": {
            "createdAt": "2025-06-26T17:28:40.023Z",
            "rating": 4,
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-183",
            "comment": "Outstanding service quality and quick processing.",
            "id": "demo-feedback-080"
          }
        },
        {
          "id": "demo-feedback-081",
          "data": {
            "createdAt": "2025-08-13T07:28:32.180Z",
            "comment": "Could be improved but generally satisfied.",
            "appointmentId": "demo-appointment-049",
            "userId": "demo-citizen-044",
            "id": "demo-feedback-081",
            "rating": 4
          }
        },
        {
          "id": "demo-feedback-082",
          "data": {
            "rating": 3,
            "appointmentId": "demo-appointment-161",
            "comment": "Could be improved but generally satisfied.",
            "userId": "demo-citizen-001",
            "createdAt": "2025-06-21T21:53:47.993Z",
            "id": "demo-feedback-082"
          }
        },
        {
          "id": "demo-feedback-083",
          "data": {
            "comment": "Professional handling of my requirements.",
            "rating": 4,
            "createdAt": "2025-07-21T17:07:13.257Z",
            "id": "demo-feedback-083",
            "appointmentId": "demo-appointment-046",
            "userId": "demo-citizen-041"
          }
        },
        {
          "id": "demo-feedback-084",
          "data": {
            "id": "demo-feedback-084",
            "createdAt": "2025-06-22T11:13:16.151Z",
            "appointmentId": "demo-appointment-174",
            "comment": "Outstanding service quality and quick processing.",
            "userId": "demo-citizen-001",
            "rating": 3
          }
        },
        {
          "id": "demo-feedback-085",
          "data": {
            "createdAt": "2025-07-20T04:55:12.959Z",
            "userId": "demo-citizen-020",
            "appointmentId": "demo-appointment-025",
            "comment": "Outstanding service quality and quick processing.",
            "id": "demo-feedback-085",
            "rating": 1
          }
        },
        {
          "id": "demo-feedback-086",
          "data": {
            "id": "demo-feedback-086",
            "userId": "demo-citizen-001",
            "createdAt": "2025-07-25T15:26:10.455Z",
            "appointmentId": "demo-appointment-140",
            "comment": "Could be improved but generally satisfied.",
            "rating": 5
          }
        },
        {
          "id": "demo-feedback-087",
          "data": {
            "createdAt": "2025-08-02T22:24:08.464Z",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-087",
            "comment": "Good experience overall, staff was helpful.",
            "rating": 4,
            "appointmentId": "demo-appointment-063"
          }
        },
        {
          "id": "demo-feedback-088",
          "data": {
            "createdAt": "2025-06-29T19:18:42.879Z",
            "rating": 3,
            "comment": "Average service, met expectations.",
            "appointmentId": "demo-appointment-189",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-088"
          }
        },
        {
          "id": "demo-feedback-089",
          "data": {
            "userId": "demo-citizen-001",
            "rating": 1,
            "appointmentId": "demo-appointment-196",
            "comment": "Process was smooth and well organized.",
            "createdAt": "2025-07-27T23:02:38.707Z",
            "id": "demo-feedback-089"
          }
        },
        {
          "id": "demo-feedback-090",
          "data": {
            "rating": 3,
            "appointmentId": "demo-appointment-054",
            "id": "demo-feedback-090",
            "userId": "demo-citizen-049",
            "comment": "Impressed with the digital system and ease of use.",
            "createdAt": "2025-07-21T08:57:28.302Z"
          }
        },
        {
          "id": "demo-feedback-091",
          "data": {
            "id": "demo-feedback-091",
            "comment": "Could be improved but generally satisfied.",
            "userId": "demo-citizen-049",
            "rating": 1,
            "createdAt": "2025-07-07T09:18:44.693Z",
            "appointmentId": "demo-appointment-054"
          }
        },
        {
          "id": "demo-feedback-092",
          "data": {
            "userId": "demo-citizen-037",
            "rating": 3,
            "appointmentId": "demo-appointment-042",
            "id": "demo-feedback-092",
            "comment": "Average service, met expectations.",
            "createdAt": "2025-06-20T16:17:19.762Z"
          }
        },
        {
          "id": "demo-feedback-093",
          "data": {
            "comment": "Professional handling of my requirements.",
            "rating": 2,
            "createdAt": "2025-06-27T10:36:53.761Z",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-093",
            "appointmentId": "demo-appointment-091"
          }
        },
        {
          "id": "demo-feedback-094",
          "data": {
            "createdAt": "2025-07-31T22:18:45.435Z",
            "appointmentId": "demo-appointment-140",
            "comment": "Excellent service! Very professional and efficient.",
            "rating": 1,
            "id": "demo-feedback-094",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-095",
          "data": {
            "appointmentId": "demo-appointment-141",
            "id": "demo-feedback-095",
            "rating": 2,
            "userId": "demo-citizen-001",
            "comment": "Impressed with the digital system and ease of use.",
            "createdAt": "2025-08-12T15:57:34.107Z"
          }
        },
        {
          "id": "demo-feedback-096",
          "data": {
            "comment": "Professional handling of my requirements.",
            "createdAt": "2025-08-04T12:24:50.178Z",
            "rating": 3,
            "appointmentId": "demo-appointment-123",
            "userId": "demo-citizen-001",
            "id": "demo-feedback-096"
          }
        },
        {
          "id": "demo-feedback-097",
          "data": {
            "userId": "demo-citizen-049",
            "comment": "Outstanding service quality and quick processing.",
            "rating": 5,
            "createdAt": "2025-06-23T14:03:09.734Z",
            "id": "demo-feedback-097",
            "appointmentId": "demo-appointment-054"
          }
        },
        {
          "id": "demo-feedback-098",
          "data": {
            "appointmentId": "demo-appointment-154",
            "userId": "demo-citizen-001",
            "createdAt": "2025-08-05T12:33:07.845Z",
            "comment": "Outstanding service quality and quick processing.",
            "rating": 1,
            "id": "demo-feedback-098"
          }
        },
        {
          "id": "demo-feedback-099",
          "data": {
            "id": "demo-feedback-099",
            "createdAt": "2025-06-22T10:03:48.243Z",
            "rating": 4,
            "comment": "Impressed with the digital system and ease of use.",
            "userId": "demo-citizen-001",
            "appointmentId": "demo-appointment-129"
          }
        },
        {
          "id": "demo-feedback-100",
          "data": {
            "appointmentId": "demo-appointment-140",
            "userId": "demo-citizen-001",
            "rating": 5,
            "createdAt": "2025-08-03T19:05:15.545Z",
            "comment": "Process was smooth and well organized.",
            "id": "demo-feedback-100"
          }
        },
        {
          "id": "demo-feedback-101",
          "data": {
            "comment": "Professional handling of my requirements.",
            "rating": 4,
            "createdAt": "2025-07-01T00:16:30.333Z",
            "id": "demo-feedback-101",
            "appointmentId": "demo-appointment-147",
            "userId": "demo-citizen-001"
          }
        },
        {
          "id": "demo-feedback-102",
          "data": {
            "userId": "demo-citizen-006",
            "createdAt": "2025-08-16T04:03:17.200Z",
            "appointmentId": "demo-appointment-011",
            "comment": "Good experience overall, staff was helpful.",
            "id": "demo-feedback-102",
            "rating": 3
          }
        }
      ]
    },
    "analytics": {
      "count": 1,
      "documents": [
        {
          "id": "system-analytics-2025",
          "data": {
            "timeRange": {
              "start": "2024-01-01T00:00:00.000Z",
              "end": "2025-02-28T23:59:59.000Z"
            },
            "data": {
              "recentActivity": [
                {
                  "service": "Vehicle Registration",
                  "time": "2 hours ago",
                  "user": "Amal Perera",
                  "action": "New appointment booked"
                },
                {
                  "service": "Birth Certificate",
                  "time": "4 hours ago",
                  "user": "Sita Fernando",
                  "action": "Appointment completed"
                },
                {
                  "rating": 5,
                  "user": "Nimal Silva",
                  "action": "Feedback submitted",
                  "time": "6 hours ago"
                },
                {
                  "time": "8 hours ago",
                  "action": "New user registered",
                  "role": "citizen",
                  "user": "Kamal Jayasinghe"
                },
                {
                  "service": "Passport Renewal",
                  "action": "Document uploaded",
                  "user": "Priya Wickramasinghe",
                  "time": "1 day ago"
                }
              ],
              "overview": {
                "totalDepartments": 4,
                "totalOfficers": 4,
                "totalCitizens": 55,
                "totalAppointments": 217,
                "systemUptime": "99.8%",
                "totalFeedback": 103,
                "totalUsers": 61,
                "averageRating": 4.2,
                "totalAdmins": 2,
                "totalServices": 12
              },
              "appointments": {
                "averageProcessingTime": "2.3 days",
                "cancelled": 8,
                "pending": 25,
                "noShow": 4,
                "completionRate": "94.2%",
                "confirmed": 38,
                "completed": 142
              },
              "topServices": [
                {
                  "count": 32,
                  "growth": "+15%",
                  "id": "demo-service-driving-license",
                  "name": "Driving License Application"
                },
                {
                  "name": "Passport Application",
                  "id": "demo-service-passport-application",
                  "growth": "+12%",
                  "count": 28
                },
                {
                  "count": 25,
                  "growth": "+8%",
                  "name": "Birth Certificate",
                  "id": "demo-service-birth-certificate"
                },
                {
                  "count": 22,
                  "name": "Vehicle Registration",
                  "growth": "+10%",
                  "id": "demo-service-vehicle-registration"
                },
                {
                  "name": "Tax Registration",
                  "count": 18,
                  "id": "demo-service-tax-registration",
                  "growth": "+5%"
                }
              ],
              "departments": {
                "demo-dept-motor-traffic": {
                  "noShow": 1,
                  "monthlyGrowth": "+12%",
                  "name": "Department of Motor Traffic",
                  "popularServices": [
                    "driving-license",
                    "vehicle-registration",
                    "license-renewal"
                  ],
                  "confirmed": 8,
                  "completed": 45,
                  "pending": 12,
                  "totalAppointments": 68,
                  "averageRating": 4.3,
                  "cancelled": 2
                },
                "demo-dept-immigration": {
                  "completed": 38,
                  "averageRating": 4.4,
                  "pending": 8,
                  "noShow": 1,
                  "cancelled": 1,
                  "confirmed": 10,
                  "name": "Department of Immigration & Emigration",
                  "popularServices": [
                    "passport-application",
                    "passport-renewal",
                    "visa-extension"
                  ],
                  "totalAppointments": 58,
                  "monthlyGrowth": "+8%"
                },
                "demo-dept-inland-revenue": {
                  "name": "Department of Inland Revenue",
                  "cancelled": 3,
                  "popularServices": [
                    "tax-registration",
                    "tax-filing",
                    "tax-clearance"
                  ],
                  "averageRating": 3.8,
                  "noShow": 2,
                  "completed": 24,
                  "monthlyGrowth": "+5%",
                  "totalAppointments": 39,
                  "confirmed": 8,
                  "pending": 2
                },
                "demo-dept-registrar-general": {
                  "confirmed": 12,
                  "name": "Registrar General's Department",
                  "averageRating": 4,
                  "cancelled": 2,
                  "monthlyGrowth": "+15%",
                  "noShow": 0,
                  "popularServices": [
                    "birth-certificate",
                    "marriage-certificate",
                    "death-certificate"
                  ],
                  "pending": 3,
                  "completed": 35,
                  "totalAppointments": 52
                }
              },
              "performance": {
                "responseTime": "1.2s",
                "userSatisfaction": "4.2/5",
                "processingEfficiency": "94.2%",
                "dataAccuracy": "99.7%",
                "systemReliability": "99.8%"
              },
              "trends": {
                "daily": {
                  "Thursday": 38,
                  "Monday": 28,
                  "Sunday": 12,
                  "Saturday": 18,
                  "Tuesday": 35,
                  "Friday": 32,
                  "Wednesday": 42
                },
                "hourly": {
                  "11:00": 22,
                  "14:00": 28,
                  "08:00": 12,
                  "15:00": 24,
                  "16:00": 19,
                  "13:00": 15,
                  "12:00": 8,
                  "10:00": 25,
                  "09:00": 18
                },
                "monthly": {
                  "August": 68,
                  "September": 59,
                  "November": 55,
                  "May": 58,
                  "July": 72,
                  "April": 61,
                  "February": 52,
                  "December": 48,
                  "June": 65,
                  "October": 63,
                  "March": 48,
                  "January": 45
                }
              }
            },
            "type": "system_overview",
            "id": "system-analytics-2025",
            "generatedAt": "2025-08-16T18:05:59.731Z"
          }
        }
      ]
    },
    "user_activity": {
      "count": 1,
      "documents": [
        {
          "id": "citizen-activity-ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
          "data": {
            "averageRating": 4.7,
            "totalAppointments": 7,
            "userId": "ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "favoriteServices": [
              "demo-service-driving-license",
              "demo-service-passport-application"
            ],
            "confirmedAppointments": 2,
            "stats": {
              "appointmentsThisMonth": 2,
              "totalFeedbackGiven": 3,
              "appointmentsThisYear": 7,
              "documentsUploaded": 12,
              "avgProcessingTime": "2.5 days"
            },
            "joinedDate": "2024-06-15T08:00:00.000Z",
            "pendingAppointments": 2,
            "preferredDepartments": [
              "demo-dept-motor-traffic",
              "demo-dept-immigration"
            ],
            "completedAppointments": 3,
            "id": "citizen-activity-ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2",
            "lastActivity": "2025-08-16T18:03:52.271Z"
          }
        }
      ]
    },
    "admin_activity": {
      "count": 1,
      "documents": [
        {
          "id": "admin-activity-1v1EdpNKmiWRH4MAwx9fKxbsYpO2",
          "data": {
            "lastLogin": "2025-08-16T18:06:00.062Z",
            "id": "admin-activity-1v1EdpNKmiWRH4MAwx9fKxbsYpO2",
            "role": "admin",
            "permissions": {
              "canModifyServices": true,
              "canManageSystem": true,
              "canAccessAnalytics": true,
              "canViewAllData": true,
              "canManageUsers": true
            },
            "userId": "1v1EdpNKmiWRH4MAwx9fKxbsYpO2",
            "recentActions": [
              {
                "timestamp": "2025-01-28T14:30:00.000Z",
                "action": "Generated monthly report"
              },
              {
                "timestamp": "2025-01-27T16:45:00.000Z",
                "action": "Updated department working hours"
              },
              {
                "timestamp": "2025-01-26T11:20:00.000Z",
                "action": "Reviewed user feedback"
              },
              {
                "timestamp": "2025-01-25T09:15:00.000Z",
                "action": "Approved new service registration"
              },
              {
                "action": "Updated system settings",
                "timestamp": "2025-01-24T15:00:00.000Z"
              }
            ],
            "sessionCount": 156,
            "actionsPerformed": {
              "systemConfigChanges": 7,
              "reportsGenerated": 15,
              "appointmentsReviewed": 89,
              "departmentUpdates": 12,
              "usersManaged": 23
            }
          }
        }
      ]
    },
    "system_alerts": {
      "count": 3,
      "documents": [
        {
          "id": "alert-001",
          "data": {
            "id": "alert-001",
            "title": "System Performance Update",
            "severity": "low",
            "message": "All systems running smoothly. 99.8% uptime maintained this month.",
            "read": false,
            "type": "info",
            "createdAt": "2025-01-28T08:00:00.000Z"
          }
        },
        {
          "id": "alert-002",
          "data": {
            "createdAt": "2025-01-27T17:00:00.000Z",
            "type": "success",
            "title": "Monthly Target Achieved",
            "severity": "low",
            "id": "alert-002",
            "read": true,
            "message": "Congratulations! Department of Motor Traffic exceeded appointment targets by 15%."
          }
        },
        {
          "id": "alert-003",
          "data": {
            "read": false,
            "severity": "medium",
            "type": "warning",
            "id": "alert-003",
            "createdAt": "2025-01-26T14:30:00.000Z",
            "title": "High Demand Alert",
            "message": "Passport services experiencing high demand. Consider extending operating hours."
          }
        }
      ]
    }
  },
  "summary": {
    "totalCollections": 10,
    "totalDocuments": 483,
    "exportedAt": "2025-08-16T18:13:54.702Z",
    "collections": [
      {
        "name": "users",
        "count": 69
      },
      {
        "name": "departments",
        "count": 9
      },
      {
        "name": "services",
        "count": 22
      },
      {
        "name": "appointments",
        "count": 212
      },
      {
        "name": "notifications",
        "count": 59
      },
      {
        "name": "feedback",
        "count": 106
      },
      {
        "name": "analytics",
        "count": 1
      },
      {
        "name": "user_activity",
        "count": 1
      },
      {
        "name": "admin_activity",
        "count": 1
      },
      {
        "name": "system_alerts",
        "count": 3
      }
    ]
  }
};

async function restoreDatabase() {
  console.log('🔄 Starting database restoration...');
  
  for (const [collectionName, collectionData] of Object.entries(databaseData.collections)) {
    console.log(`📋 Restoring ${collectionName} (${collectionData.count} documents)...`);
    
    for (const document of collectionData.documents) {
      try {
        await setDoc(doc(db, collectionName, document.id), document.data);
        console.log(`✅ Restored ${collectionName}/${document.id}`);
      } catch (error) {
        console.error(`❌ Failed to restore ${collectionName}/${document.id}:`, error);
      }
    }
  }
  
  console.log('🎉 Database restoration completed!');
}

// Run restoration
restoreDatabase().catch(console.error);
