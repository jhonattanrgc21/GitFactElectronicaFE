import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
  } from "@angular/core";
  import { Subscription } from "rxjs";
  import { RecipientsBillService } from "src/app/services/recipients-bill-service";
  import { PublicServiceReceipts } from "../../recipients-bill.component";
  
  @Component({
    selector: "app-reject-message-modal",
    templateUrl: "./reject-message-modal.component.html",
    styleUrls: ["./reject-message-modal.component.css"],
  })
  export class RejectionMessageModalComponent implements OnInit, OnDestroy {
    @Output() public closeRejectionModal: EventEmitter<boolean>;
    @Input() public selectedReceipt: PublicServiceReceipts;
    public message: string;
    public subscriptions: Subscription;
  
    constructor(private RecipientsBillService: RecipientsBillService) {
      this.closeRejectionModal = new EventEmitter<boolean>();
      this.subscriptions = new Subscription();
    }
  
    ngOnInit() {
      this.subscriptions.add(this.handleRejectionMessageErrorSubscription());
      this.subscriptions.add(this.handleRejectionMessageSuccessSubscription());
      this.RecipientsBillService.getRejectionMessage(
        this.selectedReceipt.consecutiveNumber
      );
    }
  
    public handleRejectionMessageErrorSubscription(): Subscription {
      return this.RecipientsBillService.rejectionMessageError$.subscribe(
        (error: boolean) => {
          if (error) {
            console.log("Surgio un error.....");
          }
        }
      );
    }
  
    public handleRejectionMessageSuccessSubscription(): Subscription {
      return this.RecipientsBillService.rejectionMessageSuccess$.subscribe(
        (success: string) => {
          this.message = success;
        }
      );
    }
  
    public closeRejectionMessageModal(): void {
      this.closeRejectionModal.emit();
    }
  
    public ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }
  }
  