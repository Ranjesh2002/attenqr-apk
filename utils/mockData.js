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
];

export const calculateAttendanceStats = (studentId, courseId) => {
  let records = mockAttendanceRecords.filter(
    (record) => record.studentId === studentId
  );

  if (courseId) {
    records = records.filter((record) => record.courseId === courseId);
  }

  const totalClasses = records.length;
  const present = records.filter(
    (record) => record.status === "present"
  ).length;
  const absent = totalClasses - present;
  const percentage = totalClasses > 0 ? (present / totalClasses) * 100 : 0;

  return {
    totalClasses,
    present,
    absent,
    percentage: Math.round(percentage),
  };
};
