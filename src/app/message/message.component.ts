// import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {ElementRef, ViewChild}from '@angular/core';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  

  messageArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  message: string = ''; 
  dtOption : DataTables.Settings={};
  dtTrigger : Subject<any> = new Subject<any>();
   
  constructor( private http: HttpClient) { }
  private apiUrl = 'https://onesignal.com/api/v1/notifications';

  sendSMS(message: string, phoneNumber: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'MmNmMzE4NTAtNjNlMS00Y2Q5LWIyNDEtYzFmZTczYzgxYzI0',
      'Content-Type': 'application/json',
    });

    const body = {
      app_id: '1965e1f1-16b7-47dc-932f-c5df2bf4987d',
      contents: { en: message },
      data: { sms: phoneNumber },
      url: 'https://example.com',
      include_player_ids: ['player_id'],
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
  ngOnInit(): void {
  
    this.getmessage(); 
    this.dtOption = {
      pagingType: 'full_numbers',
      searching:true ,
      order:[[0,"asc"]],
      ordering: true
    }
    
  }

  getmessage() {
    this.http.get("http://localhost:8888/api/message/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.messageArray = resultData.data;
  
       });
  }
  
     

  

  onSubmit() {
    console.log("hello")
    let bodyData = {
      "message": this.message,
    };
    this.http.post("http://localhost:8888/api/message/add/", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      this.getmessage();
      alert("Are you want to submit this")
      this.message='';
    });

  }

 
  setUpdate(data:any)
  {
    this.message=data.message;
    const textareaElement=document.getElementById('editTextArea');
    if (textareaElement){
      textareaElement.scrollIntoView({behavior:'smooth', block: 'center'});
    }
  };

  UpdateRecords(message:string)
  {
    let bodyData=
    {
      "message": this.message,  
     };

     this.http.put("http://localhost:8888/api/message/update/"+ message,bodyData).subscribe((resultData:any)=>
    
    {
      console.log(resultData);
      alert("Are you want to update this?")
      this.getmessage();
    });
  }
  
  onSumbit()
  {
    if(this.message=='')
    {
      this.onSubmit();
    }
    else{
      this.UpdateRecords(this.message);
    }
  }
  setDelete(data:any)
  {
    this.http.delete("http://localhost:8888/api/message/delete"+"/"+ data.message).subscribe((resultData:any)=>
    {
      console.log(resultData);
      alert("Are you want to delete this?")
      this.getmessage();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.next(null); 
  }
  

}
