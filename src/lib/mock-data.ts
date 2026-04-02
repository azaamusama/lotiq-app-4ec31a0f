// ─── Types ───────────────────────────────────────────────────
export type UserRole = "property_manager" | "towing_company" | "authorized_parker";

export type IncidentType = "unauthorized_parking" | "ev_misuse" | "slip_and_fall" | "snow_activity" | "hazardous_condition";

export type IncidentStatus = "active" | "resolved" | "escalated" | "monitoring";

export type TowStatus = "requested" | "accepted" | "en_route" | "arrived" | "completed" | "cancelled";

export type CameraStatus = "online" | "offline";

export interface Property {
  id: string;
  name: string;
  address: string;
  zones: string[];
  cameraCount: number;
}

export interface Camera {
  id: string;
  name: string;
  zone: string;
  status: CameraStatus;
  lastSeen: string;
  propertyId: string;
}

export interface Incident {
  id: string;
  type: IncidentType;
  status: IncidentStatus;
  title: string;
  description: string;
  cameraId: string;
  cameraName: string;
  zone: string;
  timestamp: string;
  images: string[];
  ruleTriggered: string;
  licensePlate?: string;
  timeline: TimelineEvent[];
  towJobId?: string;
}

export interface TimelineEvent {
  timestamp: string;
  action: string;
  actor: string;
}

