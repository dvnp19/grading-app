class AttendanceCalculatorService {
  calculateTotalPresenceInAMonth(students: number, daysInAMonth: number) {
    const total = students * daysInAMonth;
    return total;
  }

  calculatePercentage(present: number, total: number) {
    if (total === 0) return 0;
    return (present / total) * 100;
  }

  getGrade(percentage: number) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  }
}

export default new AttendanceCalculatorService();
