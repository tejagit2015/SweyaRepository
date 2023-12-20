import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getEmployees();
  }
  showForm = false;
  formTitle = "Add Employee";
  employeeData: any = [];
  empName: string = '';
  selectedId = new Set();

  id = "";
  name = "";
  location = "";
  requestType = "";

  addEmployeeForm()
  {
      this.clearForm();
      this.showForm = true;
      this.requestType = "add";
  }
  closeEmployeeForm()
  {
      this.showForm = false;
  }
  editEmployeeForm()
  {
      this.showForm = true;
      var empJson = this.filterSelectedEmployeeData();
      console.log("Emp JSON after filter : ", empJson);
      this.id = empJson[0].id;
      this.name = empJson[0].name;
      this.location = empJson[0].location;
      this.requestType = "edit";
  }
  filterSelectedEmployeeData()
  {
    var data_filter = this.employeeData.filter( (element: { website: string; }) => element.website =="yahoo")
      var empJson = this.employeeData.filter((singleEmp: { id: string; }) =>
                        singleEmp.id == this.selectedId.values().next().value);
    return empJson;                           
  }
  clearForm()
  {
      this.id = '';
      this.name = '';
      this.location = '';
  }

  addEmployee(employeeForm: NgForm) {
    console.log('Form Submitted', employeeForm);
    if(this.requestType == "add")
    {
      this.http.post("http://localhost:8080/addEmployee", employeeForm)
      .subscribe(() => {
        this.getEmployees();
        console.log(this.employeeData);
      });
    }
    else
    {
      this.http.put("http://localhost:8080/editEmployee", employeeForm)
      .subscribe(() => {
        this.getEmployees();
        console.log(this.employeeData);
      });
    }    
    this.closeEmployeeForm();
  }

  ajaxName(eventData: Event) {
    this.empName = (<HTMLInputElement>eventData.target).value;
  }

  getEmployees() {
    console.log('Testing UI');
    this.http.get("http://localhost:8080/getEmployees")
      .subscribe((homes) => {
        console.log(homes);
        this.employeeData = homes;
      })
  }
  
  checkBoxSelected(evnt:Event)
  {
      console.log('hell');
      this.selectedId.add((<HTMLInputElement>evnt.target).value);
      console.log('selected : ' + this.selectedId);
  }
  
  deleteEmployee()
  {
      console.log('delete');
      const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'}), 
          body: this.selectedId
      }
      this.http.delete("http://localhost:8080/deleteEmployee/" + this.selectedId)
        .subscribe(() => {
            console.log('deleted!');
            this.getEmployees();
        });
        this.selectedId = new Set();
  }
}