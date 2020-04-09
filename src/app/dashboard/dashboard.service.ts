import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SpeechModelItem } from './speech/speech.model';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public mockDataSpeeches: Array<SpeechModelItem> = [
    { id: '1', subject: 'Platform', author: 'Ben Villanueva', createdttm: '01/02/2020', context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: '2', subject: 'Platform', author: 'Ben Villanueva', createdttm: '01/02/2020', context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: '3', subject: 'Platform', author: 'Ben Villanueva', createdttm: '01/02/2020', context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: '4', subject: 'Platform', author: 'Ben Villanueva', createdttm: '01/02/2020', context: 'Lorem ipsum'}
  ];

  public mockDataSharedToMembers: Array<any> = [
    { speechId: '1', members: ['johndoe@gmail.com','janedoe@gmail.com']}
  ];

  public mockTeamMembers: Array<any> = [
    { id: '1', email: 'johndoe@gmail.com', imageUrl: "../../../assets/images/team-1.jpeg"},
    { id: '2', email: 'janedoe@gmail.com', imageUrl: "../../../assets/images/team-2.jpeg"},
    { id: '3', email: 'thomasdoe@gmail.com', imageUrl: "../../../assets/images/team-3.jpeg"},
    { id: '4', email: 'maydoe@gmail.com', imageUrl: "../../../assets/images/team-4.jpeg"},
  ];
  

  response: any;
  currentIdSubject = new BehaviorSubject<any>(this.response);
  $currentId = this.currentIdSubject.asObservable();

  mockDataSubject = new BehaviorSubject<any>(this.mockDataSpeeches);
  $mockData = this.mockDataSubject.asObservable();

  mockDataSharedToMembersSubject = new BehaviorSubject<any>(this.mockDataSharedToMembers);
  $mockDataSharedToMembers = this.mockDataSharedToMembersSubject.asObservable();

  constructor() { }

  public getData(): Observable<any> {
    return of(this.mockDataSpeeches);
  }

  public getTeamMembers(): Observable<any> {
    return of(this.mockTeamMembers);
  }
  public insertData(data: SpeechModelItem) {
    if(!isNullOrUndefined(data)) {
      this.mockDataSpeeches.push(data);
      this.mockDataSubject.next(this.mockDataSpeeches);
    }
  };
  
  public updateData(data: SpeechModelItem) {
    if(!isNullOrUndefined(data)) {
      this.mockDataSpeeches.filter(v => v.id === data.id).map(v => {
        v.author = data.author;
        v.context = data.context;
        v.createdttm = data.createdttm;
        v.subject = data.subject;

        return v;
      });
      
      this.mockDataSubject.next(this.mockDataSpeeches);
    }
  };

  public deleteData(id: string) {
    if(!isNullOrUndefined(id)) {
      this.mockDataSpeeches = this.mockDataSpeeches.filter(v => v.id !== id);
      this.mockDataSubject.next(this.mockDataSpeeches);
    }
  };

  public filterData(filter: string) {
    if(filter !== '') {
      let filterSpeeches = this.mockDataSpeeches;
      filterSpeeches = filterSpeeches.filter(v => {
        if(v.author.indexOf(filter) > -1) {
          return v;
        }
        if(v.context.indexOf(filter) > -1) {
          return v;
        }
        if(v.createdttm.indexOf(filter) > -1) {
          return v;
        }
        if(v.subject.indexOf(filter) > -1) {
          return v;
        }
      });
      this.mockDataSubject.next(filterSpeeches);
    } else {
      this.mockDataSubject.next(this.mockDataSpeeches);
    }
  }

  formatDateBootstrap(value) {
    let retVal;
    if(value) {
      retVal = new Date(value.year, value.month-1, value.day);
      retVal = moment(retVal).format('MM/DD/YYYY');
    };

    return retVal;
  }
  
  shareSpeechToMember(id, member) {
    let searchSpeechId = this.mockDataSharedToMembers.filter(v => v.speechId === id);
    let filteredMock;
    if(searchSpeechId.length > 0) { // Sharing is already available
       filteredMock = this.mockDataSharedToMembers.filter(v => v.speechId === id).map(v => {
        v.members.push(member);
        return v;
      });
    } else {
      let model = { speechId: id, members: []};
      model.members.push(member);
      this.mockDataSharedToMembers.push(model);
      filteredMock = this.mockDataSharedToMembers;
    }
    this.mockDataSharedToMembersSubject.next(filteredMock);
  }

  deleteSharingToMember(speechId, member) {
    let filteredMock = this.mockDataSharedToMembers.filter(v => v.speechId === speechId).map(v => {
      let index = v.members.indexOf(member);
      if(index > -1) {
        v.members.splice(index, 1);
      }
      return v;
    });
    this.mockDataSharedToMembersSubject.next(filteredMock);
  }
}
