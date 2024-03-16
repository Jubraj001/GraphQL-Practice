import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
import { In, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    // "Query Builder is not supported by MongoDB,"
    // indicates that you're trying to use TypeORM's query builder feature with MongoDB.
    // However, MongoDB does not support query builders like SQL databases do.
    return this.studentRepository.findBy({
      id: In(studentIds),
    });
  }
}
