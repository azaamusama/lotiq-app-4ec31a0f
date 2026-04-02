import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Incident, TowJob, Rule, AuthorizedParker, TowingCompany, Camera,
  mockIncidents, mockTowJobs, mockRules, mockAuthorizedParkers,
  mockTowingCompanies, mockCameras, mockProperty, Property,
  IncidentType, IncidentStatus, TowStatus,
} from "@/lib/mock-data";

interface LotIQContextType {
  property: Property;
  incidents: Incident[];
  towJobs: TowJob[];
  rules: Rule[];
  authorizedParkers: AuthorizedParker[];
  towingCompanies: TowingCompany[];
  cameras: Camera[];
  requestTow: (incidentId: string) => void;
  updateTowStatus: (towId: string, status: TowStatus) => void;
  toggleRule: (ruleId: string) => void;
  resolveIncident: (incidentId: string) => void;
  stats: {
    activeIncidents: number;
    resolvedToday: number;
    camerasOnline: number;
    activeTows: number;
  };
}

const LotIQContext = createContext<LotIQContextType | null>(null);

export const useLotIQ = () => {
  const ctx = useContext(LotIQContext);
  if (!ctx) throw new Error("useLotIQ must be used within LotIQProvider");
  return ctx;
};

export const LotIQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [towJobs, setTowJobs] = useState<TowJob[]>(mockTowJobs);
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [authorizedParkers] = useState<AuthorizedParker[]>(mockAuthorizedParkers);
  const [towingCompanies] = useState<TowingCompany[]>(mockTowingCompanies);
  const [cameras] = useState<Camera[]>(mockCameras);

  const requestTow = useCallback((incidentId: string) => {
    const incident = incidents.find(i => i.id === incidentId);
    if (!incident || !incident.licensePlate) return;

    const newTow: TowJob = {
      id: `tow-${Date.now()}`,
      incidentId,
      status: "requested",
      towingCompany: "Austin Premier Towing",
      vehicleDescription: "Unknown vehicle",
      licensePlate: incident.licensePlate,
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [{ timestamp: new Date().toISOString(), action: "Tow requested", actor: "Manager" }],
    };
    setTowJobs(prev => [newTow, ...prev]);
    setIncidents(prev => prev.map(i =>
      i.id === incidentId ? { ...i, towJobId: newTow.id, status: "escalated" as IncidentStatus } : i
    ));
  }, [incidents]);

  const updateTowStatus = useCallback((towId: string, status: TowStatus) => {
    setTowJobs(prev => prev.map(t =>
      t.id === towId ? {
        ...t,
        status,
        updatedAt: new Date().toISOString(),
        timeline: [...t.timeline, { timestamp: new Date().toISOString(), action: `Status: ${status}`, actor: t.towingCompany }],
      } : t
    ));
    if (status === "completed") {
      const tow = towJobs.find(t => t.id === towId);
      if (tow) {
        setIncidents(prev => prev.map(i =>
          i.id === tow.incidentId ? { ...i, status: "resolved" as IncidentStatus } : i
        ));
      }
    }
  }, [towJobs]);

  const toggleRule = useCallback((ruleId: string) => {
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r));
  }, []);

  const resolveIncident = useCallback((incidentId: string) => {
    setIncidents(prev => prev.map(i =>
      i.id === incidentId ? {
        ...i, status: "resolved" as IncidentStatus,
        timeline: [...i.timeline, { timestamp: new Date().toISOString(), action: "Manually resolved", actor: "Manager" }],
      } : i
    ));
  }, []);

  // Simulate new incidents every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const types: IncidentType[] = ["unauthorized_parking", "ev_misuse", "hazardous_condition"];
      const type = types[Math.floor(Math.random() * types.length)];
      const cam = mockCameras[Math.floor(Math.random() * mockCameras.filter(c => c.status === "online").length)];
      if (!cam) return;

      const newIncident: Incident = {
        id: `inc-${Date.now()}`,
        type,
        status: "active",
        title: type === "unauthorized_parking" ? "New unauthorized vehicle detected"
          : type === "ev_misuse" ? "EV charging misuse detected"
          : "New hazard condition detected",
        description: "Automated detection triggered by camera analysis.",
        cameraId: cam.id,
        cameraName: cam.name,
        zone: cam.zone,
        timestamp: new Date().toISOString(),
        images: ["/placeholder.svg"],
        ruleTriggered: mockRules.find(r => r.type === type)?.name || "General",
        licensePlate: type !== "hazardous_condition" ? `TX-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}` : undefined,
        timeline: [{ timestamp: new Date().toISOString(), action: "Incident detected", actor: "System" }],
      };
      setIncidents(prev => [newIncident, ...prev]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    activeIncidents: incidents.filter(i => i.status === "active" || i.status === "escalated").length,
    resolvedToday: incidents.filter(i => i.status === "resolved").length,
    camerasOnline: cameras.filter(c => c.status === "online").length,
    activeTows: towJobs.filter(t => !["completed", "cancelled"].includes(t.status)).length,
  };

  return (
    <LotIQContext.Provider value={{
      property: mockProperty, incidents, towJobs, rules,
      authorizedParkers, towingCompanies, cameras,
      requestTow, updateTowStatus, toggleRule, resolveIncident, stats,
    }}>
      {children}
    </LotIQContext.Provider>
  );
};
