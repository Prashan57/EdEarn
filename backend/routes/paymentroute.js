import { Router } from "express";
import axios from "axios";
import request from "request";
const paymentRouter = Router();

const payKhalti = (req, res) => {
  var options = {
    method: "POST",
    url: "https://a.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: "key 6b076707efa84413bd088646701ba5c4",
      "Content-Type": "application/json",
    },

    //putting required data is remaining

    body: JSON.stringify({
      return_url: "http://example.com/",
      website_url: "https://example.com/",
      amount: "1000",
      purchase_order_id: "Order01",
      purchase_order_name: "test",
      customer_info: {
        name: "Ram Bahadur",
        email: "test@khalti.com",
        phone: "9800000001",
      },
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    const responseData = JSON.parse(response.body);
    if (responseData.pidx) {
      console.log("success ");
    } else {
      console.log("fail");
    }
    return res.json(responseData);
  });
};
paymentRouter.get("/payment", payKhalti);

export default paymentRouter;
