import moment from "moment";

export const Notifications_Data = [
  {
    id: "1",
    title: "Caregiver Approval",
    description: "A new caregiver need to be approved to use the app",
    action: "redirect",
    extra_data: {
      path: "/profile",
    },
    read_at: false,
    created_at: moment().format("L"),
  },
  {
    id: "2",
    title: "New block suggestion",
    description: "Jose Sanchis add new suggestion",
    action: "redirect",
    extra_data: {
      path: "/block/123",
    },
    read_at: moment().format("L"),
    created_at: moment().format("L"),
  },
  {
    id: "3",
    title: "New section suggestion",
    description: "Jose Sanchis add new suggestion",
    action: "redirect",
    extra_data: {
      path: "/section/123",
    },
    read_at: moment().format("L"),
    created_at: moment().format("L"),
  },
];
