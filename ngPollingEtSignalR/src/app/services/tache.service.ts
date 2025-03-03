import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const domain = "https://localhost:7289/";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(public http: HttpClient) { }

  async GetListeTache(): Promise<void> {
    let x = await lastValueFrom(this.http.get<any>(domain + "api/UselessTasks/GetAll"));
    console.log(x);
  }

  async AddTache(taskText: string): Promise<void> {
    let x = await lastValueFrom(this.http.post<any>(domain + "api/UselessTasks/Add", taskText));
    console.log(x);
  }

  async CompleteTache(id: number): Promise<void> {
    let x = await lastValueFrom(this.http.get<any>(domain + "api/UselessTasks/Complete/" + id));
    console.log(x);
  }
}
