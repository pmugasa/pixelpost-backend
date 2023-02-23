const mongoose = require("mongoose");

const OrderStatus = Object.freeze({
  PACKING: "PACKING",
  READY_FOR_PAYMENT: "READY_FOR_PAYMENT",
  SHIPPING_SOON: "SHIPPING_SOON",
  SHIPPED: "SHIPPED",
});

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  parcel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parcel",
  },

  address: {
    fullName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    street1: {
      type: String,
      required: false,
    },
    street2: {
      type: String,
    },
    city: {
      type: String,
      required: false,
    },

    postalCode: {
      type: String,
      required: false,
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
      required: false,
    },
  ],

  selectedCarrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrier",
    required: false,
  },

  shippingCost: {
    type: Number,
    required: false,
  },

  totalCost: {
    type: Number,
    required: false,
  },

  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PACKING,
    required: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
