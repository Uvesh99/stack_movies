const Payment=require('../models/Payment');

//Adding a payment
exports.addPayment= async(req,res)=>{
    try{
        const newPayment = new Payment(req.body);
        const savedPayment=await newPayment.save();
        res.status(201).json(savedPayment);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
}

//Update an existing payment
exports.updatePayment=async(req, res)=>{
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPayment);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

//Delete a Payment
exports.deletePayment = async (req, res) => {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

//Get All Payments

exports.getPayments = async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //Get a single Payment
  exports.getPayment = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      res.status(200).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  