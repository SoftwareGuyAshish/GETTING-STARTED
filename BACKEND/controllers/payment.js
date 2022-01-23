const braintree = require("braintree");
const { Result } = require("express-validator");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "c8vsppqhwq5nht9y",
  publicKey: "jq59jwc2mds43skh",
  privateKey: "fafa1ad67070be8be8778cbea2eeb800",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
