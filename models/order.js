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

  customsInformation: [
    {
      itemDescription: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],

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
