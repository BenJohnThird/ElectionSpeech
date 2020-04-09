import { Component, OnInit, Type, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { SpeechModelItem } from './speech.model';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeAnimation } from 'src/app/route.animation';

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Speech deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"{{model.subject}}"</span> speech?</strong></p>
    <hr>
    <p><small>Created On: {{model.createdttm}}</small></p>
    <p><small>Created By: {{model.author}}</small></p>
    <hr>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="deleteConfirm()">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal,
            private dashboardService: DashboardService,
            private router: Router) {}

  @Input() public model: SpeechModelItem;

  deleteConfirm() {
    this.dashboardService.deleteData(this.model.id);
    this.modal.close('Ok click');
    this.router.navigateByUrl('/dashboard');
  }
}

@Component({
  selector: 'ngbd-modal-share',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Share speech to the team</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Member</th>
          <th scope="col">Function</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of teamModel">
          <td scope="row">{{item}}</td>
          <td>
            <button (click)="deleteSharingtoMember(item)"  class="btn btn-danger">
              <img src="../../../assets/images/icons8-delete-bin-24.png" placement="left" ngbTooltip="Delete"> 
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <select class="form-control" [(ngModel)]="selectedMember">
              <option *ngFor="let team of teamList">{{team}}</option>
            </select>
          </th>
          <td>
            <button (click)="addSharingToMember()" class="btn btn-primary">
             <img src="../../../assets/images/icons8-edit-24.png"
             placement="left" ngbTooltip="Add"> 
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.dismiss('ok')">Ok</button>
  </div>
  `
})
export class NgbdModalShare {
  constructor(public modal: NgbActiveModal,
            private dashboardService: DashboardService,
            private router: Router) {}

  @Input() public model: SpeechModelItem;
  private subscriptions = [];
  public teamModel: any;
  public teamList: Array<string>;
  public selectedMember;

  ngOnInit(): void {
    this.subscriptions.push(
      this.dashboardService.getTeamMembers().subscribe(res => {
        this.teamList = res.map(v => v.email);
      })
    );

    this.subscriptions.push(
      this.dashboardService.$mockDataSharedToMembers.subscribe((res:Array<any>) => {
        if(!isNullOrUndefined(res) && res.length > -1) {
          this.teamModel = res.filter(v => v.speechId === this.model.id).map(v => v.members)[0];
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  addSharingToMember() {
    this.dashboardService.shareSpeechToMember(this.model.id, this.selectedMember);
  }

  deleteSharingtoMember(memberName) {
    this.dashboardService.deleteSharingToMember(this.model.id, memberName);
  }
}

const MODALS: {[name: string]: Type<any>} = {
  autofocus: NgbdModalConfirmAutofocus,
  modalShare: NgbdModalShare
};

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit {

  subscriptions = [];
  filterModel: string;
  public speechesArray: Array<SpeechModelItem>;
  constructor(private dashboardService: DashboardService, 
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dashboardService.$mockData.subscribe((res:Array<SpeechModelItem>) => {
        if(res) {
          let valueArray = res.map(v => {
            if(typeof v.createdttm === 'object') {
              v.createdttm = this.dashboardService.formatDateBootstrap(v.createdttm);
            }
            return v;
          });

          this.speechesArray = res;
        }
      })
    );
  }

  createSpeech() {
    this.dashboardService.currentIdSubject.next(null);
    this.router.navigateByUrl('/dashboard/create');
  }

  viewSpeech(id) {
    if(!isNullOrUndefined(id)) {
      this.dashboardService.currentIdSubject.next(id);
      this.router.navigateByUrl('/dashboard/view');
    }
  }

  updateSpeech(id) {
    if(!isNullOrUndefined(id)) {
      this.dashboardService.currentIdSubject.next(id);
      this.router.navigateByUrl('/dashboard/update');
    }
  }

  deleteSpeech(data) {
    if(!isNullOrUndefined(data)) {
      const modalRef = this.modalService.open(MODALS['autofocus']);
      modalRef.componentInstance.model = data;
    }
  }

  shareSpeech(data) {
    if(!isNullOrUndefined(data)) {
      const modalRef = this.modalService.open(MODALS['modalShare']);
      modalRef.componentInstance.model = data;
    }
  }

  filterSpeech() {
    this.dashboardService.filterData(this.filterModel);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
