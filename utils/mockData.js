export const mockAttendanceRecords = [
  {
    id: "1",
    studentId: "1",
    courseId: "1",
    date: "2023-04-05",
    status: "present",
    timestamp: "2023-04-05T09:30:00Z",
  },
];

export const mockNotifications = [
  {
    id: "1",
    userId: "1",
    title: "Low Attendance Warning",
    message:
      "Your attendance in CS101 is below 75%. Please improve your attendance.",
    read: false,
    timestamp: "2023-04-10T10:00:00Z",
    type: "warning",
  },
  {
    id: "2",
    userId: "1",
    title: "Attendance Recorded",
    message: "Your attendance for CS201 has been recorded.",
    read: true,
    timestamp: "2023-04-08T11:05:00Z",
    type: "success",
  },
];

export const MOCK_ATTENDANCE = [
  {
    id: "1",
    date: new Date(2023, 11, 20),
    status: "present",
    subject: "Computer Networks",
  },
  {
    id: "2",
    date: new Date(2023, 11, 19),
    status: "present",
    subject: "Database Systems",
  },
  {
    id: "3",
    date: new Date(2023, 11, 18),
    status: "absent",
    subject: "Software Engineering",
  },
  {
    id: "4",
    date: new Date(2023, 11, 17),
    status: "present",
    subject: "AI Fundamentals",
  },
  {
    id: "5",
    date: new Date(2023, 11, 16),
    status: "present",
    subject: "Computer Networks",
  },
  {
    id: "6",
    date: new Date(2023, 11, 15),
    status: "absent",
    subject: "Database Systems",
  },
  {
    id: "7",
    date: new Date(2023, 11, 14),
    status: "present",
    subject: "Software Engineering",
  },
  {
    id: "8",
    date: new Date(2023, 11, 13),
    status: "present",
    subject: "AI Fundamentals",
  },
  {
    id: "9",
    date: new Date(2023, 11, 12),
    status: "present",
    subject: "Computer Networks",
  },
  {
    id: "10",
    date: new Date(2023, 11, 11),
    status: "absent",
    subject: "Database Systems",
  },
];

// export const mockClassesData = {
//   recentSessions: [
//     {
//       id: 1,
//       course: "Server System",
//       date: "2025-06-01",
//       attendees: 18,
//       total: 23,
//     },
//     {
//       id: 2,
//       course: "Database",
//       date: "2025-06-02",
//       attendees: 21,
//       total: 23,
//     },
//     {
//       id: 3,
//       course: "It Infrastructure",
//       date: "2025-05-03",
//       attendees: 22,
//       total: 23,
//     },
//   ],
// };

// export const attendanceData = [
//   {
//     id: "1",
//     name: "Ranjesh Thakur",
//     studentId: "23186532",
//     time: "07:15 AM",
//     status: "Present",
//   },
//   {
//     id: "2",
//     name: "Sumit Ray",
//     studentId: "23186542",
//     time: "07:10 AM",
//     status: "Present",
//   },
//   {
//     id: "3",
//     name: "Ratik Bajracharya",
//     studentId: "23186533",
//     time: "07:20 AM",
//     status: "Absent",
//   },
// ];

// export const calculateAttendanceStats = (studentId, courseId) => {
//   let records = mockAttendanceRecords.filter(
//     (record) => record.studentId === studentId
//   );

//   if (courseId) {
//     records = records.filter((record) => record.courseId === courseId);
//   }

//   const totalClasses = records.length;
//   const present = records.filter(
//     (record) => record.status === "present"
//   ).length;
//   const absent = totalClasses - present;
//   const percentage = totalClasses > 0 ? (present / totalClasses) * 100 : 0;

//   return {
//     totalClasses,
//     present,
//     absent,
//     percentage: Math.round(percentage),
//   };
// };
