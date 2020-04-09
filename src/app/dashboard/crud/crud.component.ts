import { Component, OnInit, Type } from '@angular/core';
import { SpeechModelItem } from '../speech/speech.model';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { Guid } from "guid-typescript";
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { NgbdModalConfirmAutofocus, NgbdModalShare } from '../speech/speech.component';
import { fadeAnimation } from 'src/app/route.animation';

const MODALS: {[name: string]: Type<any>} = {
  autofocus: NgbdModalConfirmAutofocus,
  modalShare: NgbdModalShare
};

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  subscriptions = [];
  model:SpeechModelItem = new SpeechModelItem('','','','','');
  dateModel;
  submitted = false;
  timerStops = false;
  isCreateView = false;
  isUpdateView = false
  isDisplayView = false;
  headline;
  subtext;
  alertMessage;
  hasDateTransformed = false;
  hasData = false;
  modal: NgbdModalConfirmAutofocus;

  constructor(private datePipe: DatePipe, 
              private dashboardService: DashboardService,
              private router: Router,
              private modalService: NgbModal
              ) { }

  onSubmit() { 
    this.model.createdttm = this.dateModel;
    if(this.model.createdttm) {
      this.model.createdttm = this.dashboardService.formatDateBootstrap(this.dateModel);
      this.hasDateTransformed = true;
    }
    this.submitted = true;
    this.performOperations();
    this.setTimerForAlert();
  }

  performOperations() {
    if(!isNullOrUndefined(this.model.id) && this.model.id !== '') { // Update Operations
      this.dashboardService.updateData(this.model);
      this.alertMessage = 'You have successfully updated your speech.';
    } else { // Add Operation
      this.model.id = Guid.create().toString();
      this.dashboardService.insertData(this.model);
      this.alertMessage = 'You have successfully created a speech.';
    }
  }

  deleteSpeech() {
    if(!isNullOrUndefined(this.model)) {
      const modalRef = this.modalService.open(MODALS['autofocus']);
      if(this.model.createdttm) {
        this.model.createdttm = this.dashboardService.formatDateBootstrap(this.model.createdttm);
      }
      modalRef.componentInstance.model = this.model;
    }
  }

  shareSpeech() {
    if(!isNullOrUndefined(this.model)) {
      const modalRef = this.modalService.open(MODALS['modalShare']);
      modalRef.componentInstance.model = this.model;
    }
  }

  setTimerForAlert() {
    setTimeout(() => {
      this.timerStops = true;
      this.router.navigateByUrl('/dashboard');
    }, 2000);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dashboardService.$currentId.subscribe(id => {
        if(!isNullOrUndefined(id)) {
          this.subscriptions.push(
            this.dashboardService.$mockData.subscribe((res:Array<SpeechModelItem>) => {
              if(!isNullOrUndefined(res)) {
                this.model = res.filter(v => v.id === id).map(v => {
                  let newDate = new Date(v.createdttm);
                  let dtFormat = { day: newDate.getDate(), month: newDate.getUTCMonth() + 1, year: newDate.getUTCFullYear()};
                  this.dateModel = new NgbDate(dtFormat.year, dtFormat.month, dtFormat.day); 
                  v.createdttm = this.dateModel;
                  return v;
                })[0];
      
                this.hasData = true;
              }
            })
          )
        }
      })
    );

    this.processDisplay(this.router.url, this.hasData);
  }

  processDisplay(url, hasData) {
    this.isCreateView = false;
    this.isDisplayView = false;
    this.isUpdateView = false;
    if(url.indexOf('view') > 0 && hasData) {
      this.isDisplayView = true;
      this.headline = 'Display Speech';
      this.subtext = 'Goodluck with your speech candidate. May you encourage them.';
    } else if(url.indexOf('update') > 0 && hasData) {
      this.isUpdateView = true;
      this.headline = 'Update your Speech';
      this.subtext = 'Carefully update each input and may you encourage them with your words.';
    } else if(url.indexOf('create') > 0) {
      this.isCreateView = true;
      this.headline = 'Create Speech';
      this.subtext = 'Start creating your speech and kindly fill the needed inputs. You will encourage them with this.';
    } else {
      this.ngOnDestroy();
    }
  }

  ngOnDestroy(): void {
    if(!isNullOrUndefined(this.model) && !this.hasDateTransformed) {
      this.model.createdttm = this.dateModel;
      this.model.createdttm = this.dashboardService.formatDateBootstrap(this.model.createdttm);
    }
    this.router.navigateByUrl('/dashboard');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
