import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TransactionsService } from 'src/app/pages/shared/services/transactions.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  transactionId: any;
  transaction: any = {};
  isLoading: boolean;

  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.transaction = {};
    this.route.params.subscribe((params: Params) => {
      this.transactionId = params.id;
      this.getSingleTrans();
    });
  }

  getSingleTrans() {
    this.isLoading = true;
    this.transactionService.getSingleTransaction(this.transactionId).subscribe(
      (response) => {
        console.log('This is the transactions details', response);
        this.transaction = response.content[0];
        console.log('This is the transactions details', this.transaction);
        this.isLoading = false;
      },
      (error) => {
        console.log('this is the error', error);
        this.isLoading = false;
      }
    );
  }
}
