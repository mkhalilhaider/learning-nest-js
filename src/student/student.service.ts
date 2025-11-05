import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    { id: 1, name: 'Khalil', age: 20 },
    { id: 2, name: 'Ali', age: 22 },
    { id: 3, name: 'Bilal', age: 23 },
  ];

  getAllStudents() {
    return this.students;
  }

  getStudentById(id: number) {
    const student = this.students.find((s) => s.id === id);
    if (!student) throw new NotFoundException('Student not Found!');
    return student;
  }

  addStudent(data: { name: string; age: number }) {
    const newStudent = {
      id: Date.now(),
      ...data,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  updateStudent(id: number, data: { name: string; age: number }) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not Found!');
    this.students[index] = { id, ...data };
    return this.students[index];
  }

  deleteStudent(id: number) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not Found!');
    const deleted = this.students.splice(index, 1);
    return { message: 'Student Deleted', student: deleted[0] };
  }
}
