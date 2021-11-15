
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "API Lyko",
      "description": "#\n\nLyko's API provide a bright new way to improive mobility services.\n\nBy designing simple API, Lyko allow you to quickly and easily search itineraries, compare, book and pay reservation on a single platform, providing day after day new transports services.\n\n## Authentication\n\nThe access to Lyko's API is protected by a private API key. If you want access to these resources, please contact Lyko by visiting [https://lyko.tech](https://lyko.tech).\n\nTo authenticate you and protect your datas, you have to send your API key for each requests you send, by sending your API key in an HTTP Header named *'X-Api-Key'*\n\n```bash\ncurl -X GET https://api.lyko.tech/v1/addresses?text=Paris -H 'X-Api-Key: my_api_key'\n# of course, where my_api_key is your own API key.\n```\n\n## Here are somes steps for a quick start guide.\n\n<details>\n\n<summary>Click to expand</summary>\n\n### Address search\n\nMake a *GET /v1/addresses* to find the best departure and arrival address for your search.\n\n### itineraries search\n\nMake a *GET /v1/itineraries* to retrieve all matching itineraries. Each itinerary is compounds with one or many legs, and each legs correspond to each transports mode and differents connections.\n\n### Customer informations\n\nIf no customer exists for your user, you have to create a new one. To do that, make a *POST /v1/customers*, and store the customer unique identifier on your side for future reservations.\n\n### Booking\n\nOnce you have a customer identifier (already stored or just created), you can process the booking by making a call to *POST /v1/customers/{customerId}/reservations*.\nThis call need information about the card used for the payment. To send correct informations, please refer to the section below.\n\n</details>\n\n## Card creation\n\nIn order to book an itinerary, you must first get card informations from your customer.\n\n*Keep in mind that card informations like number or expiration date must not transit on your server.*\n\nTo ensure that no sensitive card data touches your server, and allows your integration to operate in a PCI-compliant way, we recommand using the flow described here.\n\nTo create a new card token, you must first create e new Payment Methods from Stripe.\nWe provide a simple Javascript library to help you manage this. This tools can be include in any website by calling */v1/card.js?apiKey=my_api_key*.\nHere is a quick start exemple to create a new Payment Method.\n\n<details>\n\n<summary>Click to expand</summary>\n\n### HTML\n\n```html\n    <html>\n        <head>\n            <script type=\"text/javascript\" src=\"/v1/card.js?apiKey=my_api_key\"></script>\n        </head>\n        <body>\n            <div id=\"container\">\n                <div id=\"card-form\"></div>\n                <div id=\"card-errors\" role=\"alert\"></div>\n                <button onclick=\"submit()\">Submit</button>\n            </div>\n        </body>\n    </html>\n```\n\n#### CSS\n\n```css\n    #container {\n        max-width: 300px;\n        margin: 20px auto;\n        display: flex;\n        flex-direction: column;\n    }\n    #card-form {\n        margin: 10px;\n    }\n    #card-errors {\n        color: rgb(168, 23, 23);\n    }\n```\n\n#### JS\n\n```javascript\n    var lykoCard = new LykoCard();\n    lykoCard.load(() => {\n        lykoCard.createCardForm({\n            selector: '#card-form',\n            errorSelector: '#card-errors',\n            style\n            : {\n                base: {\n                    color: '#32325d',\n                },\n                invalid: {\n                    color: '#fa755a',\n                    iconColor: '#fa755a'\n                }\n            }\n        });\n    });\n    function submit() {\n        lykoCard.processCardForm(function (error, cardToken) {\n            console.log(cardToken);\n        });\n    }\n```\n\nYou can of course customize every elements in the form created, by adding your custom configuration.\nTo find more informations about customization and parameters, please [check Stripe documentation here](https://stripe.com/docs/stripe-js/reference#element-options).\n\n</details>\n\n## Error codes\n\nAll possible error code are available and described in the *GET /v1/error* call.\n",
      "version": "v1",
      "contact": {
        "name": "Lyko",
        "url": "https://lyko.tech",
        "email": "hello@lyko.tech"
      }
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "apiKey": {
          "type": "apiKey",
          "in": "header",
          "name": "X-Api-Key"
        }
      },
      "schemas": {
        "Location": {
          "type": "object",
          "properties": {
            "lat": {
              "type": "number",
              "description": "Latidude GPS coordinate."
            },
            "lng": {
              "type": "number",
              "description": "Longitude GPS coordinate."
            }
          },
          "required": [
            "lat",
            "lng"
          ]
        },
        "Address": {
          "type": "object",
          "properties": {
            "location": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Location"
                },
                {
                  "description": "GPS coordinates.",
                  "example": {
                    "lat": 48.868714,
                    "lng": 2.351026
                  }
                }
              ]
            },
            "name": {
              "type": "string",
              "description": "Full name of address.",
              "example": "12 Rue Sainte-Foy, 75002 Paris, France"
            },
            "number": {
              "type": "string",
              "description": "Number of the street.",
              "example": "12"
            },
            "street": {
              "type": "string",
              "description": "Name of the street.",
              "example": "Rue Sainte-Foy"
            },
            "city": {
              "type": "string",
              "description": "City of address.",
              "example": "Paris"
            },
            "postal": {
              "type": "string",
              "description": "Postal code of address.",
              "example": "75002"
            },
            "country": {
              "type": "string",
              "description": "Country of address.",
              "example": "France"
            }
          },
          "required": [
            "location",
            "name",
            "number",
            "street",
            "city",
            "postal",
            "country"
          ]
        },
        "Point": {
          "type": "object",
          "properties": {
            "lat": {
              "type": "number",
              "description": "Latitude GPS coordinate."
            },
            "lng": {
              "type": "number",
              "description": "Longitude GPS coordinate."
            }
          },
          "required": [
            "lat",
            "lng"
          ]
        },
        "Parking": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Parking's id"
            },
            "nodeId": {
              "type": "string",
              "description": "Node of the parking."
            },
            "name": {
              "type": "string",
              "description": "Parking's name"
            },
            "location": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Point"
                },
                {
                  "description": "GPS coordinates."
                }
              ]
            },
            "type": {
              "type": "string"
            },
            "parkRide": {
              "type": "boolean"
            },
            "fee": {
              "type": "boolean"
            },
            "supervised": {
              "type": "boolean"
            },
            "capacity": {
              "type": "number",
              "description": "Maximum parking capacity."
            },
            "maxStay": {
              "type": "number"
            },
            "publicAccess": {
              "type": "boolean"
            },
            "address": {
              "type": "string",
              "description": "Name of parking address."
            }
          },
          "required": [
            "id",
            "nodeId",
            "name",
            "location",
            "type",
            "parkRide",
            "fee",
            "supervised",
            "capacity",
            "maxStay",
            "publicAccess",
            "address"
          ]
        },
        "Stop": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Stop's id"
            },
            "name": {
              "type": "string",
              "description": "Address name."
            },
            "date": {
              "format": "date-time",
              "type": "string",
              "description": "Estimated date and time."
            },
            "location": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Point"
                },
                {
                  "description": "GPS coordinates."
                }
              ]
            },
            "parkings": {
              "description": "Parking list at this location",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Parking"
              }
            }
          },
          "required": [
            "id",
            "name",
            "date",
            "location",
            "parkings"
          ]
        },
        "CostAge": {
          "type": "object",
          "properties": {
            "min": {
              "type": "number",
              "description": "Minimum age."
            },
            "max": {
              "type": "number",
              "description": "Maximum age."
            }
          },
          "required": [
            "min",
            "max"
          ]
        },
        "CostPassenger": {
          "type": "object",
          "properties": {
            "age": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/CostAge"
                },
                {
                  "description": "Age range for this price."
                }
              ]
            },
            "costs": {
              "type": "number",
              "description": "Price."
            }
          },
          "required": [
            "age",
            "costs"
          ]
        },
        "LegCost": {
          "type": "object",
          "properties": {
            "isEstimated": {
              "type": "boolean",
              "description": "Price estimate. The price can change at the end of the trip (deviation during the ride, additional waiting time etc.)."
            },
            "fixed": {
              "type": "number",
              "description": "Fixed price for the ride."
            },
            "passenger": {
              "description": "Fixed price per passenger for the ride.",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CostPassenger"
              }
            },
            "final": {
              "type": "number",
              "description": "Final price after ride."
            }
          },
          "required": [
            "isEstimated",
            "fixed",
            "passenger",
            "final"
          ]
        },
        "OperatorService": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Id of service. Will be used during the reservation in the property \"services\" in order to make a reservation on this operator."
            },
            "operator": {
              "type": "string",
              "description": "Operator name."
            },
            "icon": {
              "type": "string",
              "description": "Icon of the operator encoded in base64."
            },
            "name": {
              "type": "string",
              "description": "Label of the operator."
            },
            "duration": {
              "type": "number",
              "description": "Duration (in seconds) of the step."
            },
            "distance": {
              "type": "number",
              "description": "Distance (in meters) of the step."
            },
            "polyline": {
              "type": "string",
              "description": "Polyline encoded to display the step on a map."
            },
            "maxPassengers": {
              "type": "number",
              "description": "Maximum number of passengers handled by this operator for this step."
            },
            "costs": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/LegCost"
                },
                {
                  "description": "Operator's price for this step."
                }
              ]
            },
            "option": {
              "type": "object",
              "description": "Option proposed by the operator for this step."
            },
            "expireAt": {
              "type": "string",
              "format": "date-time",
              "description": "Date and time at which the step journey estimate for this operator expires."
            }
          },
          "required": [
            "id",
            "operator",
            "icon",
            "name",
            "duration",
            "distance",
            "polyline",
            "maxPassengers",
            "costs",
            "expireAt"
          ]
        },
        "Leg": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Type leg (TRANSIT | ROUTE)."
            },
            "mode": {
              "type": "string",
              "description": "Transport mode."
            },
            "polyline": {
              "type": "string",
              "description": "Polyline encoded to display the step on a map."
            },
            "distance": {
              "type": "number",
              "description": "Distance of the step."
            },
            "origin": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Stop"
                },
                {
                  "description": "Departure point."
                }
              ]
            },
            "destination": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Stop"
                },
                {
                  "description": "Arrival point."
                }
              ]
            },
            "co2": {
              "type": "number",
              "description": "CO2 consumption."
            },
            "services": {
              "description": "List of private operators who can perform this step.",
              "nullable": true,
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/OperatorService"
              }
            }
          },
          "required": [
            "type",
            "mode",
            "polyline",
            "distance",
            "origin",
            "destination",
            "co2"
          ]
        },
        "Journey": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Search identifier. This id will be used for the reservation.",
              "example": "5b69c0ae-ea4f-49e0-b0f4-2714e7ef55d4"
            },
            "origin": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Stop"
                },
                {
                  "description": "Starting point.",
                  "example": {
                    "id": null,
                    "name": null,
                    "date": "2020-11-16T06:00:41.000Z",
                    "location": {
                      "lat": 48.868714,
                      "lng": 2.351026
                    },
                    "parkings": []
                  }
                }
              ]
            },
            "destination": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Stop"
                },
                {
                  "description": "Arrival point.",
                  "example": {
                    "id": null,
                    "name": null,
                    "date": "2020-11-16T06:29:01.000Z",
                    "location": {
                      "lat": 48.858508,
                      "lng": 2.294782
                    },
                    "parkings": []
                  }
                }
              ]
            },
            "legs": {
              "description": "Stages of travel likely containing one or more modes of transport/services.",
              "example": [
                {
                  "origin": {
                    "id": null,
                    "name": "16, Rue Sainte-Foy, Paris, France",
                    "date": "2020-11-16T06:00:41.000Z",
                    "location": {
                      "lat": 48.868714,
                      "lng": 2.351026
                    },
                    "parkings": []
                  },
                  "destination": {
                    "id": null,
                    "name": "4, Place Saint-Michel, Paris, France",
                    "date": "2020-11-16T06:12:00.000Z",
                    "location": {
                      "lat": 48.853483,
                      "lng": 2.34386
                    },
                    "parkings": []
                  },
                  "co2": 0,
                  "distance": 2167,
                  "mode": "BIKE",
                  "polyline": "mtgiH}djM_@{B?G?GEo@?S?WKE@OLcAb@{E@Ox@`@f@Tv@\\t@^d@TpAj@~CxAhEnBvCpADHJD@?BA\\PzCxA~Ar@|At@vAl@DBFBpCpAv@`@jAh@bBt@jBz@nDbBPHDBFBCLg@xBELJDH@BD|@LDHp@LF?RMVLt@^FBD@D@TCHe@PJpDjB@@HDNF~@f@f@\\BBRNVPBBFDDBBBx@x@jBhBLPLNBBf@j@`@d@BBHFDFLXb@~@?@DHFGAAAE",
                  "type": "ROUTE",
                  "services": []
                },
                {
                  "origin": {
                    "id": "s_SNCF_Transilien Open Data_1_993",
                    "name": "ST MICHEL ND RER C",
                    "date": "2020-11-16T06:12:00.000Z",
                    "location": {
                      "lat": 48.853483,
                      "lng": 2.34386
                    },
                    "parkings": []
                  },
                  "destination": {
                    "id": "s_SNCF_Transilien Open Data_1_989",
                    "name": "CHAMP DE MARS TOUR EIFFEL",
                    "date": "2020-11-16T06:22:00.000Z",
                    "location": {
                      "lat": 48.855909,
                      "lng": 2.28968
                    },
                    "parkings": []
                  },
                  "co2": 45,
                  "distance": 4458,
                  "mode": "TRANSIT_TRAIN",
                  "polyline": "gudiHcxhM_l@`qB{LfhAhDtjAje@rjA",
                  "type": "TRANSIT",
                  "services": []
                },
                {
                  "origin": {
                    "id": null,
                    "name": "99, Quai Branly, Paris, France",
                    "date": "2020-11-16T06:22:00.000Z",
                    "location": {
                      "lat": 48.855909,
                      "lng": 2.28968
                    },
                    "parkings": []
                  },
                  "destination": {
                    "id": null,
                    "name": "5, Avenue Gustave Eiffel, Paris, France",
                    "date": "2020-11-16T06:29:01.000Z",
                    "location": {
                      "lat": 48.858508,
                      "lng": 2.294782
                    },
                    "parkings": []
                  },
                  "co2": 0,
                  "distance": 549,
                  "mode": "FOOT",
                  "polyline": "kdeiH_f~LiAYm@SSIKGq@a@QQYYMOQWYm@KUUaAq@oANYu@oAOQb@y@AGEMACGCAYCe@?W@gAUc@Do@Ai@{@wAQE",
                  "type": "ROUTE",
                  "services": []
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Leg"
              }
            },
            "co2": {
              "type": "number",
              "description": "CO2 consumption..",
              "example": 45
            }
          },
          "required": [
            "id",
            "origin",
            "destination",
            "legs",
            "co2"
          ]
        },
        "ReservationCost": {
          "type": "object",
          "properties": {
            "estimated": {
              "type": "boolean",
              "description": "If the price has been estimated."
            },
            "total": {
              "type": "number",
              "description": "Total price."
            }
          },
          "required": [
            "estimated",
            "total"
          ]
        },
        "ReservationCancelation": {
          "type": "object",
          "properties": {
            "canceledAt": {
              "type": "string",
              "format": "date-time",
              "example": "2020-03-16 17:05:27.012Z"
            },
            "costs": {
              "type": "string",
              "description": "Reservation's price in cents.",
              "example": 2600
            }
          }
        },
        "Reservation": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Reservation Id",
              "example": "61074ba1-ec9d-4cde-8109-78cc6da3ad27"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "Creation date.",
              "example": "2020-10-23T14:04:33.102Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "Updated date.",
              "example": "2020-10-23T14:04:33.102Z"
            },
            "journey": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/Journey"
                },
                {
                  "description": "Detail of the journey.",
                  "example": {
                    "origin": {
                      "id": null,
                      "name": null,
                      "date": "2020-11-16T06:00:00.000Z",
                      "location": {
                        "lat": 45.164,
                        "lng": 6.4273
                      },
                      "parkings": []
                    },
                    "destination": {
                      "id": null,
                      "name": null,
                      "date": "2020-11-16T06:19:01.000Z",
                      "location": {
                        "lat": 45.2173,
                        "lng": 6.4716
                      },
                      "parkings": []
                    },
                    "co2": 3411,
                    "legs": [
                      {
                        "origin": {
                          "id": null,
                          "name": "Rue du Praz, Valloire, France",
                          "date": "2020-11-16T06:00:00.000Z",
                          "location": {
                            "lat": 45.164,
                            "lng": 6.4273
                          },
                          "parkings": []
                        },
                        "destination": {
                          "id": null,
                          "name": "Rue du Général Ferrié, Saint-Michel-de-Maurienne, France",
                          "date": "2020-11-16T06:19:01.000Z",
                          "location": {
                            "lat": 45.2173,
                            "lng": 6.4716
                          },
                          "parkings": []
                        },
                        "co2": 3411,
                        "distance": 17673,
                        "mode": "CAR",
                        "polyline": "_btrGsiff@M@I@?GAg@CsBAiBCqF?e@[?a@?G?Y?a@@a@B_BB?k@Dk@Da@l@oEBUH?FEBG?IAGCGCCC?I@CDOMu@m@cAi@y@c@_Ao@OMU_@MYQe@IUGKSWg@k@k@a@m@_@c@U_@Eg@BU?c@Ew@Qc@Mu@[[GQ?UBYJaAz@a@\\SNQFE?O?[AY?[A_@BK@KDs@XUD[D_@@o@D_@BUDQLMLOPINCDYf@OREFIHOLID]N]Jc@Fi@?sAU{Dm@c@Q_@Wu@}@]a@m@[m@Sa@QOSI[Eo@M_DKyBAUSoBQwASw@a@s@Wi@oAmBy@oAm@m@]U_@IeAOgAEqAAg@CM?UI][[Q]Ci@Je@Lk@TYJoCz@YFq@P_@@s@Eq@Ce@HWPe@b@e@VUHC@ODs@HKB]B]?sAU]MUOKGSQe@c@]S_A_@a@Qa@Q_@Gu@?g@Cu@O_B_@aB_@q@O_@OUMg@c@_@Us@_@k@Mq@Cq@NkAHkA?kB]{@G_AGo@Oe@W[Y_@k@{@o@u@[uAc@m@IcAGyA@YC[KYM[Qs@_@i@Ma@Ie@G_@?s@FQ@SCy@Mw@SmA?QFGAOK_@GOG}Ao@w@]aA_@cA_@{@WyCeAw@WUCWLQJM@OAw@Yg@Mq@O_@QWOSOIOAKAO@SDMVQvBuATIP?l@HXBLE^i@NSNCNFLRn@h@VHXBb@FVFR?JGPc@XeARo@NMP?XNvBhANBR?ZIhAYp@KtAD^DL?NAJENI`@U|@g@NMLO\\{@Xq@d@e@z@a@RQLUf@_AFSD_@@aAC{ABs@FWBMRg@lAsC`ByDHSn@cBZmB@_AEk@Mu@QYQWMa@Ko@Qk@Yo@[a@Yu@Ow@OgAAg@Du@Hy@Ek@W{@UaACy@Du@L}@Fg@EYIMQKg@Ck@Aq@Ac@G[IWYk@s@w@g@gAUcAGgAEe@Ca@SoAeAgBeBk@w@[{@[uAY_B?YF]LWXWb@_A\\aAdAmEXcAT]ZE^B\\?`@EtAe@b@]Re@Jy@J_BNiADIDQJSV[l@i@XQ`@Ov@YVOJOHWBWFWBMDKNITE\\GTKPK`@YHGDCPGNA^At@AjAAVAH?FCFIBIAI?IEEEGG?E?SHMDQ@QAMAQGWMMIMKe@m@c@k@MIECIAM?MHY^QNi@Z_@VSPk@t@SPSL_@Pi@Vk@XUNOLQNKPKPSf@GNKDMCCEEIAK?MDMJILOHOPa@N[n@u@r@{@TSRKJ@R@HAFIBK@MAMEIGIGCK?KFKLSPYN_@JWFU@g@BYBYFMJMLYb@s@lAU\\[^QNWPSLSHUBa@A_@CMAM@ODYHOHK@KAGICI?K?GBGHITEjAMd@I^KNENKNUJQLWXq@Vu@Pk@H[DSHs@FWFYDQAQEOIGI@KDGJAN?LAh@EXKf@O`@Yl@MVMPIJKFODS?OE[KYIMAM?QF{@l@u@XmAb@SDg@H]@Q@IBIBOHONy@~@s@bAWl@ITALAJA^C\\IpAETETGROf@_AtBq@xAUf@KPKJQPIHOFUJWHSJIDKHEHEFCJAHAHAN@T@j@B^@VBR@R@P?t@?X@N@LBLBNLXJ\\HTBL@J@L@J?PAp@?T@N@RBRBRDTFTHPJVl@dAR`@JRHRLXDRLj@DPHPHNTZNNLH^RHFRRJPV\\Zf@HNDJBH@L?HCLCHEFEDGBI@s@?U@MBGBKFIHCFCFAF?H?HL\\Nb@FVDh@Bb@@P?HAHAHCFCFEFEDGBE@K?U?I?MBKDIDKJ[b@UVMRMXGLCBEBE@E?EACACECECE?IAG@G@IBGFGPQLOX_@^k@d@q@FGDIBG?I?IAICGCEIEI?G?E@EDIJUZMLKHMJOH[LOHKHIHGJINQd@KXIVKt@E\\Gl@E\\ELEHIJIFMDQDOBO?Y@s@Au@C[?]@g@?S?MAUCYCSEYG_@MOEOCOAU?]?S@[BWDM@M?YAa@CUCICICKGGEIIGIIOEKa@kASk@]w@_@{@KYK[GSI]Ig@G[GQEKEIEEGCIEIAe@GI?G?C@EBCDCDCFAHAP?f@AVCRCNEJGNEFIHMLSNIFGFGHEHELGVENCDEDEBC@C?C?EACACEACAEAGAG@G?GDKTg@Pk@J]H[BQBU@Q@UAWCYIe@G_@I[IUOYWc@[i@Yc@CGCGAK@G?EBEBCDCD?D@FBVRNJDBHBJ@N?f@@PAJAJCHEHEJKVUNMFEHGFCHAHAH?J@d@HL@F?F?HAJCVIHELAv@A^@HAFAFCDEDGDIJ]H]r@{BHYL]FU@I@M?M?E?IEOCIGKQSUSEIEMAK?WAS?MCOEOIUEQCKCOCSCi@AUCSEUGOIQKOGQEKAIAKAM?S@o@B{@?Q@E@SHYNq@@I@I?G?E?AAIAIAEKOIIIEOCu@SSGICGGECEICECGAG?GAI?K?a@?}@@WASASCUKe@CQ?M?O@SBYBS@Q?MAQAQEQS_AEQAOAO?KBM@IDKZo@FODODQDa@DQDKR]d@g@\\_@n@o@LOBGBG@G@EAI?ICGEGCCGAE?I@GF[\\[VWRWPKFMDy@Pa@He@Po@\\KJILOXMXM\\GVG\\C^KbAGp@AFADEBE?E?CAEACEAEAIAG@G@MBWBS?[@kA@k@@a@F]Hm@PmAHg@FU@I@E?GAGAGCEACCACCC?E?C@CBCFINIJGFIHOHmBbAc@VSLOLQR[`@W\\UZMTMXGNEPAJAF?H?B@B@LDFJNt@p@PRFHBH@H@H@H?JAHCJCHEDGHKDc@DMBKBIFIHEFKREHEFEDE@GBE?G?ECECGEEGEGCKCIAMASA{@A_A?[AWAM?GCMCICECEECCCGAIC]Cg@GQCOGMGOIUOOOOQUY_AyAKSIOIUCOCMAMAS?W@s@?M?S@KBIBMFQDMJWFKFGHIFCDCFAD?J@N@ZFH@J?D?F?BADADCDEBEBE@E@I?G?IAKESCSAEESAEWqAIe@Ig@Mk@EUGSGSGKKQEGKMKK][GEW[SYGKIMSa@Uc@aB{CQ[MOIK_@UQOQ\\O^qBtEKPc@~@a@t@_@p@Q^ABCDA@?@A@CFGJABU`@ABGHO\\O`@b@b@",
                        "type": "ROUTE",
                        "services": [
                          {
                            "distance": 17673,
                            "duration": 31.5,
                            "expireAt": "2020-10-23T14:05:22.769Z",
                            "icon": "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",
                            "id": "33fe1136-fac4-4372-9f1f-046e3ec70e75",
                            "maxPassengers": 4,
                            "name": "LeCab",
                            "operator": "lecab",
                            "polyline": "_btrGsiff@M@I@?GAg@CsBAiBCqF?e@[?a@?G?Y?a@@a@B_BB?k@Dk@Da@l@oEBUH?FEBG?IAGCGCCC?I@CDOMu@m@cAi@y@c@_Ao@OMU_@MYQe@IUGKSWg@k@k@a@m@_@c@U_@Eg@BU?c@Ew@Qc@Mu@[[GQ?UBYJaAz@a@\\SNQFE?O?[AY?[A_@BK@KDs@XUD[D_@@o@D_@BUDQLMLOPINCDYf@OREFIHOLID]N]Jc@Fi@?sAU{Dm@c@Q_@Wu@}@]a@m@[m@Sa@QOSI[Eo@M_DKyBAUSoBQwASw@a@s@Wi@oAmBy@oAm@m@]U_@IeAOgAEqAAg@CM?UI][[Q]Ci@Je@Lk@TYJoCz@YFq@P_@@s@Eq@Ce@HWPe@b@e@VUHC@ODs@HKB]B]?sAU]MUOKGSQe@c@]S_A_@a@Qa@Q_@Gu@?g@Cu@O_B_@aB_@q@O_@OUMg@c@_@Us@_@k@Mq@Cq@NkAHkA?kB]{@G_AGo@Oe@W[Y_@k@{@o@u@[uAc@m@IcAGyA@YC[KYM[Qs@_@i@Ma@Ie@G_@?s@FQ@SCy@Mw@SmA?QFGAOK_@GOG}Ao@w@]aA_@cA_@{@WyCeAw@WUCWLQJM@OAw@Yg@Mq@O_@QWOSOIOAKAO@SDMVQvBuATIP?l@HXBLE^i@NSNCNFLRn@h@VHXBb@FVFR?JGPc@XeARo@NMP?XNvBhANBR?ZIhAYp@KtAD^DL?NAJENI`@U|@g@NMLO\\{@Xq@d@e@z@a@RQLUf@_AFSD_@@aAC{ABs@FWBMRg@lAsC`ByDHSn@cBZmB@_AEk@Mu@QYQWMa@Ko@Qk@Yo@[a@Yu@Ow@OgAAg@Du@Hy@Ek@W{@UaACy@Du@L}@Fg@EYIMQKg@Ck@Aq@Ac@G[IWYk@s@w@g@gAUcAGgAEe@Ca@SoAeAgBeBk@w@[{@[uAY_B?YF]LWXWb@_A\\aAdAmEXcAT]ZE^B\\?`@EtAe@b@]Re@Jy@J_BNiADIDQJSV[l@i@XQ`@Ov@YVOJOHWBWFWBMDKNITE\\GTKPK`@YHGDCPGNA^At@AjAAVAH?FCFIBIAI?IEEEGG?E?SHMDQ@QAMAQGWMMIMKe@m@c@k@MIECIAM?MHY^QNi@Z_@VSPk@t@SPSL_@Pi@Vk@XUNOLQNKPKPSf@GNKDMCCEEIAK?MDMJILOHOPa@N[n@u@r@{@TSRKJ@R@HAFIBK@MAMEIGIGCK?KFKLSPYN_@JWFU@g@BYBYFMJMLYb@s@lAU\\[^QNWPSLSHUBa@A_@CMAM@ODYHOHK@KAGICI?K?GBGHITEjAMd@I^KNENKNUJQLWXq@Vu@Pk@H[DSHs@FWFYDQAQEOIGI@KDGJAN?LAh@EXKf@O`@Yl@MVMPIJKFODS?OE[KYIMAM?QF{@l@u@XmAb@SDg@H]@Q@IBIBOHONy@~@s@bAWl@ITALAJA^C\\IpAETETGROf@_AtBq@xAUf@KPKJQPIHOFUJWHSJIDKHEHEFCJAHAHAN@T@j@B^@VBR@R@P?t@?X@N@LBLBNLXJ\\HTBL@J@L@J?PAp@?T@N@RBRBRDTFTHPJVl@dAR`@JRHRLXDRLj@DPHPHNTZNNLH^RHFRRJPV\\Zf@HNDJBH@L?HCLCHEFEDGBI@s@?U@MBGBKFIHCFCFAF?H?HL\\Nb@FVDh@Bb@@P?HAHAHCFCFEFEDGBE@K?U?I?MBKDIDKJ[b@UVMRMXGLCBEBE@E?EACACECECE?IAG@G@IBGFGPQLOX_@^k@d@q@FGDIBG?I?IAICGCEIEI?G?E@EDIJUZMLKHMJOH[LOHKHIHGJINQd@KXIVKt@E\\Gl@E\\ELEHIJIFMDQDOBO?Y@s@Au@C[?]@g@?S?MAUCYCSEYG_@MOEOCOAU?]?S@[BWDM@M?YAa@CUCICICKGGEIIGIIOEKa@kASk@]w@_@{@KYK[GSI]Ig@G[GQEKEIEEGCIEIAe@GI?G?C@EBCDCDCFAHAP?f@AVCRCNEJGNEFIHMLSNIFGFGHEHELGVENCDEDEBC@C?C?EACACEACAEAGAG@G?GDKTg@Pk@J]H[BQBU@Q@UAWCYIe@G_@I[IUOYWc@[i@Yc@CGCGAK@G?EBEBCDCD?D@FBVRNJDBHBJ@N?f@@PAJAJCHEHEJKVUNMFEHGFCHAHAH?J@d@HL@F?F?HAJCVIHELAv@A^@HAFAFCDEDGDIJ]H]r@{BHYL]FU@I@M?M?E?IEOCIGKQSUSEIEMAK?WAS?MCOEOIUEQCKCOCSCi@AUCSEUGOIQKOGQEKAIAKAM?S@o@B{@?Q@E@SHYNq@@I@I?G?E?AAIAIAEKOIIIEOCu@SSGICGGECEICECGAG?GAI?K?a@?}@@WASASCUKe@CQ?M?O@SBYBS@Q?MAQAQEQS_AEQAOAO?KBM@IDKZo@FODODQDa@DQDKR]d@g@\\_@n@o@LOBGBG@G@EAI?ICGEGCCGAE?I@GF[\\[VWRWPKFMDy@Pa@He@Po@\\KJILOXMXM\\GVG\\C^KbAGp@AFADEBE?E?CAEACEAEAIAG@G@MBWBS?[@kA@k@@a@F]Hm@PmAHg@FU@I@E?GAGAGCEACCACCC?E?C@CBCFINIJGFIHOHmBbAc@VSLOLQR[`@W\\UZMTMXGNEPAJAF?H?B@B@LDFJNt@p@PRFHBH@H@H@H?JAHCJCHEDGHKDc@DMBKBIFIHEFKREHEFEDE@GBE?G?ECECGEEGEGCKCIAMASA{@A_A?[AWAM?GCMCICECEECCCGAIC]Cg@GQCOGMGOIUOOOOQUY_AyAKSIOIUCOCMAMAS?W@s@?M?S@KBIBMFQDMJWFKFGHIFCDCFAD?J@N@ZFH@J?D?F?BADADCDEBEBE@E@I?G?IAKESCSAEESAEWqAIe@Ig@Mk@EUGSGSGKKQEGKMKK][GEW[SYGKIMSa@Uc@aB{CQ[MOIK_@UQOQ\\O^qBtEKPc@~@a@t@_@p@Q^ABCDA@?@A@CFGJABU`@ABGHO\\O`@b@b@",
                            "costs": {
                              "isEstimated": false,
                              "fixed": 12525,
                              "passenger": []
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            "costs": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/ReservationCost"
                },
                {
                  "description": "Cost of the booking.",
                  "example": {
                    "estimated": false,
                    "total": 12525
                  }
                }
              ]
            },
            "cancelation": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/ReservationCancelation"
                },
                {
                  "description": "Estimated cost of cancellation.",
                  "example": {}
                }
              ]
            },
            "status": {
              "type": "string",
              "description": "Reservation status.",
              "example": "booked"
            },
            "error": {
              "type": "string",
              "description": "Error with the booking."
            }
          },
          "required": [
            "id",
            "createdAt",
            "updatedAt",
            "journey",
            "costs",
            "status"
          ]
        },
        "CardExpiration": {
          "type": "object",
          "properties": {
            "month": {
              "type": "number",
              "description": "Month of expiration of the card.",
              "example": 10
            },
            "year": {
              "type": "number",
              "description": "Year of expiry of the card.",
              "example": 25
            }
          },
          "required": [
            "month",
            "year"
          ]
        },
        "Card": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Card's id",
              "example": "84a51f32-224c-43de-b2a1-44d728608f1f"
            },
            "applicationId": {
              "type": "string",
              "description": "Application's id",
              "example": "533b80c3-cb8d-4244-9fe4-c13eff6a924f"
            },
            "customerId": {
              "type": "string",
              "description": "Customer's id",
              "example": "888d0591-85cf-4306-a118-639823592e03"
            },
            "last4": {
              "type": "string",
              "description": "Last 4 card numbers.",
              "example": "3920"
            },
            "brand": {
              "type": "string",
              "description": "Brand of the card. (VISA, MasterCard etc.).",
              "example": "Visa"
            },
            "expiration": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/CardExpiration"
                },
                {
                  "description": "Card expiration date."
                }
              ]
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "example": "2020-10-13 15:40:00.016Z"
            }
          },
          "required": [
            "id",
            "applicationId",
            "customerId",
            "last4",
            "brand",
            "expiration",
            "createdAt"
          ]
        },
        "CardCreation": {
          "type": "object",
          "properties": {
            "pm": {
              "type": "string",
              "description": "PaymentMethod ID generated by SDK JS.",
              "example": "pm_1GNMUWK4lyXwa2Iz51c4L3HW"
            }
          },
          "required": [
            "pm"
          ]
        },
        "CardDeleted": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Card's ID.",
              "example": "pm_1GNMUWK4lyXwa2Iz51c4L3HW"
            },
            "deleted": {
              "type": "boolean",
              "description": "If card deleted.",
              "example": true
            }
          },
          "required": [
            "id",
            "deleted"
          ]
        },
        "ReservationCreationPayment": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "card"
              ],
              "description": "Means of payment.",
              "example": "card"
            },
            "card": {
              "type": "string",
              "description": "Card id.",
              "example": "pm_1GNMUWK4lyXwa2Iz51c4L3HW"
            }
          },
          "required": [
            "type",
            "card"
          ]
        },
        "ReservationPassenger": {
          "type": "object",
          "properties": {
            "birthday": {
              "type": "string",
              "format": "date",
              "description": "Date of birth of the passenger.",
              "example": "1996-04-01"
            },
            "option": {
              "type": "object",
              "example": {
                "baby_seat": true,
                "luggage": 4
              },
              "description": "Passenger options."
            }
          },
          "required": [
            "birthday",
            "option"
          ]
        },
        "ReservationCreation": {
          "type": "object",
          "properties": {
            "itineraryId": {
              "type": "string",
              "description": "Itinerary id.",
              "example": "27754375-a09e-45c6-b975-f010e2bee647"
            },
            "services": {
              "description": "List of Id's of the different service operators who want to be booked on the journey.",
              "example": [
                "db53aae0-d700-4953-8841-7e333931fc70"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "passengers": {
              "description": "List of passengers wishing to book the trip, with their ages and selected options.",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReservationPassenger"
              }
            }
          },
          "required": [
            "itineraryId",
            "services",
            "passengers"
          ]
        },
        "ReservationsCreation": {
          "type": "object",
          "properties": {
            "live": {
              "type": "boolean",
              "description": "Sandbox mode.",
              "example": false
            },
            "payment": {
              "allOf": [
                {
                  "$ref": "#/components/schemas/ReservationCreationPayment"
                },
                {
                  "description": "Customer's card."
                }
              ]
            },
            "reservations": {
              "description": "List of Reservation Id's.",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReservationCreation"
              }
            }
          },
          "required": [
            "live",
            "payment",
            "reservations"
          ]
        },
        "ReservationCancellation": {
          "type": "object",
          "properties": {
            "cost": {
              "type": "number",
              "description": "Cost of cancellation."
            }
          },
          "required": [
            "cost"
          ]
        },
        "Customer": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "readOnly": true,
              "example": "84a51f32-224c-43de-b2a1-44d728608f1f"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "readOnly": true,
              "example": "2020-11-16T07:29:01+01:00"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "readOnly": true,
              "example": "2020-11-16T07:29:01+01:00"
            },
            "deleted": {
              "type": "boolean",
              "readOnly": true,
              "example": false
            },
            "application": {
              "type": "string",
              "readOnly": true,
              "example": "2ac15ae5-0247-4044-862a-71c88abcd900"
            },
            "firstname": {
              "type": "string",
              "description": "Customer's name",
              "example": "John"
            },
            "lastname": {
              "type": "string",
              "description": "Customer's lastname",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "description": "Customer's email",
              "example": "johndoe@example.com"
            },
            "phone": {
              "type": "string",
              "description": "Customer's phone",
              "example": "+33601020304"
            }
          },
          "required": [
            "id",
            "createdAt",
            "updatedAt",
            "deleted",
            "application",
            "firstname",
            "lastname",
            "email",
            "phone"
          ]
        }
      }
    },
    "paths": {
      "/v1/addresses/": {
        "get": {
          "operationId": "AddressController_autocomplete",
          "parameters": [
            {
              "name": "text",
              "required": false,
              "in": "query",
              "description": "Complete or partially complete postal address search. This parameter will be ignored if you use the LAT/LNG parameters.",
              "example": "12 Rue Sainte-Foy, 75002 Paris, France",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "lat",
              "required": false,
              "in": "query",
              "description": "Latitude GPS coordinate.",
              "example": "48.868714",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "lng",
              "required": false,
              "in": "query",
              "description": "Longitude GPS coordinate.",
              "example": "2.351026",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit number of results.",
              "example": "10",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "locale",
              "required": false,
              "in": "query",
              "description": "Set locales language to display results.",
              "example": "fr",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return a list of addresses",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Address"
                  }
                }
              }
            }
          },
          "tags": [
            "Addresses"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/itineraries": {
        "get": {
          "operationId": "ItinerariesController_intermodal",
          "parameters": [
            {
              "name": "from",
              "required": true,
              "in": "query",
              "description": "Specify the starting point using an address or gps coordinates.",
              "example": "16 Rue Sainte-Foy, 75002 Paris",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": true,
              "in": "query",
              "description": "Specify the point of arrival using an address or gps coordinates.",
              "example": "5 Avenue Anatole France, 75007 Paris",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "date",
              "required": true,
              "in": "query",
              "example": "2021-10-26T08:28:28.245Z",
              "description": "Date of departure or arrival.",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "dateType",
              "required": true,
              "in": "query",
              "description": "Specify if the date is for a departure or arrival.",
              "schema": {
                "enum": [
                  "DEPARTURE",
                  "ARRIVAL"
                ],
                "type": "string"
              }
            },
            {
              "name": "passengers",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "Number of passengers.",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "modes",
              "required": false,
              "in": "query",
              "description": "Define which transports modes you want.",
              "example": [
                "CAR",
                "FOOT",
                "BIKE",
                "TRANSIT_AERIAL_LIFT",
                "TRANSIT_BUS",
                "TRANSIT_FERRY",
                "TRANSIT_FUNICULAR",
                "TRANSIT_METRO",
                "TRANSIT_MONORAIL",
                "TRANSIT_TRAIN",
                "TRANSIT_TRAMWAY",
                "TRANSIT_TROLLEYBUS",
                "UNKNOWN",
                "PARKING_FREE",
                "PARKING_PAID"
              ],
              "schema": {
                "type": "array",
                "items": {
                  "type": ""
                }
              }
            },
            {
              "name": "operators",
              "required": false,
              "in": "query",
              "description": "Include private operators.",
              "example": true,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Define the maximum number of results",
              "example": 10,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Obtain multiple itineraries between point A and B mixing various modes of transit.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Journey"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Itineraries"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/transit/departures": {
        "get": {
          "operationId": "TransitController_departures",
          "parameters": [
            {
              "name": "stops",
              "required": true,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "date",
              "required": true,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "count",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Transit"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/transit/arrivals": {
        "get": {
          "operationId": "TransitController_arrivals",
          "parameters": [
            {
              "name": "stops",
              "required": true,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "date",
              "required": true,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "count",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Transit"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/reservations": {
        "get": {
          "operationId": "ReservationsController_list",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns the list of all reservations.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Reservation"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Itineraries"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/reservations/{reservationId}": {
        "get": {
          "operationId": "ReservationsController_detail",
          "parameters": [
            {
              "name": "reservationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the reservation corresponding to the ID provided.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservation"
                  }
                }
              }
            }
          },
          "tags": [
            "Itineraries"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers/{customerId}/cards": {
        "get": {
          "operationId": "CustomerCardController_list",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of the customer's registered cards.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Card"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Customers cards"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "post": {
          "operationId": "CustomerCardController_create",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CardCreation"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the created card.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Card"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers cards"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers/{customerId}/cards/{cardId}": {
        "get": {
          "operationId": "CustomerCardController_detail",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "cardId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the user card corresponding to the ID provided.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Card"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers cards"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "delete": {
          "operationId": "CustomerCardController_delete",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "cardId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns a deletion confirmation and the card ID.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CardDeleted"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers cards"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers/{customerId}/reservations": {
        "get": {
          "operationId": "CustomerReservationController_list",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the list of customer reservations ",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Reservation"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Customers reservations"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "post": {
          "operationId": "CustomerReservationController_create",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationsCreation"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the list of reservations created.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Reservation"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Customers reservations"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers/{customerId}/reservations/{reservationId}": {
        "get": {
          "operationId": "CustomerReservationController_detail",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "reservationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return the customer's reservation.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservation"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers reservations"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "delete": {
          "operationId": "CustomerReservationController_delete",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "reservationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationCancellation"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the reservation cancel.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservation"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers reservations"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers/{customerId}/reservations/{reservationId}/cancellation": {
        "get": {
          "operationId": "CustomerReservationController_cancellation",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "reservationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the cost of the cancellation.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationCancellation"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers reservations"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers": {
        "get": {
          "operationId": "CustomerController_list",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Return a list of customer",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Customer"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Customers"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "post": {
          "operationId": "CustomerController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Customer"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return the user created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Customer"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/customers/{customerId}": {
        "get": {
          "operationId": "CustomerController_detail",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the user corresponding to the ID provided.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Customer"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "put": {
          "operationId": "CustomerController_update",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Customer"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return the user updated.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Customer"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        },
        "delete": {
          "operationId": "CustomerController_delete",
          "parameters": [
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return the user deleted.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Customer"
                  }
                }
              }
            }
          },
          "tags": [
            "Customers"
          ],
          "security": [
            {
              "apiKey": []
            }
          ]
        }
      },
      "/v1/errors/": {
        "get": {
          "operationId": "ErrorController_list",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Errors"
          ]
        }
      }
    }
  },
  "customOptions": {},
  "swaggerUrl": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
