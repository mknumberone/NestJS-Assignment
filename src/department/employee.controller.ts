import { EmployeeService } from '../employee/employee.service';
import { Controller, Get, Param} from '@nestjs/common';



@Controller('department/:id/employee')
export class EmpDepartmentController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get()
  getEmployee(@Param('departmentId') departmentId: string) {
    return this.employeeService.getEmployeeByDeparmentId(departmentId);
  }
}
