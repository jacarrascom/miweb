import {Component, Input} from "@angular/core";
// import {NgbActiveModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Solicitud Completa</h4>
<!--      <button type="button" class="close" aria-label="Close" (click)="close()">-->
        <span aria-hidden="true">&times;</span>
<!--      </button>-->
    </div>
    <div class="modal-body">
      <p> - Tu solicitud se realizo de manera correcta. <br/>
        - Se pondran en contacto con usted para completar su solicitud.</p>
    </div>
    <div class="modal-footer">
<!--      <button type="button" class="btn btn-outline-dark" (click)="close()">Cerrar</button>-->
    </div>
  `
})
export class ModalSignupComponent {

  // constructor(config: NgbModalConfig, public activeModal: NgbActiveModal) {
  //   config.backdrop = 'static';
  //   config.keyboard = false;
  // }
  //
  // close() {
  //   console.log("close")
  //   this.activeModal.close('Close click');
  //   this.activeModal.dismiss('Cross click')
  //   window.location.reload()
  // }
}
