import type { SelectOption } from "../interfaces/generic";

export type Navigation = {
  name: string;
  href: string;
  iconKey: "home" | "user" | "calendar" |"admin";
  isHovering: boolean;
  adminOnly: boolean;
};

export const navItems: Navigation[] = [
  {
    name: "Home",
    href: "/",
    iconKey: "home",
    isHovering: false,
    adminOnly: false,
  },
  {
    name: "Profile",
    href: "/profile",
    iconKey: "user",
    isHovering: false,
    adminOnly: false,
  },
  {
    name: "Timesheet",
    href: "/timesheet",
    iconKey: "calendar",
    isHovering: false,
    adminOnly: false,
  },
  {
    name: "Admin",
    href: "/admin",
    iconKey: "admin",
    isHovering: false,
    adminOnly: true,
  },
];
export const days: readonly string[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const activities: SelectOption[] = [
  { label: "In Office", value: "inoffice" },
  { label: "Remote", value: "remote" },
  { label: "After Hours", value: "afterhours" },
  { label: "On Call", value: "oncall" },
  { label: "Holiday", value: "holiday" },
  { label: "PTO", value: "pto" },
];

export const callTypes = [
  { label: "PW", value: "Paperwork" },
  { label: "PS", value: "Phone Support" },
  { label: "TM", value: "Time & Material" },
  { label: "PT", value: "Parts Admin" },
  { label: "INS", value: "Install" },
  { label: "TR", value: "Training" },
  { label: "RM", value: "Repair" },
  { label: "TST", value: "Testing" },
  { label: "E", value: "Emergency Call" },
];
