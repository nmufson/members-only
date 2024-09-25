const users = [
  {
    firstName: 'Frodo',
    lastName: 'Baggins',
    email: 'frodo@gmail.com',
    password: 'Lembas123!',
    membershipStatus: true,
    isAdmin: false,
  },
  {
    firstName: 'Gandalf',
    lastName: null,
    email: 'gandalf@gmail.com',
    password: 'PointyHat37@',
    membershipStatus: true,
    isAdmin: true,
  },
  {
    firstName: 'Gimli',
    lastName: null,
    email: 'gimli@gmail.com',
    password: 'Ax3Dw@rf',
    membershipStatus: true,
    isAdmin: false,
  },
  {
    firstName: 'Saruman',
    lastName: null,
    email: 'saruman@gmail.com',
    password: 'Pal@ntir99',
    membershipStatus: true,
    isAdmin: false,
  },
  {
    firstName: 'Aragorn',
    lastName: 'son of Arathorn',
    email: 'aragorn@gmail.com',
    password: 'Str1der!King',
    membershipStatus: true,
    isAdmin: true,
  },
  {
    firstName: 'Legolas',
    lastName: 'Greenleaf',
    email: 'legolas@gmail.com',
    password: 'Elv3nArch3r#',
    membershipStatus: true,
    isAdmin: false,
  },
  {
    firstName: 'Galadriel',
    lastName: null,
    email: 'galadriel@gmail.com',
    password: 'L@dyOfLight12',
    membershipStatus: true,
    isAdmin: true,
  },
  {
    firstName: 'Samwise',
    lastName: 'Gamgee',
    email: 'sam@gmail.com',
    password: 'Pr3ciousP0tat0es&',
    membershipStatus: true,
    isAdmin: false,
  },
  {
    firstName: 'Gollum',
    lastName: null,
    email: 'gollum@gmail.com',
    password: 'myPrecious29!',
    membershipStatus: true,
    isAdmin: false,
  },
  {
    firstName: 'Faramir',
    lastName: null,
    email: 'faramir@gmail.com',
    password: 'Steward2be&Noble',
    membershipStatus: false,
    isAdmin: false,
  },
  {
    firstName: 'Boromir',
    lastName: null,
    email: 'boromir@gmail.com',
    password: 'F@ll3nHero!Horn',
    membershipStatus: false,
    isAdmin: false,
  },
  {
    firstName: 'Meriadoc',
    lastName: 'Brandybuck',
    email: 'merry@gmail.com',
    password: 'ShireAdv3nturer$!',
    membershipStatus: false,
    isAdmin: false,
  },
];

const messages = [
  {
    message_content: "I can't carry it for you, but I can carry you!",
    email: 'sam@gmail.com',
    timestamp: '2024-09-15 08:50:20',
  },
  {
    message_content: 'All shall love me and despair!',
    email: 'galadriel@gmail.com',
    timestamp: '2024-09-14 21:10:45',
  },
  {
    message_content:
      "I feel like I'm back at the Green Dragon after a hard day's work.",
    email: 'sam@gmail.com',
    timestamp: '2024-09-14 17:45:10',
  },
  {
    message_content:
      'A day may come when the courage of men fails, but it is not this day.',
    email: 'aragorn@gmail.com',
    timestamp: '2024-09-14 15:30:55',
  },
  {
    message_content: 'Build me an army worthy of Mordor.',
    email: 'saruman@gmail.com',
    timestamp: '2024-09-14 13:15:40',
  },
  {
    message_content: 'That still only counts as one!',
    email: 'gimli@gmail.com',
    timestamp: '2024-09-14 11:20:18',
  },
  {
    message_content: 'You shall not pass!',
    email: 'gandalf@gmail.com',
    timestamp: '2024-09-14 09:45:22',
  },
  {
    message_content: 'My precious...',
    email: 'gollum@gmail.com',
    timestamp: '2024-09-14 07:30:15',
  },
  {
    message_content: 'Not all those who wander are lost.',
    email: 'aragorn@gmail.com',
    timestamp: '2024-09-13 17:25:52',
  },
  {
    message_content: "Po-ta-toes! Boil 'em, mash 'em, stick 'em in a stew.",
    email: 'sam@gmail.com',
    timestamp: '2024-09-13 16:10:17',
  },
  {
    message_content:
      'Even the smallest person can change the course of the future.',
    email: 'galadriel@gmail.com',
    timestamp: '2024-09-13 15:30:41',
  },
  {
    message_content: "They're taking the Hobbits to Isengard!",
    email: 'legolas@gmail.com',
    timestamp: '2024-09-13 14:55:03',
  },
  {
    message_content:
      'I would rather share one lifetime with you than face all the ages of this world alone.',
    email: 'aragorn@gmail.com',
    timestamp: '2024-09-13 13:40:29',
  },
  {
    message_content:
      'All we have to decide is what to do with the time that is given us.',
    email: 'gandalf@gmail.com',
    timestamp: '2024-09-13 12:05:58',
  },
  {
    message_content: 'The hour is later than you think.',
    email: 'saruman@gmail.com',
    timestamp: '2024-09-13 11:20:37',
  },
  {
    message_content: 'Nobody tosses a dwarf!',
    email: 'gimli@gmail.com',
    timestamp: '2024-09-13 10:45:12',
  },
  {
    message_content:
      'A wizard is never late, nor is he early. He arrives precisely when he means to.',
    email: 'gandalf@gmail.com',
    timestamp: '2024-09-13 09:30:45',
  },
  {
    message_content:
      "Whatever you did, you've officially been labeled a disturber of the peace!",
    email: 'frodo@gmail.com',
    timestamp: '2024-09-13 08:15:23',
  },
];

module.exports = { users, messages };
