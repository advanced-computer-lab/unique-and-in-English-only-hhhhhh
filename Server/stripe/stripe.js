const StripeModule = require('stripe')('sk_test_51K9UegHIfMEdH3Ly57sMBqK371yyzEQDPhJMH5OzQuSxNS2bHZeT5NmKwbARtAbnWKfAwVTveThrBQPqTMfwyYfU009WIdQbc7');
module.exports = {
    //create a token function
    _createToken : function(req,res){
        var card={
          number:req.number,
          exp_month: req.exp_month,
          exp_year:req.exp_year,
          cvc:req.cvc
        };
        StripeModule.tokens.create({card},function(err,data){
            res(err,data);
        });
    },
    _createCharge : function(req,res){
        var charge ={
            amount: req.amount * 100,
            currency: req.currency,
            source: req.token,
            description: req.description,
            shipping:{
                address:{
                    line1:"chennai", //static for testing
                    city:"Cairo",
                    country:"Egypt" ,
                    postal_code: "932194",
                    state:"CAI"
                },
                name:"Ali Helmy" //static for testing
            }
        };
        StripeModule.charges.create(charge,function(err,data){
            res(err,data);
        })
    },
    _createRefund : function(req,res){
        var refund={
            charge:req.charge
        }
        StripeModule.refunds.create(refund,function(err,data){
            res(err,data);
        })
    },
    _listCharges : function(req,res){
        var charges ={
            limit:req.limit
        }
        StripeModule.charges.list(charges,function(err,data){
            res(err,data);
        })
    }
    
}