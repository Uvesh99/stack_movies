const express=require('express')
const {addPayment,updatePayment,deletePayment ,getPayments, getPayment}=require("../controllers/payment.js")
const router=express.Router();

router.post("/",addPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment );
router.get('/', getPayments);
router.get('/:id', getPayment);

module.exports=router;