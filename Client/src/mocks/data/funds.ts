import { DEMO_PDF_URL } from "../utils";

const created = "2024-03-15T10:00:00.000Z";

export const seedFundSummaries = () => [
  {
    id: "fund-001",
    name: "Acme Growth Fund I",
    fundType: "Venture Capital",
    fundDescription:
      "Early-stage technology investments across North America and Europe.",
    investorCount: 4,
    createdAt: created,
    status: "active",
    fundSize: "50000000",
    targetAmount: 50000000,
    raisedAmount: 38500000,
    startDate: "2024-01-15",
    returns: { irr: "18.5%", moic: "1.4x" },
  },
  {
    id: "fund-002",
    name: "Acme Real Estate Fund II",
    fundType: "Real Estate",
    fundDescription:
      "Commercial and mixed-use properties in major metropolitan areas.",
    investorCount: 3,
    createdAt: "2024-06-01T10:00:00.000Z",
    status: "active",
    fundSize: "120000000",
    targetAmount: 120000000,
    raisedAmount: 97500000,
    startDate: "2024-04-01",
    returns: { irr: "12.2%", moic: "1.15x" },
  },
  {
    id: "fund-003",
    name: "Acme Infrastructure Fund",
    fundType: "Infrastructure",
    fundDescription:
      "Renewable energy and transport infrastructure in OECD markets.",
    investorCount: 2,
    createdAt: "2023-09-10T10:00:00.000Z",
    status: "closed",
    fundSize: "250000000",
    targetAmount: 250000000,
    raisedAmount: 250000000,
    startDate: "2023-06-01",
    returns: { irr: "9.8%", moic: "1.22x" },
  },
  {
    id: "fund-004",
    name: "Acme Climate Tech Fund",
    fundType: "Venture Capital",
    fundDescription:
      "Series A and B investments in climate and sustainability technology.",
    investorCount: 1,
    createdAt: "2025-01-20T10:00:00.000Z",
    status: "upcoming",
    fundSize: "75000000",
    targetAmount: 75000000,
    raisedAmount: 12000000,
    startDate: "2025-09-01",
    returns: { irr: "—", moic: "—" },
  },
];

export const seedFundDetails = () => {
  const summaries = seedFundSummaries();
  const details: Record<string, unknown> = {};

  summaries.forEach((fund, index) => {
    details[fund.id] = {
      success: true,
      message: "Fund retrieved successfully",
      result: {
        id: fund.id,
        name: fund.name,
        fundSize: fund.fundSize,
        fundType: fund.fundType,
        targetGeographies:
          index === 0
            ? "North America, Western Europe"
            : index === 1
              ? "United States"
              : index === 2
                ? "OECD Markets"
                : "Global",
        targetSectors:
          index === 0
            ? "SaaS, Fintech, Healthtech"
            : index === 1
              ? "Commercial Real Estate"
              : index === 2
                ? "Energy, Transport"
                : "Climate Tech",
        targetMOIC: index === 3 ? "2.5x" : "2.0x",
        targetIRR: index === 3 ? "20%" : "15%",
        minimumInvestment: index === 0 ? "250000" : "500000",
        fundLifetime: index === 2 ? "8 years" : "10 years",
        fundDescription: fund.fundDescription,
        currency: "USD",
        createdAt: fund.createdAt,
        investors: getFundInvestors(fund.id),
        documents: [
          {
            fileUrl: DEMO_PDF_URL,
            uploadedAt: fund.createdAt,
          },
          {
            fileUrl: DEMO_PDF_URL,
            uploadedAt: "2024-08-01T12:00:00.000Z",
          },
        ],
        history: [
          {
            id: `hist-${fund.id}-1`,
            description: `Capital call issued for ${fund.name}`,
            timeAgo: "2 weeks ago",
            timestamp: "2025-05-20T09:00:00.000Z",
            entityType: "capital_call",
            action: "created",
          },
          {
            id: `hist-${fund.id}-2`,
            description: `Q1 report published for ${fund.name}`,
            timeAgo: "1 month ago",
            timestamp: "2025-04-15T14:00:00.000Z",
            entityType: "fund_report",
            action: "published",
          },
          {
            id: `hist-${fund.id}-3`,
            description: `Distribution processed for ${fund.name}`,
            timeAgo: "2 months ago",
            timestamp: "2025-03-10T11:00:00.000Z",
            entityType: "distribution",
            action: "approved",
          },
        ],
      },
    };
  });

  return details;
};

function getFundInvestors(fundId: string) {
  const base = [
    {
      investorId: "inv-001",
      name: "James Whitfield",
      amount: 2500000,
      documentUrl: DEMO_PDF_URL,
      addedAt: "2024-04-01T10:00:00.000Z",
      documentName: "Subscription_Agreement.pdf",
      status: true,
    },
    {
      investorId: "inv-002",
      name: "Elena Rodriguez",
      amount: 1500000,
      documentUrl: DEMO_PDF_URL,
      addedAt: "2024-04-15T10:00:00.000Z",
      documentName: "Subscription_Agreement.pdf",
      status: true,
    },
    {
      investorId: "inv-003",
      name: "Michael O'Brien",
      amount: 3000000,
      documentUrl: DEMO_PDF_URL,
      addedAt: "2024-05-01T10:00:00.000Z",
      documentName: "Subscription_Agreement.pdf",
      status: true,
    },
    {
      investorId: "inv-004",
      name: "Priya Sharma",
      amount: 1000000,
      documentUrl: DEMO_PDF_URL,
      addedAt: "2024-05-20T10:00:00.000Z",
      documentName: "Subscription_Agreement.pdf",
      status: false,
    },
  ];

  if (fundId === "fund-001") return base;
  if (fundId === "fund-002") return base.slice(0, 3);
  if (fundId === "fund-003") return base.slice(0, 2);
  return [base[0]];
}

export const seedInvestorFunds = () =>
  seedFundSummaries().map((fund) => ({
    id: fund.id,
    name: fund.name,
    fundType: fund.fundType,
    fundDescription: fund.fundDescription,
    investorCount: fund.investorCount,
    createdAt: fund.createdAt,
    fundSize: fund.fundSize,
    investors: getFundInvestors(fund.id).filter(
      (inv) => inv.investorId === "inv-001"
    ),
  }));
