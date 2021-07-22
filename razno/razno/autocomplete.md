<mat-autocomplete #auto= matAutocomplete>
<mat-option *ngFor="let option of ponudes" [value]="option.nazivPonudjaca">

             {{option.nazivPonudjaca}}
            </mat-option>
          </mat-autocomplete>
