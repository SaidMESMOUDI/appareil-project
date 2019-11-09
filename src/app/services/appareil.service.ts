import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [
    /*{id: 0, name: 'Machine à laver', status: 'éteint'},
    {id: 1, name: 'Télévision', status: 'allumé'},
    {id: 2, name: 'Ordinateur', status: 'éteint'},
    {id: 3, name: 'Four/Micro-ondes', status: 'allumé'}*/
  ];

  constructor(private httpClient: HttpClient) { }

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }
  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }
  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string){
    const appareilObject = { id: 0, name: '', status: '' };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient.put('https://http-client-demo-2930.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (err) => {
          console.log('Erreur de sauvegarde ! ' + err);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient.get<any[]>('https://http-client-demo-2930.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          console.log('Récupération des données terminée !');
          this.emitAppareilSubject();
        },
        (err) => {
          console.log('Erreur de chargement des données ! ' + err);
        }
      );
  }
}
