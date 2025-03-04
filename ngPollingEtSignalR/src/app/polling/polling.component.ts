import { TacheService } from './../services/tache.service';
import { Component, OnInit } from '@angular/core';
import { UselessTask } from '../models/UselessTask';
import { HttpClient } from '@angular/common/http';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [MatCheckbox, MatCardContent, MatCard, MatFormField, FormsModule, MatLabel, CommonModule, MatInput, MatButtonModule],
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {
  apiUrl = "https://localhost:7289/api/";
  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "";

  constructor(private http: HttpClient, public tacheService: TacheService) { }

  ngOnInit(): void {
    this.updateTasks();
  }

  async complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    this.tacheService.CompleteTache(id);
  }

  addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    this.tacheService.AddTache(this.taskname);
    console.log(this.tasks);
  }

  async updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    console.log("======= Je polle ======");
    let result = await this.tacheService.GetListeTache();
    //On recommence dans 0.5 seconde en rappelant la même méthode
    setTimeout(() => { this.updateTasks() }, 500);
  }
}
