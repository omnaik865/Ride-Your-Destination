// Company & Bike Data (Two-Wheeler & Scooty Only)
const companies = [
  {
    id: 1,
    name: "Honda",
    types: [
      {
        name: "Bike",
        bikes: [
          { id: 101, name: "Honda Shine", rate: 10, img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", driver: { name: "Ramesh Kumar", age: 32, phone: "9876543210", vehicleNumber: "MH12AB1234", bikeModel: "Honda Shine 2020" } },
          { id: 102, name: "Honda CB Hornet", rate: 12, img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", driver: { name: "Ajay Singh", age: 28, phone: "9876512340", vehicleNumber: "MH10EF4321", bikeModel: "Honda CB Hornet 2021" } },
        ],
      },
      {
        name: "Scooty",
        bikes: [
          { id: 103, name: "Honda Activa", rate: 9, img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", driver: { name: "Suresh Patel", age: 30, phone: "9876541230", vehicleNumber: "MH14CD5678", bikeModel: "Honda Activa 2021" } },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Yamaha",
    types: [
      {
        name: "Bike",
        bikes: [
          { id: 201, name: "Yamaha FZ", rate: 15, img: "https://cdn-icons-png.flaticon.com/512/1048/1048327.png", driver: { name: "Ajay Singh", age: 30, phone: "9876512340", vehicleNumber: "MH10EF4321", bikeModel: "Yamaha FZ 2021" } },
          { id: 202, name: "Yamaha MT-15", rate: 18, img: "https://cdn-icons-png.flaticon.com/512/1048/1048327.png", driver: { name: "Vikram Das", age: 35, phone: "9876598765", vehicleNumber: "MH20GH8765", bikeModel: "Yamaha MT-15 2022" } },
        ],
      },
      {
        name: "Scooty",
        bikes: [
          { id: 203, name: "Yamaha Ray ZR", rate: 12, img: "https://cdn-icons-png.flaticon.com/512/1048/1048327.png", driver: { name: "Rohan Mehta", age: 33, phone: "9876523456", vehicleNumber: "MH30AB1234", bikeModel: "Yamaha Ray ZR 2022" } },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "TVS",
    types: [
      {
        name: "Bike",
        bikes: [
          { id: 301, name: "TVS Apache", rate: 14, img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", driver: { name: "Karan Singh", age: 29, phone: "9876532109", vehicleNumber: "MH11AB5678", bikeModel: "TVS Apache 2021" } },
        ],
      },
      {
        name: "Scooty",
        bikes: [
          { id: 302, name: "TVS Jupiter", rate: 10, img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", driver: { name: "Rohit Sharma", age: 32, phone: "9876540987", vehicleNumber: "MH15CD9876", bikeModel: "TVS Jupiter 2022" } },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Bajaj",
    types: [
      {
        name: "Bike",
        bikes: [
          { id: 401, name: "Bajaj Pulsar", rate: 13, img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", driver: { name: "Sanjay Kumar", age: 31, phone: "9876541123", vehicleNumber: "MH12GH1234", bikeModel: "Bajaj Pulsar 2021" } },
        ],
      },
      {
        name: "Scooty",
        bikes: [
          { id: 402, name: "Bajaj Chetak", rate: 11, img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", driver: { name: "Manish Patel", age: 28, phone: "9876543345", vehicleNumber: "MH16CD4321", bikeModel: "Bajaj Chetak 2022" } },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Suzuki",
    types: [
      {
        name: "Bike",
        bikes: [
          { id: 501, name: "Suzuki Gixxer", rate: 14, img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", driver: { name: "Vijay Kumar", age: 33, phone: "9876545567", vehicleNumber: "MH17AB5678", bikeModel: "Suzuki Gixxer 2021" } },
        ],
      },
      {
        name: "Scooty",
        bikes: [
          { id: 502, name: "Suzuki Access", rate: 10, img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", driver: { name: "Rahul Das", age: 30, phone: "9876546678", vehicleNumber: "MH18CD6789", bikeModel: "Suzuki Access 2022" } },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Hero",
    types: [
      {
        name: "Bike",
        bikes: [
          { id: 601, name: "Hero Splendor", rate: 9, img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", driver: { name: "Deepak Sharma", age: 29, phone: "9876547788", vehicleNumber: "MH19EF4321", bikeModel: "Hero Splendor 2021" } },
        ],
      },
      {
        name: "Scooty",
        bikes: [
          { id: 602, name: "Hero Pleasure", rate: 10, img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", driver: { name: "Anil Kumar", age: 31, phone: "9876548899", vehicleNumber: "MH20GH5432", bikeModel: "Hero Pleasure 2022" } },
        ],
      },
    ],
  },
];