export interface TowJob {
  id: string;
  incidentId: string;
  status: TowStatus;
  towingCompany: string;
  vehicleDescription: string;
  licensePlate: string;
  requestedAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface Rule {
  id: string;
  name: string;
  type: IncidentType;
  description: string;
  enabled: boolean;
  towPolicy: "instant" | "grace_period";
  gracePeriodMinutes?: number;
  propertyId: string;
}

export interface AuthorizedParker {
  id: string;
  name: string;
  email: string;
  vehicles: Vehicle[];
  addedAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string;
  isPrimary: boolean;
}

export interface TowingCompany {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  activeJobs: number;
  completedJobs: number;
  status: "active" | "invited" | "inactive";
}

// ─── Mock Data ───────────────────────────────────────────────

export const mockProperty: Property = {
  id: "prop-1",
  name: "Metro Plaza",
  address: "1250 Commerce Drive, Austin, TX 78701",
  zones: ["Zone A - Main Lot", "Zone B - EV Charging", "Zone C - Loading Dock", "Zone D - Visitor Parking"],
  cameraCount: 8,
};

export const mockCameras: Camera[] = [
  { id: "cam-1", name: "Main Entrance", zone: "Zone A - Main Lot", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
  { id: "cam-2", name: "EV Station North", zone: "Zone B - EV Charging", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
  { id: "cam-3", name: "EV Station South", zone: "Zone B - EV Charging", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
  { id: "cam-4", name: "Loading Dock", zone: "Zone C - Loading Dock", status: "offline", lastSeen: new Date(Date.now() - 3600000).toISOString(), propertyId: "prop-1" },
  { id: "cam-5", name: "Visitor Entry", zone: "Zone D - Visitor Parking", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
  { id: "cam-6", name: "Rear Lot", zone: "Zone A - Main Lot", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
  { id: "cam-7", name: "Stairwell A", zone: "Zone A - Main Lot", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
  { id: "cam-8", name: "Perimeter East", zone: "Zone D - Visitor Parking", status: "online", lastSeen: new Date().toISOString(), propertyId: "prop-1" },
];

const now = new Date();
const ago = (mins: number) => new Date(now.getTime() - mins * 60000).toISOString();

export const mockIncidents: Incident[] = [
  {
    id: "inc-1",
    type: "unauthorized_parking",
    status: "active",
    title: "Unauthorized vehicle in Zone A",
    description: "Unregistered vehicle detected in reserved parking area. License plate does not match any authorized vehicles.",
    cameraId: "cam-1",
    cameraName: "Main Entrance",
    zone: "Zone A - Main Lot",
    timestamp: ago(12),
    images: ["/placeholder.svg"],
    ruleTriggered: "No Unauthorized Parking",
    licensePlate: "TX-4829-KL",
    timeline: [
      { timestamp: ago(12), action: "Incident detected", actor: "System" },
      { timestamp: ago(10), action: "License plate captured", actor: "System" },
      { timestamp: ago(8), action: "No match in authorized registry", actor: "System" },
    ],
  },
  {
    id: "inc-2",
    type: "ev_misuse",
    status: "monitoring",
    title: "Non-EV in charging station",
    description: "Non-electric vehicle occupying EV charging spot. Grace period of 15 minutes initiated.",
    cameraId: "cam-2",
    cameraName: "EV Station North",
    zone: "Zone B - EV Charging",
    timestamp: ago(45),
    images: ["/placeholder.svg"],
    ruleTriggered: "EV Charging Zone Enforcement",
    licensePlate: "TX-7721-AB",
    timeline: [
      { timestamp: ago(45), action: "Vehicle detected in EV zone", actor: "System" },
      { timestamp: ago(44), action: "No charging session active", actor: "System" },
      { timestamp: ago(44), action: "Grace period started (15 min)", actor: "System" },
      { timestamp: ago(30), action: "Grace period expired — escalating", actor: "System" },
    ],
  },
  {
    id: "inc-3",
    type: "slip_and_fall",
    status: "escalated",
    title: "Potential slip-and-fall detected",
    description: "Motion analysis detected a possible fall event near the stairwell. Review evidence for liability documentation.",
    cameraId: "cam-7",
    cameraName: "Stairwell A",
    zone: "Zone A - Main Lot",
    timestamp: ago(120),
    images: ["/placeholder.svg"],
    ruleTriggered: "Safety Incident Detection",
    timeline: [
      { timestamp: ago(120), action: "Fall motion detected", actor: "System" },
      { timestamp: ago(119), action: "Video clip captured", actor: "System" },
      { timestamp: ago(115), action: "Escalated for review", actor: "System" },
    ],
  },
  {
    id: "inc-4",
    type: "hazardous_condition",
    status: "active",
    title: "Ice detected in loading dock",
    description: "Surface analysis indicates icy conditions in loading dock area. Salt treatment recommended.",
    cameraId: "cam-4",
    cameraName: "Loading Dock",
    zone: "Zone C - Loading Dock",
    timestamp: ago(180),
    images: ["/placeholder.svg"],
    ruleTriggered: "Hazard Detection",
    timeline: [
      { timestamp: ago(180), action: "Surface anomaly detected", actor: "System" },
      { timestamp: ago(178), action: "Ice probability: 92%", actor: "System" },
    ],
  },
  {
    id: "inc-5",
    type: "unauthorized_parking",
    status: "resolved",
    title: "Unauthorized vehicle removed",
    description: "Previously flagged vehicle has left the premises. Incident auto-resolved.",
    cameraId: "cam-5",
    cameraName: "Visitor Entry",
    zone: "Zone D - Visitor Parking",
    timestamp: ago(360),
    images: ["/placeholder.svg"],
    ruleTriggered: "No Unauthorized Parking",
    licensePlate: "TX-1193-QZ",
    timeline: [
      { timestamp: ago(360), action: "Incident detected", actor: "System" },
      { timestamp: ago(340), action: "Tow requested", actor: "Manager" },
      { timestamp: ago(300), action: "Vehicle departed", actor: "System" },
      { timestamp: ago(300), action: "Tow cancelled — vehicle left", actor: "System" },
      { timestamp: ago(300), action: "Incident resolved", actor: "System" },
    ],
  },
  {
    id: "inc-6",
    type: "snow_activity",
    status: "resolved",
    title: "Snow ploughing completed",
    description: "Snow removal activity detected and confirmed across main lot zones.",
    cameraId: "cam-6",
    cameraName: "Rear Lot",
    zone: "Zone A - Main Lot",
    timestamp: ago(480),
    images: ["/placeholder.svg"],
    ruleTriggered: "Snow Activity Tracking",
    timeline: [
      { timestamp: ago(480), action: "Snow plough detected", actor: "System" },
      { timestamp: ago(420), action: "Activity completed", actor: "System" },
    ],
  },
];

export const mockTowJobs: TowJob[] = [
  {
    id: "tow-1",
    incidentId: "inc-1",
    status: "en_route",
    towingCompany: "Austin Premier Towing",
    vehicleDescription: "Silver Toyota Camry",
    licensePlate: "TX-4829-KL",
    requestedAt: ago(8),
    updatedAt: ago(3),
    timeline: [
      { timestamp: ago(8), action: "Tow requested", actor: "Manager" },
      { timestamp: ago(6), action: "Job accepted", actor: "Austin Premier Towing" },
      { timestamp: ago(3), action: "Driver en route", actor: "Austin Premier Towing" },
    ],
  },
  {
    id: "tow-2",
    incidentId: "inc-5",
    status: "cancelled",
    towingCompany: "Austin Premier Towing",
    vehicleDescription: "Red Ford F-150",
    licensePlate: "TX-1193-QZ",
    requestedAt: ago(340),
    updatedAt: ago(300),
    timeline: [
      { timestamp: ago(340), action: "Tow requested", actor: "Manager" },
      { timestamp: ago(320), action: "Job accepted", actor: "Austin Premier Towing" },
      { timestamp: ago(300), action: "Cancelled — vehicle departed", actor: "System" },
    ],
  },
];

export const mockRules: Rule[] = [
  { id: "rule-1", name: "No Unauthorized Parking", type: "unauthorized_parking", description: "Flag and enforce unauthorized vehicles in all zones", enabled: true, towPolicy: "grace_period", gracePeriodMinutes: 15, propertyId: "prop-1" },
  { id: "rule-2", name: "EV Charging Zone Enforcement", type: "ev_misuse", description: "Detect non-EV vehicles in charging stations", enabled: true, towPolicy: "grace_period", gracePeriodMinutes: 15, propertyId: "prop-1" },
  { id: "rule-3", name: "Safety Incident Detection", type: "slip_and_fall", description: "Detect potential slip-and-fall events for liability", enabled: true, towPolicy: "instant", propertyId: "prop-1" },
  { id: "rule-4", name: "Hazard Detection", type: "hazardous_condition", description: "Identify ice, water, or other surface hazards", enabled: true, towPolicy: "instant", propertyId: "prop-1" },
  { id: "rule-5", name: "Snow Activity Tracking", type: "snow_activity", description: "Log snow ploughing and salting operations", enabled: false, towPolicy: "instant", propertyId: "prop-1" },
];

export const mockAuthorizedParkers: AuthorizedParker[] = [
  { id: "ap-1", name: "Dr. Sarah Chen", email: "s.chen@metroplaza.com", addedAt: ago(10080), vehicles: [
    { id: "v-1", licensePlate: "TX-8821-MN", make: "Tesla", model: "Model 3", color: "White", isPrimary: true },
    { id: "v-2", licensePlate: "TX-3344-PQ", make: "BMW", model: "X5", color: "Black", isPrimary: false },
  ]},
  { id: "ap-2", name: "James Rodriguez", email: "j.rodriguez@metroplaza.com", addedAt: ago(7200), vehicles: [
    { id: "v-3", licensePlate: "TX-5567-RS", make: "Honda", model: "Accord", color: "Gray", isPrimary: true },
  ]},
  { id: "ap-3", name: "Emily Watson", email: "e.watson@metroplaza.com", addedAt: ago(4320), vehicles: [
    { id: "v-4", licensePlate: "TX-9912-UV", make: "Ford", model: "Mustang", color: "Blue", isPrimary: true },
  ]},
];

export const mockTowingCompanies: TowingCompany[] = [
  { id: "tc-1", name: "Austin Premier Towing", contactEmail: "dispatch@austintowing.com", phone: "(512) 555-0142", activeJobs: 1, completedJobs: 23, status: "active" },
  { id: "tc-2", name: "LoneStar Recovery", contactEmail: "ops@lonestarrecovery.com", phone: "(512) 555-0198", activeJobs: 0, completedJobs: 8, status: "active" },
  { id: "tc-3", name: "Metro Tow Services", contactEmail: "info@metrotow.com", phone: "(512) 555-0234", activeJobs: 0, completedJobs: 0, status: "invited" },
];

// ─── Helpers ───────────────────────────────────────────────
export const incidentTypeLabels: Record<IncidentType, string> = {
  unauthorized_parking: "Unauthorized Parking",
  ev_misuse: "EV Charging Misuse",
  slip_and_fall: "Slip & Fall",
  snow_activity: "Snow Activity",
  hazardous_condition: "Hazardous Condition",
};

export const incidentTypeIcons: Record<IncidentType, string> = {
  unauthorized_parking: "🚗",
  ev_misuse: "⚡",
  slip_and_fall: "⚠️",
  snow_activity: "❄️",
  hazardous_condition: "🧊",
};

export const statusColors: Record<IncidentStatus, string> = {
  active: "bg-status-active/10 text-status-active border-status-active/20",
  resolved: "bg-status-resolved/10 text-status-resolved border-status-resolved/20",
  escalated: "bg-status-escalated/10 text-status-escalated border-status-escalated/20",
  monitoring: "bg-primary/10 text-primary border-primary/20",
};

export const towStatusColors: Record<TowStatus, string> = {
  requested: "bg-status-escalated/10 text-status-escalated",
  accepted: "bg-primary/10 text-primary",
  en_route: "bg-primary/10 text-primary",
  arrived: "bg-status-active/10 text-status-active",
  completed: "bg-status-resolved/10 text-status-resolved",
  cancelled: "bg-muted text-muted-foreground",
};

export const towStatusLabels: Record<TowStatus, string> = {
  requested: "Requested",
  accepted: "Accepted",
  en_route: "En Route",
  arrived: "Arrived",
  completed: "Completed",
  cancelled: "Cancelled",
};
