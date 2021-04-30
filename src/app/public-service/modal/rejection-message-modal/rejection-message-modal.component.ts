import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { PublicServiceServiceService } from "src/app/services/public-service-service.service";
import { PublicServiceReceipts } from "../../public-service.component";

@Component({
  selector: "app-rejection-message-modal",
  templateUrl: "./rejection-message-modal.component.html",
  styleUrls: ["./rejection-message-modal.component.css"],
})
export class RejectionMessageModalComponent implements OnInit, OnDestroy {
  @Output() public closeRejectionModal: EventEmitter<boolean>;
  @Input() public selectedReceipt: PublicServiceReceipts;
  public message: string;
  public subscriptions: Subscription;

  constructor(private publicServiceService: PublicServiceServiceService) {
    this.closeRejectionModal = new EventEmitter<boolean>();
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.subscriptions.add(this.handleRejectionMessageErrorSubscription());
    this.subscriptions.add(this.handleRejectionMessageSuccessSubscription());
    this.publicServiceService.getRejectionMessage(
      this.selectedReceipt.consecutiveNumber
    );
  }

  public handleRejectionMessageErrorSubscription(): Subscription {
    return this.publicServiceService.rejectionMessageError$.subscribe(
      (error: boolean) => {
        if (error) {
          console.log("Surgio un error.....");
        }
      }
    );
  }

  public handleRejectionMessageSuccessSubscription(): Subscription {
    return this.publicServiceService.rejectionMessageSuccess$.subscribe(
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
