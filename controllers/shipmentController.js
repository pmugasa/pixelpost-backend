const shippo = require("shippo")(process.env.SHIPPO_KEY);

const address_from = {
  name: "Peterson Mugasa",
  company: "PixelPost",
  street1: "18 Redcliff close",
  city: "Cape Town",
  zip: "7441",
  country: "ZA",
  email: "pmugasa78@gmail.com",
  phoneNumber: "0746888479",
};

//creating a shipment, and getting rates
const create_shipment = async (req, res) => {
  const body = req.body;

  //address object
  const address_to = {
    name: body.address.fullName,
    company: body.address.company,
    street1: body.address.street1,
    city: body.address.city,
    zip: body.zip.zip,
    country: body.country,
    email: body.address.email,
    phoneNumber: body.address.phoneNumber,
  };

  //parcel to be shipped -> this is entered by the admin
  const parcel = body.parcel;

  //customs declaration
  const customsDeclaration = {
    contents_type: "MERCHANDISE",
    contents_explanation: body.customsItems[0].description,
    non_delivery_option: "RETURN",
    certify: true,
    certify_signer: body.address.fullName,
    items: body.customsItems,
  };

  //create shipment object
  shippo.shipment.create(
    {
      address_from: address_from,
      address_to: address_to,
      parcels: [parcel],
      customs_declaration: customsDeclaration,
      async: false,
    },
    function (error, shipment) {
      console.log("ERROR", error);
      console.log("SHIPMENT", shipment);
    }
  );
  //grabbing rates from the response
  let rates = shipment.rates;

  //sending rates to the client
  res.status(201).json({
    rates,
  });
};

//getting rates from the homepage
const get_rates = async (req, res) => {};

//purchase shipping label
const purchase_label = async (req, res) => {
  let rate = body.selectedRate;

  //purchase the desired rate
  shippo.transaction.create(
    {
      rate: rate.object_id,
      label_file_type: "PDF",
      async: false,
    },
    function (err, transaction) {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("TRANSACTION", transaction);
      }
    }
  );
};
