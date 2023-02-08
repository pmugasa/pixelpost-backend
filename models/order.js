const mongoose = require("mongoose");

const OrderStatus = Object.freeze({
  PACKING: "PACKING",
  READY_FOR_PAYMENT: "READY_FOR_PAYMENT",
  SHIPPING_SOON: "SHIPPING_SOON",
  SHIPPED: "SHIPPED",
});

const orderSchemam = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  parcel: {
    length: {
      type: Number,
      required: true,
      min: [0, "Parcel length must be a positive number."],
    },
    width: {
      type: Number,
      required: true,
      min: [0, "Parcel width must be a positive number."],
    },
    height: {
      type: Number,
      required: true,
      min: [0, "Parcel height must be a positive number."],
    },
    weight: {
      type: Number,
      required: true,
      min: [0, "Parcel weight must be a positive number."],
    },
  },

  address: {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    street1: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },
  },

  customsInformation: {
    contentsType: String,
    contentsExplanation: String,
    nonDeliveryOption: String,
    certify: Boolean,
    certifySigner: String,
    customsItems: [
      {
        itemDescription: {
          type: String,
          required: true,
        },
        itemQuantity: {
          type: Number,
          required: true,
        },
        itemValue: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  selectedAddons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addons",
      required: true,
    },
  ],

  selectedCarrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrier",
    required: true,
  },

  shippingCost: {
    type: Number,
    required: true,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PACKING,
    required: true,
  },
});
