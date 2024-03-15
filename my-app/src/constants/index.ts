export const propertyTypes = [
  {
    value: "cabin",
    label: "Cabin",
  },
  {
    value: "cottage",
    label: "Cottage",
  },
  {
    value: "tinyhouse",
    label: "Tiny House",
  },
  {
    value: "troglodytic",
    label: "Troglodytic House",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const propertyStatuses = [
  { value: "rent", label: "Rent" },
  { value: "sale", label: "Sale" },
];

export const propertyCountries = [
  { value: "austria", label: "Austria" },
  { value: "belgium", label: "Belgium" },
  { value: "denmark", label: "Denmark" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "ireland", label: "Ireland" },
  { value: "italy", label: "Italy" },
  { value: "luxembourg", label: "Luxembourg" },
  { value: "netherlands", label: "Netherlands" },
  { value: "norway", label: "Norway" },
  { value: "portugal", label: "Portugal" },
  { value: "spain", label: "Spain" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "united_kingdom", label: "United Kingdom" },
];

export const furnishingTypes = [
  { value: "furnished", label: "Furnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export const subscriptionPlans = [
  {
    name: "Free",
    price: 0,
    propertiesLimit: 3,
    imagesPerPropertyLimit: 3,
    features: [
      "Property Listing",
      "Property Details",
      "3 Images per Property",
      "3 Properties Limit",
      "Property Search",
    ],
  },
  {
    name: "Standard",
    price: 10,
    propertiesLimit: 5,
    imagesPerPropertyLimit: 5,
    features: [
      "Property Listing",
      "Property Details",
      "5 Images per Property",
      "5 Properties Limit",
      "Property Search",
      "24/7 Support",
    ],
  },
  {
    name: "Premium",
    price: 25,
    propertiesLimit: "unlimited",
    imagesPerPropertyLimit: 15,
    features: [
      "Property Listing",
      "Property Details",
      "15 Images per Property",
      "Unlimited Properties",
      "Property Search",
      "24/7 Support",
      "AI Support",
      "Personal Account Manager",
    ],
  },
];
