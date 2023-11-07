//  all services on students
import { IStudent, PopulatedStudent } from "../interfaces/student";
import { StudentRepo } from "../repositories/student";
import ErrorResponses from "../errors/ErrorResponse";
import { ObjectId } from "mongoose";

//Student Service
export class StudentService extends StudentRepo {
  //student data by ID
  async singleStudentById(_id: string): Promise<PopulatedStudent> {
    const studentData = (await this.findAndPopulate(
      { _id },
      "MealPlan"
    )) as PopulatedStudent[];
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return studentData[0];
  }

  //   student room
  async studentRoomById(
    _id: string
  ): Promise<{ room: string; block: ObjectId }> {
    //IStudent is the generic type passed to findOne method then only we will get the expected return type
    const studentData = await this.findOne<IStudent>({ _id });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return { room: studentData?.room, block: studentData?.block };
  }

  // Get all students
  async allStudentsData(filter: object = {}): Promise<IStudent[] | null> {
    const allStudentsData = (await this.findAndPopulate(filter, [
      { path: "MealPlan", select: "title price name" },
      { path: "Block", select: "name" },
    ])) as IStudent[];
    if (allStudentsData.length < 1)
      throw ErrorResponses.noDataFound("Students");
    return allStudentsData;
  }

  //    All resident students
  async residentStudents(): Promise<IStudent[] | null> {
    return await this.allStudentsData({ status: "resident" });
  }

  //   Update single student
  async updateSingleStudent(_id: string, data: object) {
    const updatedStudent = await this.findByIdAndUpdate<IStudent>(_id, data);
    if (!updatedStudent) throw ErrorResponses.noDataFound("Student");
    return updatedStudent;
  }

  //Single student data by email
  async singleStudentDataByEmail(email: string): Promise<IStudent | null> {
    const studentData = await this.findOneAndPopulate({ email }, "MealPlan");
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return studentData;
  }

  //   Add Payment to student
  async addPayment(student: string, amountInPaisa: number): Promise<IStudent> {
    return await this.updateSingleStudent(student, {
      $inc: {
        paidPayment: amountInPaisa / 100,
        balancePayment: -(amountInPaisa / 100),
      },
    });
  }

  //payment statistics of all students
  async paymentStatistics(): Promise<{ paid: number; pending: number }> {
    return await this.paymentStatData();
  }
}
