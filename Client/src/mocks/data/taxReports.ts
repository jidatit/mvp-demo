import { DEMO_PDF_URL } from "../utils";

export const seedTaxReports = () => [
  {
    id: "tax-001",
    projectName: "Acme Growth Fund I",
    reportURL: DEMO_PDF_URL,
    createdBy: "fm-001",
    year: "2024",
    quarter: "Quarter4" as const,
    createdAt: "2025-01-31T10:00:00.000Z",
    updatedAt: "2025-01-31T10:00:00.000Z",
    investors: [
      { id: "inv-001", name: "James Whitfield" },
      { id: "inv-002", name: "Elena Rodriguez" },
      { id: "inv-003", name: "Michael O'Brien" },
    ],
  },
  {
    id: "tax-002",
    projectName: "Acme Real Estate Fund II",
    reportURL: DEMO_PDF_URL,
    createdBy: "fm-001",
    year: "2024",
    quarter: "Quarter4" as const,
    createdAt: "2025-02-15T10:00:00.000Z",
    updatedAt: "2025-02-15T10:00:00.000Z",
    investors: [
      { id: "inv-001", name: "James Whitfield" },
      { id: "inv-002", name: "Elena Rodriguez" },
    ],
  },
  {
    id: "tax-003",
    projectName: "Acme Growth Fund I",
    reportURL: DEMO_PDF_URL,
    createdBy: "fm-001",
    year: "2024",
    quarter: "Quarter3" as const,
    createdAt: "2024-10-31T10:00:00.000Z",
    updatedAt: "2024-10-31T10:00:00.000Z",
    investors: [{ id: "inv-001", name: "James Whitfield" }],
  },
  {
    id: "tax-004",
    projectName: "Acme Infrastructure Fund",
    reportURL: DEMO_PDF_URL,
    createdBy: "fm-001",
    year: "2023",
    quarter: "Quarter4" as const,
    createdAt: "2024-01-20T10:00:00.000Z",
    updatedAt: "2024-01-20T10:00:00.000Z",
    investors: [
      { id: "inv-001", name: "James Whitfield" },
      { id: "inv-003", name: "Michael O'Brien" },
    ],
  },
];
