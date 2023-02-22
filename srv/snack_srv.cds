using demo.snack from '../db/snack';
service snackService {
entity Snack as projection on snack.Snack;
entity Snack_Status as projection on snack.Snack_Status;
entity Snack_Category as projection on snack.Snack_Category
}
